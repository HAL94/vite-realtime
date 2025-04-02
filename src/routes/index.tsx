import LoginForm from "@/forms/login";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
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
