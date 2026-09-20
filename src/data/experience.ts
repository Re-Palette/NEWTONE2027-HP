import { media } from "@/config/media";

/**
 * SECTION 05 —— POPUP EXPERIENCE
 * スクロールに合わせて「遠景 → 会場全体 → ブース → 商品 → 来場者」へ
 * カメラが寄っていきます。配列の順番＝カメラの進行順です。
 */
export type ExperienceStage = {
  id: string;
  step: string;
  label: string;
  title: string;
  body: string;
  image?: string;
  /** 寄りの強さ（1 = 等倍）。数値が大きいほど近づいた画になります。
   *  素材を高解像度に差し替えたら、もう少し大きな値にしても破綻しません。 */
  zoom: number;
};

export const experienceStages: ExperienceStage[] = [
  {
    id: "e01",
    step: "01",
    label: "ARRIVAL",
    title: "光の入口",
    body: "会場に近づくほど、街の音が遠ざかっていく。次世代の美容が集まる場所の輪郭が、夜の向こうに浮かび上がります。",
    image: media.experience.wide,
    zoom: 1.0,
  },
  {
    id: "e02",
    step: "02",
    label: "THE HALL",
    title: "会場全体",
    body: "全国から集まったブランドのブースが一望できるメインホール。歩くたびに、まだ知らない“好き”とすれ違います。",
    image: media.experience.hall,
    zoom: 1.14,
  },
  {
    id: "e03",
    step: "03",
    label: "BRAND BOOTH",
    title: "ブランドブース",
    body: "一つひとつのブースが、そのブランドの世界そのもの。照明も什器も香りも、学生たちが自分の手で設計しています。",
    image: media.experience.booth,
    zoom: 1.28,
  },
  {
    id: "e04",
    step: "04",
    label: "PRODUCTS",
    title: "商品に触れる",
    body: "手に取って、試して、比べて。ここでしか出会えないプロダクトを、つくった本人の言葉と一緒に体験できます。",
    image: media.experience.product,
    zoom: 1.42,
  },
  {
    id: "e05",
    step: "05",
    label: "PEOPLE",
    title: "人と出会う",
    body: "来場者も、学生起業家も、同じ熱量でここにいる。商談も、相談も、はじめましても。出会いがそのまま次の企画になります。",
    image: media.experience.crowd,
    zoom: 1.56,
  },
];
