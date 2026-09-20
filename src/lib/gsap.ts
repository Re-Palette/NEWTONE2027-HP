"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  // スクロール量＝アニメーション進行量にするため、ラグ補正は切っておく
  gsap.ticker.lagSmoothing(0);
  registered = true;
}

export { gsap, ScrollTrigger };
