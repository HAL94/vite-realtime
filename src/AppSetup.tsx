import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { setupInterceptors } from "./api-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function SetupAxiosInterceptors({ children }: PropsWithChildren) {
  const hasRun = useRef(false);
  const [done, setDone] = useState(false);

  const intersecptorsSetup = useCallback(() => {
    setupInterceptors((statusCode: number) => {
      if (statusCode === 401) {
        console.log(
          `Got unauthorized request with statusCode: 401! Refresh token or logout user`
        );
        // todo: call refresh endpoint or logout user
      }
    });
  }, []);

  useEffect(() => {
    if (!hasRun.current) {
      // setting up should be done once only
      intersecptorsSetup();
      setDone(true);
      console.debug("Setup Done. This should only run once!");
      hasRun.current = true;
    }
  }, []);

  if (!done) return null;

  return <>{children}</>;
}

const queryClient = new QueryClient();

export default function AppSetup({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <SetupAxiosInterceptors>{children}</SetupAxiosInterceptors>      
    </QueryClientProvider>
  );
}
