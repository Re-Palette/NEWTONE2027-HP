import { navigation } from "@/data/navigation";
import { site } from "@/config/site";
import { SocialGlyph } from "@/components/ui/Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <a className={styles.logo} href="#top" aria-label={site.name}>
          <span className={styles.logoMark}>NEWTONE</span>
          <span className={styles.logoYear}>{site.year}</span>
        </a>

        <nav className={styles.nav} aria-label="フッターナビゲーション">
          <ul>
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.social}>
          {site.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label}>
                <SocialGlyph name={s.label} />
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.copy}>
          © {site.year} NEWTONE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
