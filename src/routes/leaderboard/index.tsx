import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard/")({
  component: LeaderboardIndex,
  beforeLoad: async ({ context }) => {
    const userData = await context.verifyAuth();
    if (!userData.success) {
      throw redirect({ to: "/" });
    }
  },
});

function LeaderboardIndex() {
  return <p>Leaderboard table here</p> 
}
