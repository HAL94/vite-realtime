import { checkAuth } from "@/lib/check-auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard/")({
  component: LeaderboardIndex,
  beforeLoad: async () => {
    const userData = await checkAuth();
    if (!userData?.success) {
      throw redirect({ to: "/" });
    }
  },
});

function LeaderboardIndex() {
  return <div className="p-2">Hello from Leaderboard table!</div>;
}
