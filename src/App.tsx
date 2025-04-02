import "./App.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { checkAuth } from "./lib/check-auth";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    verifyAuth: checkAuth,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
