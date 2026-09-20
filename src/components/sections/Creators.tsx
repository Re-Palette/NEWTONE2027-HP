"use client";

import Image from "next/image";
import { useRef } from "react";
import { creators } from "@/data/creators";
import { media } from "@/config/media";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { revealHeading } from "@/lib/reveal";
import { ArrowRight, BrushUnderline } from "@/components/ui/Icons";
import styles from "./Creators.module.css";

/**
 * 3D空間上のカード配置。
 *  x / y … ステージ中央からのオフセット（ステージ幅・高さに対する％）
 *  z     … 開始時の奥行き（px）。スクロールで 0 まで手前に進んできます
 *  r     … Y軸まわりの傾き
 * データが増えても、この並びが順番に割り当てられます。
 */
const SLOTS = [
  { x: -32, y: -20, z: -1500, r: -7 },
  { x: 27, y: -24, z: -2100, r: 6 },
  { x: -34, y: 12, z: -1150, r: 4 },
  { x: 31, y: 15, z: -1750, r: -5 },
  { x: -14, y: 26, z: -2400, r: 3 },
  { x: 34, y: -4, z: -900, r: 8 },
  { x: -35, y: -3, z: -2600, r: -4 },
  { x: 10, y: -28, z: -1350, r: 5 },
  { x: 3, y: 30, z: -1900, r: -6 },
];

export default function Creators() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ================= DESKTOP : 3D空間をスクロールで前進 ================= */
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        // 見出しはピンとは独立して、セクションが入ってきた時点から立ち上げる
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=320%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // 1. 中央に光が生まれる
        tl.fromTo(
          `.${styles.burst}`,
          { scale: 0.32, opacity: 0.35 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          0,
        )
          .to(`.${styles.burst}`, { opacity: 0.45, duration: 1.6 }, 0.8)

          // 2. 奥にあったカードが、スクロール量のぶんだけ手前へ進んでくる
          .fromTo(
            `.${styles.card}`,
            {
              z: (i: number) => SLOTS[i % SLOTS.length].z,
              opacity: 0,
              rotateY: (i: number) => SLOTS[i % SLOTS.length].r * 2.2,
            },
            {
              z: 0,
              opacity: 1,
              rotateY: (i: number) => SLOTS[i % SLOTS.length].r * 0.35,
              duration: 2.6,
              stagger: { each: 0.16, from: "center" },
              ease: "none",
            },
            0,
          )

          // 3. 中央の大判カットが定位する
          .fromTo(
            `.${styles.lead}`,
            { scale: 0.8, opacity: 0.45, filter: "blur(8px)" },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power2.out",
            },
            0,
          )

          // 4. さらに奥へ抜けるように、手前のカードが通り過ぎる
          .to(
            `.${styles.field}`,
            { z: 520, ease: "none", duration: 1.2 },
            2.5,
          )
          .to(`.${styles.card}`, { opacity: 0.12, duration: 0.9 }, 2.8);
      });

      /* ================= MOBILE / 低負荷版 ================= */
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });

        gsap.fromTo(
          `.${styles.card}`,
          { y: 60, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            duration: 0.9,
            scrollTrigger: {
              trigger: `.${styles.field}`,
              start: "top 88%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          `.${styles.lead}`,
          { scale: 0.86, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: `.${styles.field}`,
              start: "top 92%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} id="creators">
      <div className={styles.burst} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ---------- 左：コピー ---------- */}
        <div className={styles.copy}>
          <p className="u-eyebrow">SECTION 02</p>

          <h2 className={styles.heading}>
            <span className={styles.copyLineMask}>
              <span className={styles.copyLine}>全国の美容系学生起業家・</span>
            </span>
            <span className={styles.copyLineMask}>
              <span className={styles.copyLine}>活動家が集結</span>
            </span>
          </h2>

          <p className={`u-script-jp ${styles.script}`}>
            次世代の才能と、つながる。
            <BrushUnderline
              className={styles.scriptStroke}
              variant="a"
              gradientId="creators-stroke"
            />
          </p>

          <p className={`u-lead ${styles.body}`}>
            全国から集まった、美容を通して
            <br />
            社会に変化を起こす学生起業家・活動家たち。
            <br />
            それぞれの想い、ブランド、ストーリーが
            <br />
            ここで出会い、新しい未来をつくります。
          </p>

          <a className={`u-pill ${styles.action}`} href="#founders">
            <span>出展者一覧を見る</span>
            <ArrowRight className="u-pill__arrow" />
          </a>
        </div>

        {/* ---------- 右：3D空間に浮かぶカード ---------- */}
        <div className={styles.stage}>
          <div className={styles.field}>
            <div className={`${styles.lead} u-grain`}>
              <Image
                src={media.creators.lead}
                alt=""
                fill
                quality={92}
                sizes="(max-width: 519px) 94vw, (max-width: 1023px) 60vw, 34vw"
                className={styles.leadImg}
              />
              <span className={styles.leadGlow} aria-hidden="true" />
            </div>

            {creators.map((c, i) => {
              const slot = SLOTS[i % SLOTS.length];
              return (
                /* 位置決めはスロット側で行い、カード側の transform は GSAP が持つ */
                <div
                  key={c.id}
                  className={styles.slot}
                  style={
                    {
                      "--x": `${slot.x}%`,
                      "--y": `${slot.y}%`,
                      zIndex: Math.round(100 + slot.z / 100),
                    } as React.CSSProperties
                  }
                >
                <article
                  className={styles.card}
                  style={{ "--accent": c.accent } as React.CSSProperties}
                >
                  <div className={`${styles.cardMedia} u-grain`}>
                    {c.image ? (
                      <Image
                        src={c.image}
                        alt={`${c.name}（${c.brand}）`}
                        fill
                        quality={92}
                        sizes="(max-width: 519px) 94vw, (max-width: 1023px) 46vw, 340px"
                        className={styles.cardImg}
                      />
                    ) : (
                      <span className={styles.cardPlate} aria-hidden="true">
                        {c.brand.slice(0, 2)}
                      </span>
                    )}
                    <span className={styles.cardCat}>{c.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <p className={styles.cardBrand}>{c.brand}</p>
                    <p className={styles.cardName}>
                      {c.name}
                      <em>{c.nameEn}</em>
                    </p>
                    <p className={styles.cardSchool}>
                      <span>{c.area}</span>
                      {c.school}
                    </p>
                    <p className={styles.cardActivity}>{c.activity}</p>
                  </div>
                </article>
                </div>
              );
            })}
          </div>

          <p className={styles.stageNote} aria-hidden="true">
            NEXT GENERATION CREATORS
          </p>
        </div>
      </div>
    </section>
  );
}
