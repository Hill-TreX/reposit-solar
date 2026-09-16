import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Prefs = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookiePanelProps = {
  title?: string;
  message?: string;
  acceptText?: string;
  customizeText?: string;
  privacyHref?: string;
  termsHref?: string;
  className?: string;
};

const icons = {
  cookie: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="9" r="0.5" fill="currentColor" />
      <circle cx="14" cy="8" r="0.5" fill="currentColor" />
      <circle cx="10" cy="13" r="0.5" fill="currentColor" />
      <circle cx="16" cy="12" r="0.5" fill="currentColor" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  chevronDown: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  chevronUp: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  x: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

function cn(...classes: (string | boolean | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function PrefRow({
  title,
  desc,
  field,
  locked,
  checked,
  onToggle,
  isDark,
}: {
  title: string;
  desc: string;
  field: keyof Prefs;
  locked?: boolean;
  checked: boolean;
  onToggle: (field: keyof Prefs) => void;
  isDark: boolean;
}) {
  return (
    <div
      className="rounded-lg border p-2"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      }}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          disabled={locked}
          onClick={() => !locked && onToggle(field)}
          className={cn(
            "mt-0.5 inline-flex size-5 cursor-pointer items-center justify-center rounded border",
            locked
              ? "cursor-not-allowed"
              : "cursor-pointer"
          )}
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            color: locked
              ? isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
              : isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
          }}
          aria-pressed={checked}
          aria-label={`${title} cookie preference`}
        >
          {checked && icons.check}
        </button>

        <div className="flex-1">
          <div
            className="text-xs font-medium"
            style={{ color: isDark ? "#ffffff" : "#1a1a1a" }}
          >
            {title}{" "}
            {locked && (
              <span
                className="text-[10px]"
                style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}
              >
                (required)
              </span>
            )}
          </div>
          <p
            className="mt-0.5 text-[10px]"
            style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CookiePanel({
  title = "This site uses cookies",
  message = "We use cookies to enhance your experience.",
  acceptText = "Accept all",
  customizeText = "Customize",
  privacyHref = "/privacy",
  termsHref = "/terms",
  className,
}: CookiePanelProps = {}) {
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const prefsRef = useRef<HTMLDivElement | null>(null);
  const [prefsHeight, setPrefsHeight] = useState(0);

  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const isDark = !document.body.classList.contains('light-theme');

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    const storedPrefs = localStorage.getItem("cookie-preferences");

    if (!stored) {
      const renderTimer = window.setTimeout(() => {
        setRender(true);
        requestAnimationFrame(() => setVisible(true));
      }, 0);

      if (storedPrefs) {
        try {
          const parsed = JSON.parse(storedPrefs) as Prefs;
          const prefsTimer = window.setTimeout(() => {
            setPrefs({ ...parsed, necessary: true });
          }, 0);

          return () => {
            window.clearTimeout(renderTimer);
            window.clearTimeout(prefsTimer);
          };
        } catch {
          return () => {
            window.clearTimeout(renderTimer);
          };
        }
      }

      return () => {
        window.clearTimeout(renderTimer);
      };
    }

    if (!storedPrefs) {
      return;
    }

    try {
      const parsed = JSON.parse(storedPrefs) as Prefs;
      const prefsTimer = window.setTimeout(() => {
        setPrefs({ ...parsed, necessary: true });
      }, 0);

      return () => {
        window.clearTimeout(prefsTimer);
      };
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    if (showPrefs && prefsRef.current) {
      setPrefsHeight(prefsRef.current.scrollHeight);
      return;
    }

    setPrefsHeight(0);
  }, [showPrefs, prefs]);

  const closeWithExit = (consent?: "true" | "false") => {
    if (consent) {
      localStorage.setItem("cookie-consent", consent);
    }

    setVisible(false);
    window.setTimeout(() => setRender(false), 300);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent", "true");
    setShowPrefs(false);
    setVisible(false);
    window.setTimeout(() => setRender(false), 300);
  };

  if (!render) {
    return null;
  }

  const togglePref = (field: keyof Prefs) => {
    setPrefs((current) => ({ ...current, [field]: !current[field] }));
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-4 left-4 z-[200] w-[360px] max-w-[90vw] md:bottom-6 md:left-6"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn("relative flex flex-col gap-3 rounded-xl border p-4 shadow-xl", className)}
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          background: isDark ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.95)",
          color: isDark ? "#E5DEC9" : "#3E3424",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex size-9 items-center justify-center rounded-lg ring-1"
            style={{
              background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: isDark ? "#ffffff" : "#1a1a1a",
              ringColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
            }}
          >
            {icons.cookie}
          </span>
          <h2
            className="text-sm font-semibold leading-5"
            style={{ color: isDark ? "#ffffff" : "#1a1a1a" }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={() => closeWithExit()}
            className="ml-auto inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/5"
            aria-label="Close cookie banner"
          >
            <span style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>
              {icons.x}
            </span>
          </button>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}
        >
          {message} See our{" "}
          <Link
            to={privacyHref}
            className="cursor-pointer underline underline-offset-4 hover:opacity-80"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to={termsHref}
            className="cursor-pointer underline underline-offset-4 hover:opacity-80"
          >
            Terms & Conditions
          </Link>
          .
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((current) => !current)}
            className="flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1.5 text-xs transition-colors"
            style={{
              borderColor: isDark ? "rgba(229,222,201,0.1)" : "rgba(62,52,36,0.1)",
              background: isDark ? "rgba(229,222,201,0.04)" : "rgba(62,52,36,0.04)",
              color: isDark ? "rgba(229,222,201,0.65)" : "rgba(62,52,36,0.65)",
            }}
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
          >
            {customizeText}
            {showPrefs ? icons.chevronUp : icons.chevronDown}
          </button>

          <button
            type="button"
            onClick={() => closeWithExit("true")}
            className="rounded-md px-3 py-1.5 text-xs transition-colors"
            style={{ background: isDark ? "#E5DEC9" : "#3E3424", color: isDark ? "#000" : "#fff" }}
          >
            {acceptText}
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className="overflow-hidden transition-[height] duration-300 ease-out will-change-[height]"
        >
          {showPrefs && (
            <div className="mt-2 flex flex-col gap-2">
              <PrefRow
                title="Strictly necessary"
                desc="Required for site functionality."
                field="necessary"
                locked
                checked={prefs.necessary}
                onToggle={togglePref}
                isDark={isDark}
              />
              <PrefRow
                title="Functional"
                desc="Remembers your preferences."
                field="functional"
                checked={prefs.functional}
                onToggle={togglePref}
                isDark={isDark}
              />
              <PrefRow
                title="Analytics"
                desc="Helps us improve the site."
                field="analytics"
                checked={prefs.analytics}
                onToggle={togglePref}
                isDark={isDark}
              />
              <PrefRow
                title="Marketing"
                desc="Personalized ads."
                field="marketing"
                checked={prefs.marketing}
                onToggle={togglePref}
                isDark={isDark}
              />

              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="cursor-pointer rounded-md border px-2.5 py-1 text-xs"
                  style={{
                    borderColor: isDark ? "rgba(229,222,201,0.1)" : "rgba(62,52,36,0.1)",
                    background: isDark ? "rgba(229,222,201,0.04)" : "rgba(62,52,36,0.04)",
                    color: isDark ? "rgba(229,222,201,0.65)" : "rgba(62,52,36,0.65)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="cursor-pointer rounded-md px-2.5 py-1 text-xs"
                  style={{ background: isDark ? "#E5DEC9" : "#3E3424", color: isDark ? "#000" : "#fff" }}
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
