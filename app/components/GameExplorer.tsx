"use client";

import { useState, type FormEvent } from "react";
import { games as initialGames } from "../data/games";
import {
  gameStatuses,
  gameStatusLabels,
  type Game,
  type GameStatus,
} from "../types/game";
import GameCard from "./GameCard";
import GameForm, { type GameDraft, type GameErrors } from "./GameForm";

const blankDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "not-started",
};

export default function GameExplorer() {
  const [gameList, setGameList] = useState<Game[]>(initialGames);
  const [draft, setDraft] = useState<GameDraft>(blankDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<GameErrors>({});
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "all">("all");

  const pendingHours = gameList
    .filter((game) => game.status === "not-started")
    .reduce((total, game) => total + game.estimatedHours, 0);

  const visibleGames = gameList.filter((game) => {
    const matchesSearch = game.title
      .toLocaleLowerCase()
      .includes(searchText.trim().toLocaleLowerCase());
    const matchesStatus = statusFilter === "all" || game.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function updateDraft(field: keyof GameDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function resetForm() {
    setDraft(blankDraft);
    setEditingId(null);
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: GameErrors = {};
    const hours = Number(draft.estimatedHours);

    if (!draft.title.trim()) nextErrors.title = "กรุณากรอกชื่อเกม";
    if (!draft.platform) nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    if (
      !draft.estimatedHours.trim() ||
      !Number.isSafeInteger(hours) ||
      hours <= 0
    ) {
      nextErrors.estimatedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const savedGame: Game = {
      id: editingId ?? String(Date.now()),
      title: draft.title.trim(),
      platform: draft.platform,
      estimatedHours: hours,
      status: draft.status,
    };

    if (editingId) {
      setGameList((current) =>
        current.map((game) => (game.id === editingId ? savedGame : game)),
      );
    } else {
      setGameList((current) => [savedGame, ...current]);
    }
    resetForm();
  }

  function startEditing(game: Game) {
    setDraft({
      title: game.title,
      platform: game.platform,
      estimatedHours: String(game.estimatedHours),
      status: game.status,
    });
    setEditingId(game.id);
    setErrors({});
  }

  function cycleStatus(game: Game) {
    const currentIndex = gameStatuses.indexOf(game.status);
    const nextStatus = gameStatuses[(currentIndex + 1) % gameStatuses.length];
    setGameList((current) =>
      current.map((item) =>
        item.id === game.id ? { ...item, status: nextStatus } : item,
      ),
    );
  }

  function deleteGame(game: Game) {
    setGameList((current) => current.filter((item) => item.id !== game.id));
    if (editingId === game.id) resetForm();
  }

  return (
    <main className="gamePage">
      <section className="gameIntro">
        <div>
          <p className="gameEyebrow">YOUR NEXT ADVENTURE</p>
          <h1 className="pageTitle">เกมที่รอเล่น</h1>
          <p className="gameIntroText">จัดคิวเกม วางเวลา แล้วออกไปสนุก</p>
        </div>
        <div className="gameCount" aria-label={`มีเกมทั้งหมด ${gameList.length} เกม`}>
          <strong>{String(gameList.length).padStart(2, "0")}</strong>
          <span>เกมในรายการ</span>
        </div>
      </section>

      <section className="gameMetrics" aria-label="สรุปรายการเกม">
        <div className="gameMetric">
          <span>ยังไม่เริ่ม</span>
          <strong>{gameList.filter((game) => game.status === "not-started").length}</strong>
          <small>เกม</small>
        </div>
        <div className="gameMetric">
          <span>กำลังเล่น</span>
          <strong>{gameList.filter((game) => game.status === "playing").length}</strong>
          <small>เกม</small>
        </div>
        <div className="gameMetric gameMetricHours">
          <span>เวลาที่รออยู่</span>
          <strong>{pendingHours}</strong>
          <small>ชั่วโมง</small>
        </div>
      </section>

      <div className="gameWorkspace">
        <GameForm
          draft={draft}
          errors={errors}
          editing={editingId !== null}
          onChange={updateDraft}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <section className="gameListSection" aria-labelledby="gameListTitle">
          <div className="gameListHeading">
            <div>
              <p className="gameEyebrow">COLLECTION</p>
              <h2 id="gameListTitle">รายการของฉัน</h2>
            </div>
            <span className="gameVisibleCount">{visibleGames.length} รายการ</span>
          </div>

          <div className="gameFilters">
            <label className="gameSearchField">
              <span className="visuallyHidden">ค้นหาชื่อเกม</span>
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="ค้นหาชื่อเกม..."
              />
            </label>
            <label className="gameStatusFilter">
              <span className="visuallyHidden">กรองตามสถานะ</span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as GameStatus | "all")
                }
              >
                <option value="all">ทุกสถานะ</option>
                {gameStatuses.map((status) => (
                  <option key={status} value={status}>
                    {gameStatusLabels[status]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visibleGames.length > 0 ? (
            <ul className="gameList">
              {visibleGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  hasDetails={initialGames.some((seed) => seed.id === game.id)}
                  onChangeStatus={cycleStatus}
                  onEdit={startEditing}
                  onDelete={deleteGame}
                />
              ))}
            </ul>
          ) : (
            <div className="gameEmptyState">
              <strong>ไม่พบเกมในรายการนี้</strong>
              <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}