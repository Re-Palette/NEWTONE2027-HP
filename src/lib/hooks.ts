"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/** SSR で useLayoutEffect の警告を出さないための切り替え */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** メディアクエリの購読 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** デスクトップ（大胆な演出）かどうか */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

/** OS の「視差効果を減らす」設定 */
export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
