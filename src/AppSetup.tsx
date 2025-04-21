import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { setupInterceptors } from "./api-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureWsUnauthCallback, ConnectionFactory } from "./socket-client";
import { AuthProvider, useAuth } from "./contexts/auth";

function SetupInterceptors({ children }: PropsWithChildren) {
  const hasRun = useRef(false);
  const [done, setDone] = useState(false);
  const { setUserData } = useAuth();

  const intersecptorsSetup = useCallback(() => {
    setupInterceptors((statusCode: number) => {
      if (statusCode === 401) {
        console.log(
          `Got unauthorized request with statusCode: 401! Refresh token or logout user`
        );
        // todo: call refresh endpoint or logout user
        ConnectionFactory.disconnectAll();
        setUserData(undefined);
      }
    });
    configureWsUnauthCallback(() => {
      ConnectionFactory.disconnectAll();
      setUserData(undefined);
    })
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
      <AuthProvider>
        <SetupInterceptors>{children}</SetupInterceptors>
      </AuthProvider>
    </QueryClientProvider>
  );
}
