import SignupForm from "@/forms/signup";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.isAuth) {
      throw redirect({ to: "/leaderboard" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <SignupForm
        onSuccess={async (data) => {
          if (data.success) {
            navigate({ to: "/" });
          }
        }}
      />
    </div>
  );
}
