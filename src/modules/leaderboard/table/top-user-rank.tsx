import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "lucide-react";
import { LeaderboardItem } from "../types";

export default function TopUserRank({
  userTopRank,
}: {
  userTopRank: LeaderboardItem;
}) {
  return (
    <div className="mb-6">
      <div className="text-lg font-medium mb-2">Your Top Score</div>
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Game</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-medium">
              <TableCell className="font-bold">{userTopRank.rank}</TableCell>
              <TableCell className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{userTopRank.player}</span>
              </TableCell>
              <TableCell>{userTopRank.game}</TableCell>
              <TableCell className="text-right">{userTopRank.score}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
