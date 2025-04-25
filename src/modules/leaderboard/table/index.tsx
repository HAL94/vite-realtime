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
import { LeaderboardPagination } from "./pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type Props = {
  data: LeaderboardItem[];
  userTopRank?: LeaderboardItem;
  userData: { userId?: number };
  totalPages: number;
  currentPage: number;
  onUpdatePage: (page: number) => void;
  onPageSizeChange: (newLimit: number) => void;
  pageSize: number
};

export function LeaderboardTable({
  data,
  userTopRank,
  userData,
  totalPages,
  currentPage,
  pageSize,
  onUpdatePage,
  onPageSizeChange,
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
          <>
            <Select
              onValueChange={(value) => onPageSizeChange(parseInt(value))}
            >
              <SelectTrigger className="text-white">{pageSize ? `Size: ${pageSize}` : "Select Size"}</SelectTrigger>
              <SelectContent>
                {[
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                ].map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <LeaderboardPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onUpdatePage={(page) => {
                onUpdatePage(page);
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
