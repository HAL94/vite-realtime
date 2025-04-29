// import SignoutButton from "@/components/SignoutButton";
import LeaderboardHeader from "@/modules/leaderboard/header";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {    
    if (!context.isAuth) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="p-2 h-screen flex flex-col">
      <LeaderboardHeader />
      <Outlet />
    </div>
  );
}
