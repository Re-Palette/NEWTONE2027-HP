"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { founders } from "@/data/founders";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { revealHeading } from "@/lib/reveal";
import { ArrowRight, BrushUnderline } from "@/components/ui/Icons";
import styles from "./Founders.module.css";

/**
 * SECTION 04 — FOUNDERS / STORIES
 * ---------------------------------------------------------------------------
 * PINNED SECTION。画面を固定したまま、スクロール量に応じて
 * 人物写真 → 名前 → ブランド → 活動内容 → メッセージ が順番に切り替わります。
 */
export default function Founders() {
  const root = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const n = founders.length;

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // 見出しはピンとは独立して、セクションが入ってきた時点から立ち上げる
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${n * 92}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // バーは直接書き換えて、毎フレームの再描画を避ける
              if (barRef.current) {
                barRef.current.style.transform = `scaleY(${self.progress})`;
              }
              const i = Math.min(n - 1, Math.floor(self.progress * n * 0.999));
              setActive((prev) => (prev === i ? prev : i));
            },
          },
        });

        // 1人ずつ切り替える
        founders.forEach((f, i) => {
          const at = i * 2.2;
          const panel = `.${styles.panel}[data-i="${i}"]`;
          const shot = `.${styles.shot}[data-i="${i}"]`;
          const frame = `.${styles.shot}[data-i="${i}"] .${styles.shotFrame}`;
          const mark = `.${styles.watermark}[data-i="${i}"]`;

          // 入り：写真。先頭はピン開始前から見えている状態にしておく
          tl.fromTo(
            shot,
            { opacity: i === 0 ? 1 : 0 },
            { opacity: 1, duration: 0.9, ease: "power2.out" },
            at,
          )
            .fromTo(
              frame,
              { scale: 1.14, yPercent: 3 },
              { scale: 1, yPercent: 0, duration: 1.1, ease: "power2.out" },
              at,
            )
            .fromTo(
              mark,
              { opacity: i === 0 ? 1 : 0, xPercent: i === 0 ? 0 : 8 },
              { opacity: 1, xPercent: 0, duration: 0.9, ease: "power2.out" },
              at,
            )
            // パネルの地色も一緒に出し入れして、空の箱が残らないようにする
            .fromTo(
              panel,
              { opacity: i === 0 ? 1 : 0 },
              { opacity: 1, duration: 0.4, ease: "power2.out" },
              at + (i === 0 ? 0 : 0.08),
            )
            // 入り：テキストが 名前 → ブランド → 活動 → メッセージ の順に出る
            .fromTo(
              `${panel} .${styles.reveal}`,
              { yPercent: 118, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.16,
                ease: "power3.out",
              },
              at + (i === 0 ? 0.02 : 0.12),
            )
            // 滞留中はゆっくり寄る
            .to(frame, { scale: 1.06, duration: 1.6, ease: "none" }, at + 0.9);

          // 抜け（最後の1人は残す）
          if (i < n - 1) {
            const out = at + 1.75;
            tl.to(
              `${panel} .${styles.reveal}`,
              {
                yPercent: -118,
                opacity: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power3.in",
              },
              out,
            )
              // 写真は次のカットが入ってくるのと同じ時刻に抜ける
              .to(
                shot,
                { opacity: 0, duration: 0.9, ease: "power2.in" },
                at + 2.2,
              )
              .to(
                frame,
                { scale: 1.12, duration: 0.9, ease: "power2.in" },
                at + 2.2,
              )
              .to(
                mark,
                { opacity: 0, xPercent: -8, duration: 0.8, ease: "power2.in" },
                at + 2.2,
              )
              .to(panel, { opacity: 0, duration: 0.4, ease: "power2.in" }, out + 0.3);
          }
        });

        // 最後に少し余白を作って次のセクションへ渡す
        tl.to({}, { duration: 0.8 });
      });

      /* ---------- モバイル：ピンせず、カードを順に読ませる ---------- */
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });

        gsap.utils.toArray<HTMLElement>(`.${styles.panel}`).forEach((p) => {
          gsap.fromTo(
            p.querySelectorAll(`.${styles.reveal}`),
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.09,
              duration: 0.8,
              scrollTrigger: { trigger: p, start: "top 84%", end: "top 40%", scrub: 1 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(`.${styles.panel}`).forEach((p, i) => {
          const shot = document.querySelector<HTMLElement>(
            `.${styles.shot}[data-i="${i}"]`,
          );
          if (!shot) return;
          gsap.fromTo(
            shot,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: p,
                start: "top 82%",
                end: "bottom 42%",
                scrub: 1,
              },
            },
          );
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} id="founders">
      {/* ---------- 背景：人物写真が切り替わる ---------- */}
      <div className={styles.stage} aria-hidden="true">
        {founders.map((f, i) => (
          <div
            key={f.id}
            className={styles.shot}
            data-i={i}
            style={{ "--accent": f.accent } as React.CSSProperties}
          >
            {/* 背景いっぱいに敷く、ぼかした同じカット */}
            <div className={styles.shotAmbient}>
              {f.image ? (
                <Image src={f.image} alt="" fill sizes="100vw" className={styles.shotImg} />
              ) : (
                <span className={styles.shotPlate} />
              )}
            </div>

            {/* 主役のポートレート */}
            <figure className={styles.shotFrame}>
              {f.image ? (
                <Image
                  src={f.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 28vw"
                  className={styles.shotImg}
                />
              ) : (
                <span className={styles.shotPlate} />
              )}
              <figcaption className={styles.shotTag}>{f.brand}</figcaption>
            </figure>

            <span className={styles.shotVeil} />
          </div>
        ))}

        {founders.map((f, i) => (
          <p key={f.id} className={styles.watermark} data-i={i}>
            {f.brandScript}
          </p>
        ))}
      </div>

      <div className={styles.inner}>
        {/* ---------- 見出し ---------- */}
        <div className={styles.head}>
          <p className="u-eyebrow">SECTION 04</p>

          <h2 className={styles.heading}>
            <span className={styles.copyLineMask}>
              <span className={styles.copyLine}>学生起業家たちの</span>
            </span>
            <span className={styles.copyLineMask}>
              <span className={styles.copyLine}>ストーリー</span>
            </span>
          </h2>

          <p className={`u-script-jp ${styles.script}`}>
            それぞれの想いが、
            <br />
            未来を動かす。
            <BrushUnderline
              className={styles.scriptStroke}
              variant="c"
              gradientId="founders-stroke"
            />
          </p>

          <p className={`u-lead ${styles.body}`}>
            美容を通して社会に挑む、学生たちのリアルなストーリー。
            <br />
            夢を追う姿、葛藤、そしてこれからのビジョン。
            <br />
            彼ら・彼女たちの言葉が、あなたの背中を押します。
          </p>

          <a className={`u-pill ${styles.action}`} href="#experience">
            <span>ストーリーを読む</span>
            <ArrowRight className="u-pill__arrow" />
          </a>
        </div>

        {/* ---------- 切り替わるプロフィール ---------- */}
        <div className={styles.panels}>
          {founders.map((f, i) => (
            <article
              key={f.id}
              className={styles.panel}
              data-i={i}
              style={{ "--accent": f.accent } as React.CSSProperties}
            >
              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.index}`}>
                  {f.index} <em>/ {String(founders.length).padStart(2, "0")}</em>
                </span>
              </span>

              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.name}`}>
                  {f.name}
                  <em>{f.nameEn}</em>
                </span>
              </span>

              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.brand}`}>
                  {f.brand}
                </span>
              </span>

              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.meta}`}>
                  {f.school}
                  <i>{f.grade}</i>
                  <i>{f.role}</i>
                </span>
              </span>

              <span className={styles.maskMsg}>
                <span className={`${styles.reveal} ${styles.message}`}>
                  「{f.message}」
                </span>
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* ---------- 進行インジケーター ---------- */}
      <div className={styles.rail} aria-hidden="true">
        <ol className={styles.railList}>
          {founders.map((f, i) => (
            <li key={f.id} className={i === active ? styles.railOn : undefined}>
              {f.index}
            </li>
          ))}
        </ol>
        <span className={styles.railTrack}>
          <span ref={barRef} className={styles.railBar} />
        </span>
      </div>
    </section>
  );
}
