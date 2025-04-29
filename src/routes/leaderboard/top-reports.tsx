import TopReports from "@/modules/leaderboard/reports";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard/top-reports")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TopReports />;
}
