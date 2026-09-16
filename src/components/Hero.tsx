import { useEffect, useRef, useState } from "react";
import { content } from "../content";

export default function Hero() {
  const [isDark, setIsDark] = useState(true);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const bgBackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (isDark) document.body.classList.remove("light-theme");
    else document.body.classList.add("light-theme");
  }, [isDark]);

  useEffect(() => {
    if (bgFrontRef.current) bgFrontRef.current.style.backgroundImage = `url(${content.images.dark})`;
    if (bgBackRef.current) bgBackRef.current.style.backgroundImage = `url(${content.images.dark})`;
  }, []);

  function toggleTheme(toDark: boolean) {
    if (toDark === isDark || animatingRef.current) return;
    animatingRef.current = true;
    const target = toDark ? content.images.dark : content.images.light;
    if (bgBackRef.current) bgBackRef.current.style.backgroundImage = `url(${target})`;
    bgFrontRef.current?.classList.add("pull-down");
    setTimeout(() => {
      setIsDark(toDark);
      if (bgFrontRef.current) bgFrontRef.current.style.backgroundImage = `url(${target})`;
      setTimeout(() => {
        bgFrontRef.current?.classList.remove("pull-down");
        animatingRef.current = false;
      }, 30);
    }, 300);
  }

  return (
    <div className="hero">
      <div className="blur-overlay blur-overlay-top" />
      <div className="blur-overlay blur-overlay-bottom" />
      <div className="hero-bg-wrapper">
        <div ref={bgBackRef} className="hero-bg bg-back" />
        <div ref={bgFrontRef} className="hero-bg bg-front" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          {content.heroHeadlineLead}
          <br />
          <span className="title-accent">{content.heroHeadlineAccent}</span> {content.heroHeadlineTail}
        </h1>

        <div className="theme-toggle">
          <div className="toggle-indicator" style={{ transform: isDark ? "translateX(calc(100% + 4px))" : "translateX(0)" }} />
          <button className={`toggle-btn ${!isDark ? "active" : ""}`} onClick={() => toggleTheme(false)}>
            <span className="label">{content.toggle.morning.label}</span>
            <span className="subtext">{content.toggle.morning.subtext}</span>
          </button>
          <button className={`toggle-btn ${isDark ? "active" : ""}`} onClick={() => toggleTheme(true)}>
            <span className="label">{content.toggle.night.label}</span>
            <span className="subtext">{content.toggle.night.subtext}</span>
          </button>
        </div>

        <p className="hero-footer">{content.heroSubhead}</p>
      </div>
    </div>
  );
}