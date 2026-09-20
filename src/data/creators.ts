import { media } from "@/config/media";

/**
 * SECTION 02 —— 全国の美容系学生起業家・活動家
 * サンプルデータ。CMS/JSON に差し替える場合も `Creator[]` の形を保ってください。
 */
export type Creator = {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  school: string;
  area: string;
  category: string;
  activity: string;
  /** 未設定の場合はカラープレートで描画されます */
  image?: string;
  /** カードの発光色 */
  accent: string;
};

export const creators: Creator[] = [
  {
    id: "c01",
    name: "白石 澪",
    nameEn: "Mio Shiraishi",
    brand: "LUMIÈRE",
    school: "東京美容芸術大学",
    area: "TOKYO",
    category: "SKINCARE",
    activity: "肌悩みから自由になれるスキンケアを、学生の手で。",
    image: media.creators.tiles[0],
    accent: "#7ad7ff",
  },
  {
    id: "c02",
    name: "遠藤 陽",
    nameEn: "Hinata Endo",
    brand: "mellow",
    school: "大阪クリエイティブ学院",
    area: "OSAKA",
    category: "MAKEUP",
    activity: "“らしさ”を肯定するメイクで、表現の入口をつくる。",
    image: media.creators.tiles[1],
    accent: "#ff6fc8",
  },
  {
    id: "c03",
    name: "工藤 結",
    nameEn: "Yui Kudo",
    brand: "Soleil",
    school: "北海道デザイン大学",
    area: "SAPPORO",
    category: "HAIRCARE",
    activity: "髪から始まる、新しい自分との出会いを設計する。",
    image: media.creators.tiles[2],
    accent: "#8f7bff",
  },
  {
    id: "c04",
    name: "南 咲良",
    nameEn: "Sakura Minami",
    brand: "ReBloom",
    school: "福岡健康科学大学",
    area: "FUKUOKA",
    category: "INNER CARE",
    activity: "インナーケアで、美しさと心のコンディションをつなぐ。",
    image: media.creators.tiles[3],
    accent: "#c07bff",
  },
  {
    id: "c05",
    name: "高城 蓮",
    nameEn: "Ren Takagi",
    brand: "NOCTURNE",
    school: "名古屋商科大学",
    area: "NAGOYA",
    category: "FRAGRANCE",
    activity: "記憶に残る香りを、ジェンダーの枠の外側へ。",
    image: media.creators.tiles[4],
    accent: "#5ea8ff",
  },
  {
    id: "c06",
    name: "小森 ひかり",
    nameEn: "Hikari Komori",
    brand: "ATELIER K",
    school: "京都芸術造形大学",
    area: "KYOTO",
    category: "BEAUTY TOOL",
    activity: "道具のデザインから、毎日のケアの体験を変える。",
    image: media.creators.tiles[5],
    accent: "#ff8ae0",
  },
  {
    id: "c07",
    name: "三浦 湊",
    nameEn: "Minato Miura",
    brand: "TIDE",
    school: "仙台国際大学",
    area: "SENDAI",
    category: "SUSTAINABLE",
    activity: "詰め替えを前提にした、捨てないコスメの流通をつくる。",
    image: media.creators.tiles[6],
    accent: "#6ff0e0",
  },
  {
    id: "c08",
    name: "柚木 詩織",
    nameEn: "Shiori Yuzuki",
    brand: "KOTOHA",
    school: "広島文化女子大学",
    area: "HIROSHIMA",
    category: "COMMUNITY",
    activity: "美容を入口に、地方の若者の居場所をつくる活動家。",
    accent: "#ffb36b",
  },
  {
    id: "c09",
    name: "岸 ここね",
    nameEn: "Kokone Kishi",
    brand: "PRISM LAB",
    school: "金沢工科芸術大学",
    area: "KANAZAWA",
    category: "TECH BEAUTY",
    activity: "AI診断とパーソナライズ処方で、選ぶ時間を短くする。",
    accent: "#9ad0ff",
  },
];
