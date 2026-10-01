'use client';

import { useState } from 'react';
import BandCard from './BandCard';
import { Band } from '../types/band';

interface BandExplorerProps {
  bands: Band[];
}

type SortOption = 'name' | 'foundedYear';

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [followedBandIds, setFollowedBandIds] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const visibleBands = bands
    .filter((band) => band.name.toLowerCase().includes(normalizedSearchTerm))
    .sort((firstBand, secondBand) => {
      if (sortBy === 'name') {
        return firstBand.name.localeCompare(secondBand.name);
      }

      return firstBand.foundedYear - secondBand.foundedYear;
    });

  function toggleFollow(bandId: number) {
    setFollowedBandIds((currentIds) =>
      currentIds.includes(bandId)
        ? currentIds.filter((id) => id !== bandId)
        : [...currentIds, bandId],
    );
  }

  function likeBand(bandId: number) {
    setLikeCounts((currentCounts) => ({
      ...currentCounts,
      [bandId]: (currentCounts[bandId] ?? 0) + 1,
    }));
  }

  function clearSearch() {
    setSearchTerm('');
  }

  return (
    <section aria-label="ค้นหาและติดตามวงดนตรี">
      <div className="explorerToolbar">
        <label className="searchField">
          <span>ค้นหาชื่อวงดนตรี</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="เช่น Bodyslam"
          />
        </label>

        <div className="explorerSummary" aria-live="polite">
          <strong>{followedBandIds.length}</strong> วงที่ติดตามอยู่
        </div>

        <label className="sortField">
          <span>เรียงตาม</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
            <option value="name">ชื่อวง</option>
            <option value="foundedYear">ปีที่ก่อตั้ง</option>
          </select>
        </label>

        {searchTerm && (
          <button type="button" className="clearButton" onClick={clearSearch}>
            ล้างการค้นหา
          </button>
        )}
      </div>

      {visibleBands.length > 0 ? (
        <div className="bandList">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followedBandIds.includes(band.id)}
              likes={likeCounts[band.id] ?? 0}
              onFollowToggle={() => toggleFollow(band.id)}
              onLike={() => likeBand(band.id)}
            />
          ))}
        </div>
      ) : (
        <div className="emptyState" role="status">
          <h2>ไม่พบวงดนตรี</h2>
          <p>ลองค้นหาด้วยชื่อวงอื่น</p>
          <button type="button" className="clearButton" onClick={clearSearch}>
            แสดงวงดนตรีทั้งหมด
          </button>
        </div>
      )}
    </section>
  );
}