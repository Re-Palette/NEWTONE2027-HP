"use client";

import { useEffect, useRef } from "react";
import styles from "./CosmicField.module.css";

type Particle = {
  x: number;
  y: number;
  z: number; // 0=奥 1=手前
  r: number;
  vx: number;
  vy: number;
  hue: number;
  phase: number;
};

const HUES = [212, 232, 262, 288, 318, 332];

/**
 * 背景の粒子フィールド。
 * ページ全体のスクロール進行に応じて、光源の位置と粒子の流れが移動します。
 * （スクロールを止めれば流れも止まり、戻せば逆方向に流れます）
 */
export default function CosmicField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    /** スクロール進行（0..1）— これが演出の主軸 */
    let progress = 0;
    let smoothProgress = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const density = coarse ? 42000 : 17000;
      const count = Math.round(Math.min(area / density, coarse ? 46 : 150));

      particles = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.45 + z * 2.1,
          vx: (Math.random() - 0.5) * 0.14 * (0.4 + z),
          vy: -(0.05 + Math.random() * 0.22) * (0.4 + z),
          hue: HUES[Math.floor(Math.random() * HUES.length)],
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    /** 巨大なソフト光源。スクロールで画面内を移動する */
    const drawAurora = (t: number) => {
      const p = smoothProgress;
      const blobs = [
        {
          x: w * (0.22 + Math.sin(t * 0.00008) * 0.05 + p * 0.62),
          y: h * (0.3 + p * 0.34 + Math.cos(t * 0.0001) * 0.05),
          r: Math.max(w, h) * (0.5 + p * 0.16),
          c: [90, 60, 255] as const,
          a: 0.3,
        },
        {
          x: w * (0.82 - p * 0.68 + Math.cos(t * 0.00011) * 0.04),
          y: h * (0.62 - p * 0.4),
          r: Math.max(w, h) * 0.46,
          c: [255, 62, 165] as const,
          a: 0.24,
        },
        {
          x: w * (0.5 + Math.sin(t * 0.00006 + p * 4) * 0.34),
          y: h * (0.18 + p * 0.6),
          r: Math.max(w, h) * 0.38,
          c: [64, 150, 255] as const,
          a: 0.26,
        },
      ];

      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
        g.addColorStop(0.45, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a * 0.3})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);

      readScroll();
      smoothProgress += (progress - smoothProgress) * 0.08;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, w, h);
      drawAurora(t);

      // スクロール量そのものを粒子のドリフト量に変換する
      const drift = smoothProgress * h * 0.55;
      const px = (pointer.x - 0.5) * 34;
      const py = (pointer.y - 0.5) * 22;

      ctx.globalCompositeOperation = "lighter";
      for (const s of particles) {
        if (!reduced) {
          s.x += s.vx;
          s.y += s.vy;
        }
        if (s.y < -20) s.y = h + 20;
        if (s.y > h + 20) s.y = -20;
        if (s.x < -20) s.x = w + 20;
        if (s.x > w + 20) s.x = -20;

        const depth = 0.32 + s.z;
        const x = s.x + px * depth;
        const y = ((s.y - drift * depth) % (h + 80) + h + 80) % (h + 80) - 40 + py * depth;

        const tw = reduced ? 0.7 : 0.45 + Math.sin(t * 0.0016 + s.phase) * 0.35;
        const alpha = (0.14 + s.z * 0.5) * tw;
        const r = s.r * (1 + smoothProgress * 0.5);

        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
        g.addColorStop(0, `hsla(${s.hue}, 100%, 82%, ${alpha})`);
        g.addColorStop(0.35, `hsla(${s.hue}, 100%, 66%, ${alpha * 0.4})`);
        g.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${s.hue}, 100%, 95%, ${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 180);
    };

    build();
    readScroll();
    smoothProgress = progress;
    raf = requestAnimationFrame(frame);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.base} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}
