# NEWTONE 2027 — The Next Beauty.

全国の美容系学生起業家・活動家が集まる次世代の美容ブランド POPUP
「**NEWTONE 2027**」の公式サイトです。

縦に並んだ情報を読ませるだけの LP ではなく、
**スクロールそのものが演出になる**スクロール同期型のサイトとして実装しています。

- スクロール量 = アニメーションの進行量（`scrub`）
- スクロールを止めれば演出も止まり、戻せば逆再生される
- Desktop は大胆な 3D / PIN 演出、Mobile は負荷を抑えた構成に自動で切り替え

---

## 技術スタック

| | |
|---|---|
| フレームワーク | Next.js 15 (App Router) / React 19 / TypeScript |
| アニメーション | GSAP 3 + ScrollTrigger |
| スクロール | Lenis（慣性スクロール、ScrollTrigger と同期） |
| スタイル | CSS Modules + グローバルのデザイントークン |
| 背景演出 | Canvas 2D（粒子＋光源。Three.js は未使用で軽量） |

Three.js / R3F は使っていません。粒子と光の表現は Canvas 2D と CSS で作っており、
モバイルでも描画負荷が上がりすぎないようにしています。

---

## セットアップ

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 本番ビルド
npm start          # 本番サーバー
npm run lint       # ESLint
npm run typecheck  # 型チェック
```

Node.js 20 以上を想定しています。

---

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx          メタ情報・フォント読み込み・スムーススクロール
│   ├── page.tsx            セクションの並び順はここだけを見れば分かります
│   ├── globals.css         デザイントークン / 共通クラス（.u-*）
│   └── fonts.css           セルフホストした欧文書体の @font-face
├── config/
│   ├── media.ts            ★ 画像パスの一元管理
│   └── site.ts             サイト名・コピー・カテゴリーなどのテキスト
├── data/
│   ├── navigation.ts       グローバルナビ
│   ├── creators.ts         SECTION 02 学生起業家・活動家
│   ├── brands.ts           SECTION 03 出展ブランド
│   ├── founders.ts         SECTION 04 ファウンダーのストーリー
│   └── experience.ts       SECTION 05 会場体験のカメラ位置
├── lib/
│   ├── gsap.ts             GSAP / ScrollTrigger の登録
│   ├── hooks.ts            メディアクエリなどの共通フック
│   └── reveal.ts           見出しの立ち上がり（PIN とは別トリガー）
└── components/
    ├── providers/SmoothScrollProvider.tsx   Lenis ⇄ ScrollTrigger の同期
    ├── fx/CosmicField.tsx                   背景の粒子・光源・グレイン
    ├── layout/  Header / Footer / ScrollProgress
    ├── ui/Icons.tsx                         矢印・手書き風の下線など
    └── sections/
        ├── Hero.tsx         01 HERO（デザインカンプの再現）
        ├── Creators.tsx     02 全国の学生起業家・活動家が集結
        ├── Brands.tsx       03 出展ブランド
        ├── Founders.tsx     04 FOUNDERS / STORIES（PINNED）
        ├── Experience.tsx   05 POPUP EXPERIENCE（カメラが寄っていく）
        └── FinalCta.tsx     06 FINAL CTA
```

---

## スクロール演出の設計

すべてのセクションのアニメーションは `scrub` で駆動しているため、
**スクロール位置がそのままアニメーションの再生位置**になります。

| セクション | 演出 |
|---|---|
| 01 HERO | 各レイヤーが奥行きを持って離脱。ポートレートは寄り、コピーは左右に流れる |
| 02 CREATORS | 暗転 → 中央に光が生まれ、奥（z = -2600px）にあったカードが手前まで進んでくる |
| 03 BRANDS | カードが画面外の左右から中央へ集まり、奥行きを保ったまま横に流れる |
| 04 FOUNDERS | **PINNED**。画面を固定したまま、人物 → 名前 → ブランド → 活動 → メッセージ の順に切り替わる |
| 05 EXPERIENCE | **PINNED**。遠景 → 会場全体 → ブース → 商品 → 来場者へカメラが寄っていく |
| 06 FINAL CTA | 光が広がり、HERO と呼応して着地する |

### 実装上の注意点

- **GSAP が動かす要素に `transform` でセンタリングを書かない**
  `translate(-50%, -50%)` は GSAP の transform に上書きされて失われます。
  センタリングは `margin` か `inset + margin:auto` で行ってください。
- **`scrub` のトゥイーンはスクロールが止まった後も動き続ける**
  毎フレームの計算が必要なもの（`Brands` の奥行き計算）は
  `ScrollTrigger.onUpdate` ではなく `gsap.ticker` で回しています。
- **見出しの立ち上がりは PIN と別トリガー**（`src/lib/reveal.ts`）
  PIN の開始を起点にすると、そこに至るまでの間が真っ暗な空白になるためです。
- **日本語テキストに `ch` 単位の `max-width` を使わない**
  欧文基準の幅になり、意図せず折り返します。`px` / `%` を使ってください。

---

## コンテンツの差し替え

### テキスト・出展者データ

`src/data/*.ts` と `src/config/site.ts` を編集するだけで反映されます。
型（`Creator` / `Brand` / `Founder` / `ExperienceStage`）を保てば、
件数を増減しても レイアウト・演出は自動で追従します。

- `creators.ts` … カードは `SLOTS`（`Creators.tsx`）の座標に順番に割り当てられます
- `brands.ts` … `image` 未設定のときは `palette` の2色でグラデーションのプレートを描画します
- `founders.ts` … 配列の順番がそのまま切り替わる順番です
- `experience.ts` … 配列の順番がカメラの進行順。`zoom` で寄りの強さを調整します

### 画像

**画像パスは `src/config/media.ts` だけで管理しています。**
`public/images/...` に同名でファイルを置くか、`media.ts` のパスを書き換えれば
全セクションに反映されます。

> **現在入っている画像はすべて、デザインカンプから切り出した仮素材です。**
> 本番素材に差し替える際は `media.ts` の `PLACEHOLDER` コメントを削除してください。

推奨サイズは `media.ts` の冒頭に記載しています。
`public/images/reference/design-reference.webp` は社内共有用のデザインカンプで、
サイトからは参照していません。

---

## フォント

| 用途 | 書体 | 配信 |
|---|---|---|
| 巨大ワードマーク | Anton | セルフホスト（`public/fonts`） |
| UI・欧文ラベル | Jost | セルフホスト |
| 欧文スクリプト | Yellowtail | セルフホスト |
| 和文見出し・本文 | Zen Kaku Gothic New | Google Fonts CDN |
| 和文明朝（HEROのコピー） | Shippori Mincho | Google Fonts CDN |
| 和文手書き（ピンクのコピー） | Klee One | Google Fonts CDN |

欧文はレンダリングを止めないようセルフホスト＋`preload`、
和文はサブセットが巨大なため CDN 配信にしています。

---

## レスポンシブ / アクセシビリティ

- **Desktop（1024px〜）** PIN・3D・横スクロールを含む大胆な演出
- **Tablet（768〜1023px）** PIN は維持しつつ、3D は縦積みのグリッドへ
- **Mobile（〜767px）** PIN を外し、粒子数を約 1/3 に削減。慣性スクロールも弱める
- **`prefers-reduced-motion: reduce`** Lenis を無効化し、全セクションを
  重なりのない縦積み／グリッドレイアウトに切り替えます（幅に関係なく適用）
- 巨大ワードマークは装飾扱い（`aria-hidden`）で、`h1` にはテキストを別途用意しています

---

## HERO について

HERO はデザインカンプの構成をそのまま再現しています。
レイアウト・タイポグラフィ・カラー・左右の装飾の位置関係は変更しないでください。
スクロールを始めた瞬間から、各レイヤーが奥行きを持って離脱していきます。
