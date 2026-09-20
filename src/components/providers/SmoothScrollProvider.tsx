"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis による慣性スクロールを GSAP ScrollTrigger と同期させる。
 *  - Lenis の scroll イベントで ScrollTrigger.update() を呼ぶ
 *  - Lenis の raf を gsap.ticker に乗せて RAF を1本化する
 *  - prefers-reduced-motion / タッチデバイスでは慣性を弱める
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      document.documentElement.classList.add("is-reduced-motion");
      ScrollTrigger.refresh();
      return;
    }

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // タッチはネイティブのままの方が軽く、指の動きとも一致する
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    // 画像などの遅延読み込みで高さが変わったら計測し直す
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // アンカーリンクを Lenis 経由でスクロールさせる
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
