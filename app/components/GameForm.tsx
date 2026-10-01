import type { FormEvent } from "react";
import {
  gameStatuses,
  gameStatusLabels,
  type GameStatus,
} from "../types/game";

export type GameDraft = {
  title: string;
  platform: string;
  estimatedHours: string;
  status: GameStatus;
};

export type GameErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  draft: GameDraft;
  errors: GameErrors;
  editing: boolean;
  onChange: (field: keyof GameDraft, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const platforms = [
  "PC",
  "PlayStation 5",
  "Nintendo Switch",
  "Xbox Series X|S",
  "Mobile",
];

export default function GameForm({
  draft,
  errors,
  editing,
  onChange,
  onSubmit,
  onCancel,
}: GameFormProps) {
  return (
    <section className="gameFormPanel" aria-labelledby="gameFormTitle">
      <div className="gameSectionHeading">
        <p className="gameEyebrow">BACKLOG EDITOR</p>
        <h2 id="gameFormTitle">{editing ? "แก้ไขเกม" : "เพิ่มเกมใหม่"}</h2>
      </div>

      <form className="gameForm" onSubmit={onSubmit} noValidate>
        <label className="gameField">
          <span>ชื่อเกม</span>
          <input
            type="text"
            value={draft.title}
            onChange={(event) => onChange("title", event.target.value)}
            placeholder="เช่น Elden Ring"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "gameTitleError" : undefined}
          />
          {errors.title && (
            <span className="gameFieldError" id="gameTitleError" role="alert">
              {errors.title}
            </span>
          )}
        </label>

        <label className="gameField">
          <span>แพลตฟอร์ม</span>
          <select
            value={draft.platform}
            onChange={(event) => onChange("platform", event.target.value)}
            aria-invalid={Boolean(errors.platform)}
            aria-describedby={errors.platform ? "gamePlatformError" : undefined}
          >
            <option value="">เลือกแพลตฟอร์ม</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {errors.platform && (
            <span className="gameFieldError" id="gamePlatformError" role="alert">
              {errors.platform}
            </span>
          )}
        </label>

        <label className="gameField">
          <span>เวลาที่คาดว่าจะเล่น (ชั่วโมง)</span>
          <input
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={draft.estimatedHours}
            onChange={(event) => onChange("estimatedHours", event.target.value)}
            placeholder="เช่น 20"
            aria-invalid={Boolean(errors.estimatedHours)}
            aria-describedby={
              errors.estimatedHours ? "gameHoursError" : undefined
            }
          />
          {errors.estimatedHours && (
            <span className="gameFieldError" id="gameHoursError" role="alert">
              {errors.estimatedHours}
            </span>
          )}
        </label>

        <label className="gameField">
          <span>สถานะ</span>
          <select
            value={draft.status}
            onChange={(event) => onChange("status", event.target.value)}
          >
            {gameStatuses.map((status) => (
              <option key={status} value={status}>
                {gameStatusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <div className="gameFormActions">
          <button className="gamePrimaryButton" type="submit">
            {editing ? "บันทึกการแก้ไข" : "เพิ่มเข้ารายการ"}
          </button>
          {editing && (
            <button className="gameQuietButton" type="button" onClick={onCancel}>
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </section>
  );
}