import { StatItem } from "../types";

export default function PlayerStat({ stat }: { stat: StatItem }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium">{stat.name}</div>
            <div className="text-sm text-muted-foreground">
              {stat.games} games played
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold">{stat.score.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </div>
      </div>
    </div>
  );
}
