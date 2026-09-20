"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { experienceStages } from "@/data/experience";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { revealHeading } from "@/lib/reveal";
import { ArrowRight, BrushUnderline } from "@/components/ui/Icons";
import styles from "./Experience.module.css";

/**
 * SECTION 05 — POPUP EXPERIENCE
 * ---------------------------------------------------------------------------
 * スクロールに合わせて「遠景 → 会場全体 → ブース → 商品 → 来場者」へ
 * カメラが近づいていきます。Web上で会場を歩いているような体験を作ります。
 */
export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const n = experienceStages.length;

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
            end: () => `+=${n * 78}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(n - 1, Math.floor(self.progress * n * 0.999));
              setActive((prev) => (prev === i ? prev : i));
            },
          },
        });

        experienceStages.forEach((stage, i) => {
          const at = i * 1.9;
          const shot = `.${styles.shot}[data-i="${i}"]`;
          const inner = `.${styles.shotInner}[data-i="${i}"]`;
          const panel = `.${styles.panel}[data-i="${i}"]`;

          // カメラが寄っていく：常に前の画より大きなスケールで入って、さらに寄る。
          // 先頭のカットは最初から表示しておき、ピン開始前に黒く抜けないようにする。
          tl.fromTo(
            shot,
            { opacity: i === 0 ? 1 : 0 },
            { opacity: 1, duration: 0.7, ease: "power1.inOut" },
            at,
          )
            .fromTo(
              inner,
              { scale: stage.zoom, z: -260 },
              {
                scale: stage.zoom * 1.07,
                z: 0,
                duration: 2.6,
                ease: "none",
              },
              at,
            )
            // パネルの地色も一緒に出し入れして、空の箱が残らないようにする
            .fromTo(
              panel,
              { opacity: i === 0 ? 1 : 0 },
              { opacity: 1, duration: 0.4, ease: "power2.out" },
              at + (i === 0 ? 0 : 0.08),
            )
            .fromTo(
              `${panel} .${styles.reveal}`,
              { yPercent: 120, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.12,
                ease: "power3.out",
              },
              at + (i === 0 ? 0.05 : 0.15),
            );

          if (i < n - 1) {
            // 写真は次のカットが入ってくるのと同じ時刻に抜けて、
            // 画面が一度暗く沈まないようにする
            const out = at + 1.5;
            tl.to(shot, { opacity: 0, duration: 0.7, ease: "power1.inOut" }, at + 1.9)
              .to(
                `${panel} .${styles.reveal}`,
                {
                  yPercent: -120,
                  opacity: 0,
                  duration: 0.45,
                  stagger: 0.07,
                  ease: "power3.in",
                },
                out - 0.1,
              )
              .to(panel, { opacity: 0, duration: 0.4, ease: "power2.in" }, out + 0.15);
          }
        });

        // 会場に踏み込む「フレーム」が、奥へ通り過ぎていく
        tl.fromTo(
          `.${styles.gate}`,
          { scale: 0.72, opacity: 0.85 },
          { scale: 3.4, opacity: 0, ease: "none", duration: n * 1.9 },
          0,
        );

        tl.to({}, { duration: 0.7 });
      });

      /* ---------- モバイル：縦に歩いていく構成 ---------- */
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });

        gsap.utils.toArray<HTMLElement>(`.${styles.stageRow}`).forEach((row) => {
          const inner = row.querySelector(`.${styles.shotInner}`);
          if (inner) {
            gsap.fromTo(
              inner,
              { scale: 1.18 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
          gsap.fromTo(
            row.querySelectorAll(`.${styles.reveal}`),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              scrollTrigger: { trigger: row, start: "top 82%", end: "top 42%", scrub: 1 },
            },
          );
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} id="experience">
      {/* ---------- 会場ビジュアル（デスクトップは重ねて切り替え） ---------- */}
      <div className={styles.stage} aria-hidden="true">
        {experienceStages.map((s, i) => (
          <div key={s.id} className={styles.shot} data-i={i}>
            <div className={`${styles.shotInner} u-grain`} data-i={i}>
              {s.image ? (
                <Image
                  src={s.image}
                  alt=""
                  fill
                  quality={92}
                  sizes="100vw"
                  className={styles.shotImg}
                />
              ) : (
                <span className={styles.shotPlate} />
              )}
            </div>
          </div>
        ))}
        <span className={styles.veil} />
        <span className={styles.gate} />
      </div>

      <div className={styles.inner}>
        <div className={styles.head}>
          <p className="u-eyebrow">SECTION 05</p>

          <h2 className={styles.heading}>
            <span className={styles.copyLineMask}>
              <span className={styles.copyLine}>POPUPで体験できる</span>
            </span>
            <span className={styles.copyLineMask}>
              <span className={styles.copyLine}>特別な空間</span>
            </span>
          </h2>

          <p className={`u-script-jp ${styles.script}`}>
            見て、触れて、出会う。
            <BrushUnderline
              className={styles.scriptStroke}
              variant="a"
              gradientId="experience-stroke"
            />
          </p>

          <p className={`u-lead ${styles.body}`}>
            ブランドの世界観を体験できるブースや、
            <br />
            学生起業家たちとの交流、
            <br />
            限定イベントなど、ここでしか味わえない
            <br />
            特別な体験を用意しています。
          </p>

          <a className={`u-pill ${styles.action}`} href="#entry">
            <span>イベント詳細を見る</span>
            <ArrowRight className="u-pill__arrow" />
          </a>
        </div>

        {/* ---------- カメラの各地点 ---------- */}
        <div className={styles.panels}>
          {experienceStages.map((s, i) => (
            <article key={s.id} className={styles.panel} data-i={i}>
              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.step}`}>
                  {s.step}
                  <em>{s.label}</em>
                </span>
              </span>
              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.title}`}>{s.title}</span>
              </span>
              <span className={styles.mask}>
                <span className={`${styles.reveal} ${styles.text}`}>{s.body}</span>
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* ---------- モバイル用：縦に歩く ---------- */}
      <div className={styles.mobileTrail}>
        {experienceStages.map((s) => (
          <div key={s.id} className={styles.stageRow}>
            <div className={styles.rowMedia}>
              <div className={`${styles.shotInner} u-grain`}>
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    quality={92}
                    sizes="100vw"
                    className={styles.shotImg}
                  />
                ) : (
                  <span className={styles.shotPlate} />
                )}
              </div>
              <span className={styles.rowVeil} />
            </div>
            <div className={styles.rowBody}>
              <p className={`${styles.reveal} ${styles.step}`}>
                {s.step}
                <em>{s.label}</em>
              </p>
              <p className={`${styles.reveal} ${styles.title}`}>{s.title}</p>
              <p className={`${styles.reveal} ${styles.text}`}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- 進行インジケーター ---------- */}
      <ol className={styles.rail} aria-hidden="true">
        {experienceStages.map((s, i) => (
          <li key={s.id} className={i === active ? styles.railOn : undefined}>
            <span>{s.step}</span>
            <i>{s.label}</i>
          </li>
        ))}
      </ol>
    </section>
  );
}
