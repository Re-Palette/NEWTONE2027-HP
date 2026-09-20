import CosmicField from "@/components/fx/CosmicField";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Creators from "@/components/sections/Creators";
import Brands from "@/components/sections/Brands";
import Founders from "@/components/sections/Founders";
import Experience from "@/components/sections/Experience";
import FinalCta from "@/components/sections/FinalCta";

export default function Page() {
  return (
    <>
      <CosmicField />
      <ScrollProgress />
      <Header />

      <main>
        {/* 01 — HERO（デザインカンプの再現。変更しないこと） */}
        <Hero />

        {/* 02 — 全国の美容系学生起業家・活動家が集結 */}
        <Creators />

        {/* 03 — 出展ブランドをスクロールで体感 */}
        <Brands />

        {/* 04 — 学生起業家たちのストーリー（PINNED） */}
        <Founders />

        {/* 05 — POPUPで体験できる特別な空間 */}
        <Experience />

        {/* 06 — FINAL CTA */}
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
