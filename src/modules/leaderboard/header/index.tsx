import SignoutButton from "@/components/SignoutButton";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Separator } from "@radix-ui/react-select";
import { Link } from "@tanstack/react-router";

export default function LeaderboardHeader() {
  const linkStyle = "!font-light !text-[#333]";
  return (
    <Menubar className="text-[#333] min-w-3xl mb-3">
      <MenubarMenu>
        <div className="flex gap-3 justify-between items-center px-3">
          <Link to="/leaderboard" className={linkStyle}>
            Leaderboard
          </Link>
          <Separator />
          <Link to="/leaderboard/top-reports" className={linkStyle}>
            Top Reports
          </Link>
        </div>
        <div className="ml-auto">
          <SignoutButton />
        </div>
      </MenubarMenu>
    </Menubar>
  );
}
