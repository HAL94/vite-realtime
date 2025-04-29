import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatItem } from "../types";
import PlayerStat from "./stat-item";

export default function StatsContainer({
  period = "Performance across all games this month (April)",
  statList,
}: {
  period: string;
  statList: StatItem[];
}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Top Players Report</CardTitle>
        <CardDescription>{period}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {statList.map((player, i) => (
            <PlayerStat key={i} stat={player} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
