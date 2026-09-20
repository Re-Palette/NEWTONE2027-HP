/**
 * SECTION 03 —— 出展ブランド
 * `image` を設定すると写真、未設定ならブランドカラーのプレートで描画されます。
 */
export type Brand = {
  id: string;
  name: string;
  /** カード左肩のカテゴリー表記 */
  category:
    | "SKINCARE"
    | "MAKEUP"
    | "HAIRCARE"
    | "INNER CARE"
    | "BEAUTY TOOL"
    | "FRAGRANCE";
  categoryJa: string;
  copy: string;
  founder: string;
  /** グラデーションプレートの2色 */
  palette: [string, string];
  image?: string;
};

export const brands: Brand[] = [
  {
    id: "b01",
    name: "LUMIÈRE",
    category: "SKINCARE",
    categoryJa: "スキンケア",
    copy: "光をまとう、素肌のための処方。",
    founder: "白石 澪",
    palette: ["#9fd8ff", "#3a5cc8"],
  },
  {
    id: "b02",
    name: "mellow",
    category: "MAKEUP",
    categoryJa: "メイク",
    copy: "気分で選ぶ、やわらかい発色。",
    founder: "遠藤 陽",
    palette: ["#ffb4cf", "#c8365f"],
  },
  {
    id: "b03",
    name: "Soleil",
    category: "HAIRCARE",
    categoryJa: "ヘアケア",
    copy: "陽だまりのような手ざわりへ。",
    founder: "工藤 結",
    palette: ["#a8d3ff", "#2b3fa8"],
  },
  {
    id: "b04",
    name: "ReBloom",
    category: "INNER CARE",
    categoryJa: "インナーケア",
    copy: "内側から、もう一度ひらく。",
    founder: "南 咲良",
    palette: ["#e0b0ff", "#6a2fb0"],
  },
  {
    id: "b05",
    name: "ATELIER K",
    category: "BEAUTY TOOL",
    categoryJa: "ビューティーツール",
    copy: "道具が変われば、習慣が変わる。",
    founder: "小森 ひかり",
    palette: ["#ffc9ec", "#a62f8e"],
  },
  {
    id: "b06",
    name: "NOCTURNE",
    category: "FRAGRANCE",
    categoryJa: "フレグランス",
    copy: "夜のはじまりに、記憶を残す。",
    founder: "高城 蓮",
    palette: ["#8ad0ff", "#1b2a7a"],
  },
  {
    id: "b07",
    name: "TIDE",
    category: "SKINCARE",
    categoryJa: "スキンケア",
    copy: "捨てない前提から、つくり直す。",
    founder: "三浦 湊",
    palette: ["#8ff0e2", "#137a86"],
  },
  {
    id: "b08",
    name: "PRISM LAB",
    category: "MAKEUP",
    categoryJa: "メイク",
    copy: "診断から処方まで、ひと続きに。",
    founder: "岸 ここね",
    palette: ["#c9b6ff", "#4830b8"],
  },
];
