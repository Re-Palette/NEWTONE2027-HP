/**
 * ============================================================================
 *  MEDIA REGISTRY  —  画像パスの一元管理
 * ============================================================================
 *  サイト内で使用するすべての画像パスはこのファイルだけで管理します。
 *  本番素材に差し替えるときは、`/public/images/...` に同名でファイルを置くか、
 *  ここのパス文字列を書き換えるだけで全セクションに反映されます。
 *
 *  現在入っている画像はすべて「デザインリファレンスから切り出した仮素材」です。
 *  本番素材に差し替える際は PLACEHOLDER コメントを削除してください。
 * ----------------------------------------------------------------------------
 *  推奨サイズ
 *    hero.portrait      2400 x 1350 以上 / webp
 *    creators.*          800 x  600 以上 / webp
 *    founders.*         1200 x 1600 以上 / webp（縦長ポートレート）
 *    experience.*       2400 x 1350 以上 / webp
 *    brands.*           1200 x 1600 以上 / webp（未設定ならCSSプレートで描画）
 * ============================================================================
 */

const BASE = "/images";

export const media = {
  /** HERO —— 添付デザインの再現に使用するビジュアル */
  hero: {
    /** PLACEHOLDER: 主役のポートレート（顔が上を向いているカット） */
    portrait: `${BASE}/hero/portrait.webp`,
  },

  /** SECTION 02 —— 学生起業家・活動家のコラージュ */
  creators: {
    /** PLACEHOLDER: コラージュ中央の大判カット */
    lead: `${BASE}/creators/creator-hero.webp`,
    /** PLACEHOLDER: 空間に浮かぶ小カット群 */
    tiles: [
      `${BASE}/creators/creator-01.webp`,
      `${BASE}/creators/creator-02.webp`,
      `${BASE}/creators/creator-03.webp`,
      `${BASE}/creators/creator-04.webp`,
      `${BASE}/creators/creator-05.webp`,
      `${BASE}/creators/creator-06.webp`,
      `${BASE}/creators/creator-07.webp`,
    ],
  },

  /** SECTION 04 —— ファウンダーのポートレート */
  founders: {
    /** PLACEHOLDER */
    portraits: [
      `${BASE}/founders/founder-01.webp`,
      `${BASE}/founders/founder-02.webp`,
      `${BASE}/founders/founder-03.webp`,
      `${BASE}/founders/founder-04.webp`,
    ],
  },

  /** SECTION 05 —— POPUP会場（カメラが寄っていく順に並べる） */
  experience: {
    /** PLACEHOLDER: 遠景 → 会場全体 → ブース → 商品 → 来場者 */
    wide: `${BASE}/experience/venue-wide.webp`,
    hall: `${BASE}/experience/venue-hall.webp`,
    booth: `${BASE}/experience/venue-booth.webp`,
    product: `${BASE}/experience/venue-product.webp`,
    crowd: `${BASE}/experience/venue-crowd.webp`,
  },

  /** 社内共有用: 元デザインカンプ（サイトからは参照していません） */
  reference: `${BASE}/reference/design-reference.webp`,
} as const;

export type Media = typeof media;
