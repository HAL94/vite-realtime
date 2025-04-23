// import SignoutButton from "@/components/SignoutButton";
import LeaderboardHeader from "@/modules/leaderboard/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 h-screen flex flex-col">
      <LeaderboardHeader />

      <Outlet />
    </div>
  );
}
