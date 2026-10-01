import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "../../data/games";
import type { GameStatus } from "../../types/game";

type GameDetailProps = {
  params: Promise<{ id: string }>;
};

const statusLabels: Record<GameStatus, string> = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};

export async function generateMetadata({ params }: GameDetailProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  if (!game) notFound();

  return {
    title: `${game.title} | Game Backlog`,
  };
}

export default async function GameDetailPage({ params }: GameDetailProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  if (!game) notFound();

  return (
    <main className="gameDetailPage">
      <Link className="gameBackLink" href="/games">
        กลับไปยังรายการเกม
      </Link>
      <p className="gameEyebrow">GAME DETAILS</p>
      <h1>{game.title}</h1>
      <p className="gameDetailLead">ข้อมูลเกมในรายการที่ตั้งใจจะเล่น</p>
      <dl className="gameDetailFacts">
        <div>
          <dt>แพลตฟอร์ม</dt>
          <dd>{game.platform}</dd>
        </div>
        <div>
          <dt>เวลาที่คาดว่าจะเล่น</dt>
          <dd>{game.estimatedHours} ชั่วโมง</dd>
        </div>
        <div>
          <dt>สถานะ</dt>
          <dd>{statusLabels[game.status]}</dd>
        </div>
      </dl>
    </main>
  );
}