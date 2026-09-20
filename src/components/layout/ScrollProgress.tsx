"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

/** ページ最上部に置く、スクロール進行のインジケーター */
export default function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <span ref={bar} className={styles.bar} />
    </div>
  );
}
