import type { Metadata } from "next";
import GameExplorer from "../components/GameExplorer";

export const metadata: Metadata = {
  title: "เกมที่รอเล่น | Game Backlog",
};

export default function GamesPage() {
  return <GameExplorer />;
}