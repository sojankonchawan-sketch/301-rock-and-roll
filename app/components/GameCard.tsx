import Link from "next/link";
import { gameStatusLabels, type Game } from "../types/game";

type GameCardProps = {
  game: Game;
  hasDetails: boolean;
  onChangeStatus: (game: Game) => void;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
};

export default function GameCard({
  game,
  hasDetails,
  onChangeStatus,
  onEdit,
  onDelete,
}: GameCardProps) {
  return (
    <li className="gameRow">
      <div className="gameRowTopline">
        <span className={`gameStatus gameStatus-${game.status}`}>
          {gameStatusLabels[game.status]}
        </span>
        <span className="gameHours">ประมาณ {game.estimatedHours} ชม.</span>
      </div>
      <h3>{game.title}</h3>
      <p className="gamePlatform">{game.platform}</p>
      <div className="gameRowActions">
        {hasDetails && (
          <Link className="gameDetailLink" href={`/games/${game.id}`}>
            ดูรายละเอียด
          </Link>
        )}
        <button
          className="gameActionButton"
          type="button"
          onClick={() => onChangeStatus(game)}
          aria-label={`เปลี่ยนสถานะเกม ${game.title}`}
        >
          เปลี่ยนสถานะ
        </button>
        <button
          className="gameActionButton"
          type="button"
          onClick={() => onEdit(game)}
        >
          แก้ไข
        </button>
        <button
          className="gameActionButton gameDeleteButton"
          type="button"
          onClick={() => onDelete(game)}
        >
          ลบ
        </button>
      </div>
    </li>
  );
}