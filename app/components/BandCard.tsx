import Image from 'next/image';
import { Band } from '../types/band';

interface BandCardProps {
  band: Band;
  isFollowing: boolean;
  likes: number;
  onFollowToggle: () => void;
  onLike: () => void;
}

export default function BandCard({ band, isFollowing, likes, onFollowToggle, onLike }: BandCardProps) {
  return (
    <article className="bandCard">
      <div className="bandHero">
        <div className="bandImageWrap">
          <Image
            src={band.image}
            alt={band.name}
            width={320}
            height={300}
            className="bandImage"
          />
        </div>

        <div className="bandDetails">
          <div className="bandHeading">
            <h2>{band.name}</h2>
            <button
              type="button"
              className={`followButton${isFollowing ? ' following' : ''}`}
              onClick={onFollowToggle}
              aria-pressed={isFollowing}
            >
              {isFollowing ? 'กำลังติดตาม' : 'ติดตาม'}
            </button>
          </div>
          <p className="bandGenre">
            <span>แนวเพลง:</span> {band.genre}
          </p>
          <p className="bandFoundedYear">
            <span>ก่อตั้ง:</span> {band.foundedYear}
          </p>

          <div className="bandActions">
            <button type="button" className="likeButton" onClick={onLike}>
              <span aria-hidden="true">♥</span> Like {likes}
            </button>
          </div>

          <div className="membersSection">
            <h3>สมาชิก</h3>
            <ul className="memberList">
              {band.members.map((member) => (
                <li key={member.id} className="memberItem">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={42}
                      height={42}
                      className="memberAvatar"
                    />
                  )}
                  <span className="memberInfo">
                    {member.name} ({member.nickname}) - {member.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}