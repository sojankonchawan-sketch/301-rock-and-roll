import { Band } from '../types/band';

export const bands: Band[] = [
  {
    id: 1,
    name: 'ZEAL',
    foundedYear: 2002,
    genre: 'Pop Rock',
    image: '/images/bands/zeal.png',
    members: [
      { id: 1, nickname: 'เป๊กซ์', name: 'ปราชญ์ พงษ์ไชย', role: 'นักร้องนำ', image: '/images/members/ZEAL/1.jpg' },
      { id: 2, nickname: 'ชุ', name: 'ณัฐบวร เศรษฐกนก', role: 'มือกีตาร์', image: '/images/members/ZEAL/2.jpg' },
      { id: 3, nickname: 'ศิลา', name: 'ศิลา นามเทพ', role: 'มือเบส', image: '/images/members/ZEAL/3.jpg' },
      { id: 4, nickname: 'ป๊อก', name: 'ต่อยศ จงแจ่ม', role: 'เบส', image: '/images/members/ZEAL/4.jpg' },
       { id: 5, nickname: 'เคน', name: 'ปรัชญา มีบำรุง', role: 'มือกลอง', image: '/images/members/ZEAL/5.jpg' },
    ],
  },
  {
    id: 2,
    name: 'Bodyslam',
    foundedYear: 2002,
    genre: 'Rock',
    image: '/images/bands/bodyslam.jpg',
    members: [
      { id: 1, nickname: 'ตูน', name: 'อาทิวราห์ คงมาลั', role: 'นักร้องนำ', image: '/images/members/bodyslam/1.jpg' },
      { id: 2, nickname: 'ปิ๊ด', name: 'ปิ๊ด ธนดล ช้างเสวก', role: 'มือกีตาร์เบส', image: '/images/members/bodyslam/2.jpg' },
      { id: 3, nickname: 'ยอด', name: 'ยอด ธนชัย ตันตระกูล', role: 'มือกีตาร์', image: '/images/members/bodyslam/3.jpg' },
      { id: 4, nickname: 'ชัช', name: 'สุชัฒติ จั่นอี๊ด', role: 'มือกลอง', image: '/images/members/bodyslam/4.jpg' },
      { id: 5, nickname: 'โอม', name: 'โอม เปล่งขำ', role: 'ร้องประสาน', image: '/images/members/bodyslam/5.jpg' },
    ],
  },
  {
    id: 3,
    name: 'Big Ass',
    foundedYear: 1997,
    genre: 'Rock',
    image: '/images/bands/Bigass1.jpg',
    members: [
      { id: 1, nickname: 'เจ๋ง', name: 'เดชา โคนาโล', role: 'นักร้องนำ', image: '/images/members/Bigass/1.jpg' },
      { id: 2, nickname: 'อ๊อฟ', name: 'พูนศักดิ์ จตุระบุล', role: 'มือกีตาร์', image: '/images/members/Bigass/2.jpg' },
      { id: 3, nickname: 'หมู', name: 'อภิชาติ พรมรักษา', role: 'มือกีตาร์', image: '/images/members/Bigass/3.jpg' },
      { id: 4, nickname: 'โอ๊ต', name: 'พงศ์พันธ์ พลสิทธิ์', role: 'มือกีตาร์เบส', image: '/images/members/Bigass/4.jpg' },
      { id: 5, nickname: 'กบ', name: 'ขจรเดช พรมรักษา', role: 'มือกลอง', image: '/images/members/Bigass/5.jpg' },
    ],
  },
];