"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { brands } from "@/data/brands";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { revealHeading } from "@/lib/reveal";
import { ArrowRight, BrushUnderline } from "@/components/ui/Icons";
import styles from "./Brands.module.css";

const CATEGORIES = [
  "SKINCARE",
  "MAKEUP",
  "HAIRCARE",
  "INNER CARE",
  "BEAUTY TOOL",
  "FRAGRANCE",
] as const;

export default function Brands() {
  const root = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!el || !track || !viewport) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /**
       * カードの位置に応じて 奥行き（Z）・回転・明度 を毎フレーム更新する。
       * 画面中央に近いカードほど手前に、離れるほど奥に倒れて沈みます。
       */
      const applyDepth = () => {
        const outers = gsap.utils.toArray<HTMLElement>(`.${styles.outer}`);
        const half = viewport.clientWidth * 0.5;
        const trackX = (gsap.getProperty(track, "x") as number) || 0;
        let nearest = 0;
        let nearestDist = Infinity;

        outers.forEach((outer, i) => {
          const inner = outer.firstElementChild as HTMLElement | null;
          if (!inner) return;
          // レイアウト位置なので、自身の transform には影響されない
          const center = outer.offsetLeft + outer.offsetWidth / 2 + trackX;
          const d = (center - half) / half; // -1..1
          const clamped = gsap.utils.clamp(-1.6, 1.6, d);
          const abs = Math.abs(clamped);

          gsap.set(inner, {
            z: -abs * 340,
            rotateY: clamped * -26,
            scale: 1 - abs * 0.14,
            filter: `brightness(${1 - abs * 0.26}) saturate(${1 - abs * 0.12})`,
            zIndex: 100 - Math.round(abs * 50),
          });

          if (abs < nearestDist) {
            nearestDist = abs;
            nearest = i;
          }
        });

        // 毎フレーム呼ばれるので、変化したときだけ再描画する
        setActive((prev) => (prev === nearest ? prev : nearest));
      };

      /* ================= DESKTOP ================= */
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        // 見出しはピンとは独立して、セクションが入ってきた時点から立ち上げる
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });

        const distance = () =>
          Math.max(track.scrollWidth - viewport.clientWidth, 0);

        /**
         * カードが左右の画面外から中央へ集まってくるところまでは、
         * ピンの前（セクションが画面に入ってくる間）に終わらせる。
         * こうすることで、ピンが始まった瞬間に空っぽの画面が出ない。
         */
        gsap.fromTo(
          `.${styles.outer}`,
          {
            x: (i: number) => (i % 2 === 0 ? -1 : 1) * (560 + i * 90),
            y: (i: number) => (i % 3 === 0 ? 80 : -62),
            opacity: 0,
            rotate: (i: number) => (i % 2 === 0 ? -14 : 12),
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: { each: 0.07, from: "edges" },
            scrollTrigger: {
              trigger: el,
              start: "top 96%",
              end: "top 12%",
              scrub: 1,
            },
          },
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.9}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: applyDepth,
          },
        });

        /**
         * scrub のトゥイーンはスクロールが止まったあとも動き続けるため、
         * ScrollTrigger の onUpdate だけでは奥行きの更新が取り残される。
         * セクションが表示されている間は毎フレーム更新する。
         */
        const tick = () => {
          if (tl.scrollTrigger?.isActive) applyDepth();
        };
        gsap.ticker.add(tick);

        // 1. カードが左右の画面外から中央へ集まってくる
        tl.fromTo(
            `.${styles.outer}`,
            {
              x: (i: number) => (i % 2 === 0 ? -1 : 1) * (620 + i * 110),
              y: (i: number) => (i % 3 === 0 ? 90 : -70),
              opacity: 0,
              rotate: (i: number) => (i % 2 === 0 ? -14 : 12),
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 1.5,
              ease: "power3.out",
              stagger: { each: 0.08, from: "edges" },
            },
            0,
          )

          // 2. 集まったカード列が、奥行きを保ったまま横に流れていく
          .to(
            track,
            { x: () => -distance(), ease: "none", duration: 3.4 },
            1.35,
          );

        return () => {
          gsap.ticker.remove(tick);
          gsap.set(`.${styles.inner3d}`, { clearProps: "all" });
        };
      });

      /* ================= MOBILE / 低負荷版 ================= */
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        revealHeading(el, {
          lines: `.${styles.copyLine}`,
          items: [`.${styles.script}`, `.${styles.body}`, `.${styles.action}`],
        });
        gsap.fromTo(
          `.${styles.outer}`,
          { y: 48, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: track,
              start: "top 88%",
              end: "bottom 55%",
              scrub: 1,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} id="brands">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.head}>
        <p className="u-eyebrow">SECTION 03</p>

        <h2 className={styles.heading}>
          <span className={styles.copyLineMask}>
            <span className={styles.copyLine}>出展ブランドを</span>
          </span>
          <span className={styles.copyLineMask}>
            <span className={styles.copyLine}>スクロールで体感</span>
          </span>
        </h2>

        <p className={`u-script-jp ${styles.script}`}>
          学生の想いが、ブランドになる。
          <BrushUnderline
            className={styles.scriptStroke}
            variant="b"
            gradientId="brands-stroke"
          />
        </p>

        <p className={`u-lead ${styles.body}`}>
          スキンケア、メイク、ヘアケア、インナーケアまで。
          <br />
          学生たちが企画・開発したオリジナルブランドが
          <br />
          次々と登場。ここでしか出会えない“好き”がきっとある。
        </p>

        <a className={`u-pill ${styles.action}`} href="#experience">
          <span>ブランド一覧を見る</span>
          <ArrowRight className="u-pill__arrow" />
        </a>

        <ul className={styles.cats} aria-label="カテゴリー">
          {CATEGORIES.map((c) => (
            <li
              key={c}
              className={brands[active]?.category === c ? styles.catOn : undefined}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- 奥行きのあるカルーセル ---------- */}
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {brands.map((b, i) => (
            <div key={b.id} className={styles.outer}>
              <article
                className={styles.inner3d}
                style={
                  {
                    "--c1": b.palette[0],
                    "--c2": b.palette[1],
                  } as React.CSSProperties
                }
              >
                <div className={`${styles.media} u-grain`}>
                  {b.image ? (
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      quality={92}
                      sizes="(max-width: 519px) 94vw, (max-width: 1023px) 46vw, 24vw"
                      className={styles.mediaImg}
                    />
                  ) : (
                    <span className={styles.plate} aria-hidden="true">
                      <span className={styles.plateGloss} />
                      <span className={styles.plateMark}>{b.name.charAt(0)}</span>
                    </span>
                  )}
                  <span className={styles.no}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.cat}>{b.category}</span>
                </div>

                <div className={styles.body2}>
                  <p className={styles.name}>{b.name}</p>
                  <p className={styles.catJa}>{b.categoryJa}</p>
                  <p className={styles.copy}>{b.copy}</p>
                  <p className={styles.founder}>
                    <span>FOUNDER</span>
                    {b.founder}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* 右端の縦組みインジケーター */}
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railLabel}>BRANDS</span>
        <span className={styles.railCount}>
          {String(active + 1).padStart(2, "0")}
          <em>/</em>
          {String(brands.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
