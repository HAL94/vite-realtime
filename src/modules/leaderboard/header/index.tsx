import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar";
import { Separator } from "@radix-ui/react-select";
import { Link } from "@tanstack/react-router";

export default function LeaderboardHeader() {
  const linkStyle = "!font-light !text-[#333]";
  return (
    <Menubar className="text-[#333]">
      <MenubarMenu>
        <div className="flex gap-3 justify-between items-center px-3">
          <Link to="/leaderboard" className={linkStyle}>
            Leaderboard
          </Link>
          <Separator />
          <Link to="/" className={linkStyle}>
            Profile
          </Link>
        </div>
      </MenubarMenu>
    </Menubar>
  );
}
