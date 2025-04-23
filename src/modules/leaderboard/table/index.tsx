import {
  Table,
  TableBody,
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
import LeaderboardRowItem from "./leaderboard-row-item";
import TopUserRank from "./top-user-rank";

type Props = {
  data: LeaderboardItem[];
  userTopRank?: LeaderboardItem;
  userData: { userId?: number };
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
        {userTopRank && <TopUserRank userTopRank={userTopRank} />}
        {data.length === 0 ? (
          <p>No records yet! Stay tuned</p>
        ) : (
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
                  rank={item.rank}
                  highlightUserRow={userData.userId === item.userId}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
