import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">หน้าแรก</Link>{" "}
      <Link href="/courses">รายวิชา</Link>{" "}
      <Link href="/games">เกมที่รอเล่น</Link>{" "}
      <Link href="/about">เกี่ยวกับเว็บไซต์</Link>{" "}
      <Link href="/favorite">วงดนตรีที่ชื่นชอบ</Link>
    </nav>
  );
}