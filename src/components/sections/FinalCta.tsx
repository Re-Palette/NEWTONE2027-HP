"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { ArrowRight } from "@/components/ui/Icons";
import styles from "./FinalCta.module.css";

/**
 * SECTION 06 — FINAL CTA
 * HEROと呼応させ、最後にもう一度世界観を広げて着地させます。
 */
export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl.fromTo(
          `.${styles.halo}`,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          0,
        )
          .fromTo(
            `.${styles.line}`,
            { yPercent: 118, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.18,
              ease: "power3.out",
            },
            0.2,
          )
          .fromTo(
            `.${styles.creedWord}`,
            { yPercent: 130, opacity: 0, rotateX: -60 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.7,
              stagger: 0.14,
              ease: "power3.out",
            },
            0.7,
          )
          .fromTo(
            [`.${styles.sub}`, `.${styles.actions}`, `.${styles.meta}`],
            { y: 34, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
            1.1,
          )
          .fromTo(
            `.${styles.lockup}`,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
            1.2,
          );

        // 背景の光がスクロールに合わせて流れ続ける
        gsap.to(`.${styles.halo}`, {
          yPercent: -18,
          scale: 1.22,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} id="entry">
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.rays} aria-hidden="true" />

      <div className={styles.inner}>
        <p className="u-eyebrow">SECTION 06</p>

        <h2 className={styles.headline}>
          <span className={styles.lineMask}>
            <span className={styles.line}>次の</span>
          </span>
          <span className={styles.lineMask}>
            <span className={styles.line}>キレイをつくるのは、</span>
          </span>
          <span className={styles.lineMask}>
            <span className={styles.line}>あなたかもしれない。</span>
          </span>
        </h2>

        <p className={styles.creed}>
          {site.creed.map((w) => (
            <span key={w} className={styles.creedWord}>
              {w}
            </span>
          ))}
        </p>

        <p className={styles.sub}>出会って、つながって、未来をつくる。</p>

        <div className={styles.actions}>
          <a className={`u-cta ${styles.entry}`} href="#contact">
            <span>ENTRY / JOIN</span>
            <ArrowRight className="u-cta__arrow" />
          </a>
          <a className={`u-pill ${styles.secondary}`} href="#contact">
            <span>出展・協賛のご相談</span>
            <ArrowRight className="u-pill__arrow" />
          </a>
        </div>

        <dl className={styles.meta}>
          <div>
            <dt>DATE</dt>
            <dd>2027.03.19 FRI — 03.21 SUN</dd>
          </div>
          <div>
            <dt>VENUE</dt>
            <dd>TOKYO / 会場調整中</dd>
          </div>
          <div>
            <dt>ENTRY</dt>
            <dd>学生無料 / 一般 ¥1,500</dd>
          </div>
        </dl>

        <div className={styles.lockup} aria-hidden="true">
          <span className={styles.lockMark}>NEWTONE</span>
          <span className={styles.lockYear}>{site.year}</span>
          <span className={styles.lockScript}>{site.tagline}</span>
        </div>
      </div>
    </section>
  );
}
