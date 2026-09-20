"use client";

import { gsap } from "@/lib/gsap";

/**
 * セクションの見出しまわりの立ち上がり。
 *
 * PINNEDセクションでは、ピン開始（= セクション上端が画面上端に来た時点）を
 * 起点にすると、そこに至るまでの間が「真っ暗な空白」になってしまう。
 * 見出しはピンとは別に、セクションが画面に入ってきた時点から
 * スクロール同期で立ち上げる。
 */
export function revealHeading(
  section: Element,
  targets: { lines: string; items: string[] },
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 88%",
      end: "top 28%",
      scrub: 1,
    },
  });

  tl.fromTo(
    targets.lines,
    { yPercent: 112, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.14,
      ease: "power3.out",
    },
    0,
  ).fromTo(
    targets.items,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
    0.3,
  );

  return tl;
}
