import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Card = {
  label?: string;
  title: string;
  description?: string;
  action?: string;
  wide?: boolean;
  image: string;
};

const cards: Card[] = [
  {
    label: "NEXT POSSIBLE BUSINESS DAY",
    title: "Fast installation, right when you need it",
    description:
      "Get your solar system installed quickly with reliable express installation designed to start saving you money at the earliest possible opportunity.",
    action: "Learn More",
    image: "/images/features/01-fast-installation.png",
  },
  {
    label: "FLEXIBLE IMPORT & EXPORT",
    title: "Sell excess energy back to the grid",
    description:
      "Send and receive energy with flexible import and export options designed to make your solar investment work harder for you, your home, and the grid.",
    action: "Explore",
    image: "/images/features/02-sell-to-grid.png",
  },
  {
    label: "TAILORED HOME SOLUTIONS",
    title: "Solar designed around your home",
    description:
      "Every home uses energy differently. Get a solar system designed around your actual consumption, helping you save efficiently as your needs grow.",
    action: "Discover",
    image: "/images/features/03-solar-designed-home.png",
  },
  {
    label: "OPTIONAL SERVICES",
    title: "More ways to maximise your savings",
    description:
      "Choose from a wide range of optional services including battery storage, EV chargers, and smart monitoring that give you greater control over your energy.",
    image: "/images/features/04-maximise-savings.png",
  },
  {
    label: "SEVEN-YEAR GUARANTEE",
    title: "Your savings. Our commitment.",
    description:
      "From the day your system goes live, we guarantee $0 electricity bills for seven years. If the system underproduces, we cover the shortfall.",
    action: "Learn More",
    wide: true,
    image: "/images/features/05-savings-commitment.png",
  },
];

function ActionButton({ label, dark }: { label: string; dark: boolean }) {
  return (
    <button
      className="group flex self-start items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 transition-colors"
      style={{
        background: dark ? "rgba(229,222,201,0.08)" : "rgba(62,52,36,0.08)",
      }}
    >
      <span
        className="flex items-center justify-center rounded-full p-1"
        style={{
          background: dark ? "rgba(229,222,201,0.1)" : "rgba(62,52,36,0.1)",
        }}
      >
        <svg
          className="h-4 w-4"
          style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </span>
      <span
        className="text-[13px] font-normal md:text-sm"
        style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
      >
        {label}
      </span>
    </button>
  );
}

export default function FeaturesSection() {
  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const dark = !document.body.classList.contains("light-theme");

  return (
    <section
      className="mx-auto w-full max-w-[1536px] px-6 py-16 md:px-10 md:py-24"
      style={{ background: dark ? "var(--bg-dark)" : "var(--bg-light)" }}
    >
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-normal tracking-tight md:text-3xl lg:text-4xl"
            style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
          >
            Solar Energy & Battery Storage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 max-w-lg text-sm font-normal md:text-base"
            style={{ color: dark ? "rgba(229,222,201,0.6)" : "rgba(62,52,36,0.6)" }}
          >
            Learn about Reposit – the smart way to guarantee $0 electricity bills for the next seven years.
          </motion.p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-normal transition-colors"
          style={{ background: dark ? "#E5DEC9" : "#3E3424", color: dark ? "#000" : "#fff" }}
        >
          Explore Reposit
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </motion.button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5 lg:gap-6">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex min-h-[260px] flex-col gap-3 overflow-hidden rounded-2xl p-5 md:gap-4 md:rounded-3xl md:p-7 lg:p-8 ${card.wide ? "md:col-span-2" : ""}`}
            style={{
              background: dark ? "#111111" : "#ffffff",
              border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {/* Card Image - Bottom Right Corner */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 object-contain opacity-70 md:opacity-80"
            />

            <div className="flex items-center justify-between relative z-10">
              {card.label && (
                <p
                  className="text-[10px] font-normal uppercase tracking-widest md:text-[11px]"
                  style={{ color: dark ? "rgba(229,222,201,0.4)" : "rgba(62,52,36,0.4)" }}
                >
                  {card.label}
                </p>
              )}
            </div>
            <h3
              className="max-w-xl text-lg font-normal tracking-tight md:text-xl lg:text-2xl relative z-10"
              style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
            >
              {card.title}
            </h3>
            {card.description && (
              <p
                className="max-w-2xl text-sm font-normal leading-relaxed md:text-base relative z-10"
                style={{ color: dark ? "rgba(229,222,201,0.6)" : "rgba(62,52,36,0.6)" }}
              >
                {card.description}
              </p>
            )}
            <div className="mt-auto relative z-10">
              <ActionButton label={card.action || "Explore"} dark={dark} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
