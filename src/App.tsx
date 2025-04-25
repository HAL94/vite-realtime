import "./App.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./contexts/auth";
import { useEffect } from "react";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    verifyAuth: undefined!,
    userData: undefined!,
    setUserData: () => {},
    isAuth: undefined!
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authContext = useAuth();
  useEffect(() => {
    router.invalidate();
  }, [authContext.isAuth])
  return (
    <RouterProvider
      router={router}
      context={{ ...authContext }}
    />
  );
}

export default App;
