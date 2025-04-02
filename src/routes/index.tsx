import LoginForm from "@/forms/login";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    const userData = await context.verifyAuth();
    if (userData.success) {
      throw redirect({ to: "/leaderboard" });
    }
  },
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <LoginForm
        onSuccess={() => {
          navigate({ to: "/leaderboard" });
        }}
      />
    </div>
  );
}
