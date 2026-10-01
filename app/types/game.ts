export type GameStatus = "not-started" | "playing" | "completed";

export type Game = {
  id: string;
  title: string;
  platform: string;
  estimatedHours: number;
  status: GameStatus;
};

export const gameStatuses: GameStatus[] = [
  "not-started",
  "playing",
  "completed",
];

export const gameStatusLabels: Record<GameStatus, string> = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};