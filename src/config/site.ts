/** サイト全体で使うテキスト・メタ情報 */
export const site = {
  name: "NEWTONE 2027",
  year: "2027",
  tagline: "The Next Beauty.",
  lede: "次世代の美容ブランド POPUP",
  description:
    "全国の美容系学生起業家・活動家が集結する次世代の美容ブランドPOPUP「NEWTONE 2027」。ブランド、学生、来場者が出会い、美容の未来をつくる３日間。",
  url: "https://newtone2027.jp",
  creed: ["DISCOVER.", "CONNECT.", "INSPIRE."] as const,
  entryHref: "#entry",
  social: [
    { label: "Instagram", short: "IG", href: "#" },
    { label: "X", short: "X", href: "#" },
    { label: "YouTube", short: "YT", href: "#" },
    { label: "TikTok", short: "TT", href: "#" },
  ],
  /** HERO右下のカテゴリーリスト */
  categories: [
    "COSMETICS",
    "SKINCARE",
    "HAIRCARE",
    "INNERCARE",
    "BEAUTY TOOL",
    "FRAGRANCE",
    "AND MORE",
  ] as const,
} as const;
