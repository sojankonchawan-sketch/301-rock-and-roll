import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "1",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 65,
    status: "not-started",
  },
  {
    id: "2",
    title: "Hades",
    platform: "PC",
    estimatedHours: 25,
    status: "playing",
  },
  {
    id: "3",
    title: "Final Fantasy VII Rebirth",
    platform: "PlayStation 5",
    estimatedHours: 55,
    status: "not-started",
  },
  {
    id: "4",
    title: "Stardew Valley",
    platform: "PC",
    estimatedHours: 40,
    status: "completed",
  },
  {
    id: "5",
    title: "Hollow Knight",
    platform: "Nintendo Switch",
    estimatedHours: 30,
    status: "not-started",
  },
];