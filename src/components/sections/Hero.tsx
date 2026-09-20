"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/config/site";
import { media } from "@/config/media";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { ArrowDown, ArrowRight, BrushUnderline } from "@/components/ui/Icons";
import styles from "./Hero.module.css";

/**
 * HERO SECTION
 * ---------------------------------------------------------------------------
 * デザインカンプの構成をそのまま再現しています。
 * レイアウト・タイポグラフィ・カラー・装飾の位置関係は変更しないでください。
 * スクロールを始めた瞬間から、各レイヤーが奥行きを持って離脱していきます。
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /* ---------- 初回のイントロ ---------- */
      if (!reduced) {
        const intro = gsap.timeline({
          defaults: { ease: "expo.out" },
          delay: 0.15,
        });

        intro
          .from(`.${styles.portrait}`, {
            scale: 1.16,
            opacity: 0,
            duration: 2.1,
            ease: "power3.out",
          })
          .from(
            `.${styles.ribbon}`,
            { opacity: 0, duration: 1.8, stagger: 0.12 },
            0.1,
          )
          .from(
            `.${styles.lede}`,
            { yPercent: 60, opacity: 0, duration: 1.2 },
            0.45,
          )
          .from(
            `.${styles.wordLetter}`,
            {
              yPercent: 118,
              opacity: 0,
              duration: 1.5,
              stagger: 0.055,
            },
            0.5,
          )
          .from(
            `.${styles.year}`,
            { scale: 1.22, opacity: 0, duration: 1.4 },
            0.95,
          )
          .from(
            `.${styles.script}`,
            { opacity: 0, xPercent: -6, duration: 1.4 },
            1.15,
          )
          .from(
            [`.${styles.subCopy}`, `.${styles.creed}`, `.${styles.scroll}`],
            { y: 26, opacity: 0, duration: 1.1, stagger: 0.12 },
            1.25,
          )
          .from(
            [`.${styles.copyLeft}`, `.${styles.copyRight}`],
            { opacity: 0, y: 34, duration: 1.3, stagger: 0.1 },
            0.8,
          )
          .from(
            `.${styles.badge}`,
            { opacity: 0, scale: 0.82, duration: 1.3 },
            1.3,
          )
          .from(
            `.${styles.catItem}`,
            { opacity: 0, x: 18, duration: 0.8, stagger: 0.05 },
            1.35,
          );
      }

      /* ---------- スクロール同期の離脱演出 ----------
         scrub: true なので、スクロールを止めれば止まり、戻せば巻き戻ります。 */
      const depart = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      depart
        .to(`.${styles.portrait}`, { scale: 1.22, yPercent: 7 }, 0)
        .to(`.${styles.ribbons}`, { yPercent: -16, opacity: 0.25 }, 0)
        .to(`.${styles.center}`, { yPercent: -26, opacity: 0 }, 0)
        .to(`.${styles.copyLeft}`, { xPercent: -52, opacity: 0 }, 0)
        .to(`.${styles.copyRight}`, { xPercent: 52, opacity: 0 }, 0)
        .to(`.${styles.badge}`, { yPercent: 70, opacity: 0, scale: 0.86 }, 0)
        .to(`.${styles.categories}`, { xPercent: 42, opacity: 0 }, 0)
        .to(`.${styles.scroll}`, { opacity: 0, duration: 0.25 }, 0)
        .to(`.${styles.floor}`, { opacity: 1 }, 0);

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.hero} id="top">
      {/* ---------- 背景レイヤー ---------- */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.portraitWrap}>
          <Image
            src={media.hero.portrait}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.portrait}
          />
        </div>

        {/* 光のリボン（デザインの左右に流れる光） */}
        <svg
          className={styles.ribbons}
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="hr-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4fae" stopOpacity="0" />
              <stop offset="45%" stopColor="#ff8ad8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7ec8ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hr-b" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ec8ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#c6b3ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ff4fae" stopOpacity="0" />
            </linearGradient>
            <filter id="hr-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#hr-glow)">
            <path
              className={styles.ribbon}
              d="M1290 -40C1180 180 1420 330 1330 520c-70 150-250 200-300 420"
              stroke="url(#hr-b)"
              strokeWidth="2.4"
              fill="none"
            />
            <path
              className={styles.ribbon}
              d="M1420 -20C1330 200 1520 340 1400 560c-80 145-190 190-230 380"
              stroke="url(#hr-a)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              className={styles.ribbon}
              d="M1180 40C1120 240 1330 360 1250 540"
              stroke="url(#hr-a)"
              strokeWidth="1"
              fill="none"
            />
            <path
              className={styles.ribbon}
              d="M180 -20C250 200 60 320 160 520c60 120 180 180 210 400"
              stroke="url(#hr-b)"
              strokeWidth="1.6"
              fill="none"
            />
            <path
              className={styles.ribbon}
              d="M60 120C140 300 -10 400 80 580"
              stroke="url(#hr-a)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </svg>

        <div className={styles.bloom} />
        <div className={styles.crowd} />
        <div className={styles.floor} />
      </div>

      {/* ---------- 左のコピー ---------- */}
      <div className={styles.copyLeft}>
        <p className={styles.copyLeftText}>
          <span>美しさは、</span>
          <span>わたしたちが</span>
          <span className={styles.copyEmphasis}>
            つくる<em>未来。</em>
            <BrushUnderline
              className={styles.copyStroke}
              variant="a"
              gradientId="hero-stroke-a"
            />
          </span>
        </p>
      </div>

      {/* ---------- 右のコピー ---------- */}
      <div className={styles.copyRight}>
        <p className={styles.copyRightText}>
          <span>美の</span>
          <span>常識を、</span>
          <span>アップデート</span>
          <span className={styles.copyEmphasis}>
            しよう。
            <BrushUnderline
              className={styles.copyStrokeRight}
              variant="c"
              gradientId="hero-stroke-c"
            />
          </span>
        </p>
      </div>

      {/* ---------- センターの主役 ---------- */}
      <div className={styles.center}>
        <p className={styles.lede}>{site.lede}</p>

        <h1 className={styles.title}>
          <span className="u-sr">
            {site.name} — {site.tagline}
          </span>

          <span className={styles.word} aria-hidden="true">
            {"NEWTONE".split("").map((c, i) => (
              <span key={i} className={styles.wordLetter}>
                <span className={styles.wordGlyph} data-glyph={c}>
                  {c}
                </span>
              </span>
            ))}
          </span>

          <span className={styles.yearRow} aria-hidden="true">
            <span className={styles.year}>{site.year}</span>
            <span className={styles.script}>
              {site.tagline}
              <BrushUnderline
                className={styles.scriptStroke}
                variant="b"
                gradientId="hero-stroke-b"
              />
            </span>
          </span>
        </h1>

        <p className={styles.subCopy}>未来の“好き”に、きっと出会える。</p>

        <p className={styles.creed}>
          {site.creed.map((w, i) => (
            <span key={w} className={i === 1 ? styles.creedAccent : undefined}>
              {w}
            </span>
          ))}
        </p>

        <a className={styles.scroll} href="#creators">
          <span>SCROLL</span>
          <ArrowDown className={styles.scrollArrow} />
        </a>
      </div>

      {/* ---------- 左下のサークルバッジ ---------- */}
      <a className={styles.badge} href="#creators">
        <span className={styles.badgeRing} aria-hidden="true" />
        <span className={styles.badgeText}>
          学生起業家が
          <br />
          生み出す、
          <br />
          新しい美容の
          <br />
          カタチ。
        </span>
        <ArrowRight className={styles.badgeArrow} />
      </a>

      {/* ---------- 右下のカテゴリー ---------- */}
      <ul className={styles.categories}>
        {site.categories.map((c) => (
          <li key={c} className={styles.catItem}>
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
