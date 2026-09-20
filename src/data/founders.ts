import { media } from "@/config/media";

/**
 * SECTION 04 —— FOUNDERS / STORIES（PINNEDセクションで1人ずつ切り替わります）
 * 配列の順番＝スクロールで切り替わる順番です。
 */
export type Founder = {
  id: string;
  index: string;
  name: string;
  nameEn: string;
  brand: string;
  brandScript: string;
  school: string;
  grade: string;
  role: string;
  message: string;
  /** 未設定の場合はカラープレートで描画されます */
  image?: string;
  accent: string;
};

export const founders: Founder[] = [
  {
    id: "f01",
    index: "01",
    name: "白石 澪",
    nameEn: "Mio Shiraishi",
    brand: "LUMIÈRE",
    brandScript: "Lumière",
    school: "東京美容芸術大学",
    grade: "3年",
    role: "スキンケアブランド代表",
    message:
      "肌のことで下を向いていた時間が、わたしにもありました。だからこそ、誰かの朝をほんの少し軽くする処方をつくりたい。スキンケアで自信をくれる社会をつくりたいんです。",
    image: media.founders.portraits[0],
    accent: "#7ad7ff",
  },
  {
    id: "f02",
    index: "02",
    name: "遠藤 陽",
    nameEn: "Hinata Endo",
    brand: "mellow",
    brandScript: "mellow",
    school: "大阪クリエイティブ学院",
    grade: "3年",
    role: "メイクブランド代表",
    message:
      "メイクは、誰かに合わせるための道具じゃない。今日の自分の気分をそのまま出していい。自分らしさをメイクで表現できる世界をつくりたい。",
    image: media.founders.portraits[1],
    accent: "#ff6fc8",
  },
  {
    id: "f03",
    index: "03",
    name: "工藤 結",
    nameEn: "Yui Kudo",
    brand: "Soleil",
    brandScript: "Soleil",
    school: "北海道デザイン大学",
    grade: "2年",
    role: "ヘアケアブランド代表",
    message:
      "髪を切った日の、あの歩き方が好きでした。ヘアで新しい自分に出会えるきっかけを、もっと多くの人に手渡したい。",
    image: media.founders.portraits[2],
    accent: "#8f7bff",
  },
  {
    id: "f04",
    index: "04",
    name: "南 咲良",
    nameEn: "Sakura Minami",
    brand: "ReBloom",
    brandScript: "ReBloom",
    school: "福岡健康科学大学",
    grade: "3年",
    role: "インナーケアブランド代表",
    message:
      "きれいでいることは、頑張ることじゃないと思う。すべての人に、美と心のケアを同じ重さで届けたい。それがReBloomの約束です。",
    image: media.founders.portraits[3],
    accent: "#c07bff",
  },
];
