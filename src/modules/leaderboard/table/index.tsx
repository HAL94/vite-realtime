import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardItem } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import LeaderboardRowItem from "./leaderboard-row-item";

type Props = {
  data: LeaderboardItem[];
  userTopRank?: LeaderboardItem;
  userData: { userId: number };
};

export function LeaderboardTable({
  data,
  userTopRank,
  userData,
}: React.PropsWithChildren<Props>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Leaderboard</CardTitle>
        <CardDescription>View top scores across all games</CardDescription>
      </CardHeader>
      <CardContent>
        {userTopRank && (
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
                    <TableCell className="font-bold">
                      {userTopRank.rank}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{userTopRank.player}</span>
                    </TableCell>
                    <TableCell>{userTopRank.game}</TableCell>
                    <TableCell className="text-right">
                      {userTopRank.score}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <LeaderboardRowItem
                key={index}
                item={item}
                rank={index + 1}
                highlightUserRow={userData.userId === item.id}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// <TableRow key={item.rank}>
//                 <TableCell className="font-medium">{index + 1}</TableCell>
//                 <TableCell>{item.score}</TableCell>
//                 <TableCell>{item.player}</TableCell>
//                 <TableCell>{item.game}</TableCell>
//                 <TableCell>{item.date as string}</TableCell>
//               </TableRow>
