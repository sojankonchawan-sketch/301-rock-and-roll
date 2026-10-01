import { bands } from '../data/bands';
import BandExplorer from '../components/BandExplorer';

export default function FavoritePage() {
  return (
    <main className="favoritePage">
      <h1 className="pageTitle">วงดนตรีที่ชื่นชอบ</h1>
      <BandExplorer bands={bands} />
    </main>
  );
}