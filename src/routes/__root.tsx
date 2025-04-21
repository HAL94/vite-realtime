import { AuthContext, useAuth } from "@/contexts/auth";
import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

export const Route = createRootRouteWithContext<AuthContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { userData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (typeof userData === "undefined") {
      router.invalidate();
    }
  }, [userData]);
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
