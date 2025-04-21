import { TableCell, TableRow } from "@/components/ui/table";
import { LeaderboardItem } from "../types";
import { cn } from "@/utils";

type Props = {
  item: LeaderboardItem;
  rank?: number | string
  highlightUserRow?: boolean
};
export default function LeaderboardRowItem({ item, rank, highlightUserRow }: Props) {
  return (
    <TableRow className={cn("", { "bg-gray-100": highlightUserRow })}>
      <TableCell className="font-medium">{rank || item.rank}</TableCell>
      <TableCell>{item.score}</TableCell>
      <TableCell>{item.player}</TableCell>
      <TableCell>{item.game}</TableCell>
      <TableCell>{item.date as string}</TableCell>
    </TableRow>
  );
}
