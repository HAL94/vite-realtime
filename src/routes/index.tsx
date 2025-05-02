import { useAuth } from "@/contexts/auth";
import LoginForm from "@/forms/login";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    if (context.isAuth) {
      throw redirect({ to: "/leaderboard" });
    }
  },
});

function Index() {
  const { setUserData } = useAuth();
  return (
    <div className="p-2">
      <LoginForm
        onSuccess={async (data) => {
          setUserData(data.user);
        }}
      />
      <p>
        Dont have an account? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
