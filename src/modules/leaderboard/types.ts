export type LeaderboardItem = {
  rank: number;
  id: number;
  player: string;
  game: string;
  score: number;
  date: Date | string;
};


export type Channel = {
  label: string
  value: string
}