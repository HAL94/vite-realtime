import SignoutButton from "@/components/SignoutButton";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <span>
        Header
        <SignoutButton />
      </span>
      <div>
        <Outlet />
      </div>
      <span>Footer</span>
    </div>
  );
}
