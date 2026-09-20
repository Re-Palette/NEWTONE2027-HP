"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { site } from "@/config/site";
import { ArrowRight } from "@/components/ui/Icons";
import styles from "./Header.module.css";

/**
 * グローバルナビゲーション。
 * HEROのデザインをそのまま維持し、スクロール量に応じて
 * 背景の透明度とボーダーだけをなめらかに変化させます。
 */
export default function Header() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setCondensed(y > 60);
      // 下方向に大きく動いたときだけ隠して、コンテンツの邪魔をしない
      setHidden(y > 520 && y > lastY.current + 4);
      lastY.current = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={[
          styles.header,
          condensed ? styles.isCondensed : "",
          hidden && !open ? styles.isHidden : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.inner}>
          <a className={styles.logo} href="#top" aria-label={site.name}>
            <span className={styles.logoMark}>NEWTONE</span>
            <span className={styles.logoYear}>{site.year}</span>
          </a>

          <span className={styles.rule} aria-hidden="true" />

          <nav className={styles.nav} aria-label="メインナビゲーション">
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.label}>
                  <a className={styles.navLink} href={item.href}>
                    <span>{item.label}</span>
                    <span aria-hidden="true">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a className={`u-cta ${styles.cta}`} href={site.entryHref}>
            <span>ENTRY / JOIN</span>
            <ArrowRight className="u-cta__arrow" />
          </a>

          <button
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            type="button"
          >
            <span className={open ? styles.burgerBarOpen : styles.burgerBar} />
            <span className={open ? styles.burgerBarOpen : styles.burgerBar} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        hidden={!open}
      >
        <ul className={styles.drawerList}>
          {navigation.map((item, i) => (
            <li key={item.label} style={{ transitionDelay: `${0.05 + i * 0.04}s` }}>
              <a href={item.href} onClick={() => setOpen(false)}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className={`u-cta ${styles.drawerCta}`}
          href={site.entryHref}
          onClick={() => setOpen(false)}
        >
          <span>ENTRY / JOIN</span>
          <ArrowRight className="u-cta__arrow" />
        </a>
      </div>
    </>
  );
}
