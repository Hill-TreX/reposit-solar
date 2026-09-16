import { Linkedin, Twitter, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { content } from "../content";
import { Link } from "react-router-dom";

function LogoIcon({ dark }: { dark: boolean }) {
  return (
    <div
      className="w-8 h-8 rounded-[8px] flex items-center justify-center"
      style={{ background: dark ? "#3E3424" : "#E5DEC9" }}
    >
      <img src="/logo.svg" alt="" className="logo-sm" />
    </div>
  );
}

export default function Footer() {
  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const dark = !document.body.classList.contains("light-theme");

  const socials = [
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Instagram, label: "Instagram" },
  ];

  const footerLinks = content.footer.columns.map((col) => ({
    title: col.heading,
    links: col.links,
  }));

  return (
    <footer
      className="w-full flex flex-col items-center gap-0"
      style={{ background: dark ? "#000000" : "#ffffff" }}
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div
          className="rounded-[48px] border shadow-sm overflow-hidden"
          style={{
            background: dark ? "#0a0a0a" : "#f5f5f5",
            borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          }}
        >
          {/* Inner Card */}
          <div
            className="rounded-[40px] m-2 shadow-sm"
            style={{ background: dark ? "#0a0a0a" : "#ffffff" }}
          >
            <div className="p-8 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Brand Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center gap-2.5">
                  <LogoIcon dark={dark} />
                  <span
                    className="text-[26px] font-bold tracking-tight"
                    style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
                  >
                    {content.brandName}
                  </span>
                </div>

                <p
                  className="leading-relaxed text-[16px] font-normal max-w-[320px]"
                  style={{ color: dark ? "rgba(229,222,201,0.5)" : "rgba(62,52,36,0.5)" }}
                >
                  {content.footer.note}
                </p>

                <div className="flex items-center gap-3">
                  {socials.map(({ Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      className="w-[44px] h-[44px] flex items-center justify-center rounded-xl border transition-all active:scale-95 group"
                      style={{
                        borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Link Columns */}
              {footerLinks.map(({ title, links }) => (
                <div key={title} className="space-y-6">
                  <h4
                    className="text-[14px] font-medium"
                    style={{ color: dark ? "rgba(229,222,201,0.4)" : "rgba(62,52,36,0.4)" }}
                  >
                    {title}
                  </h4>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[15px] font-medium transition-colors"
                          style={{ color: dark ? "#E5DEC9" : "#3E3424" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#31A8FF")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#E5DEC9" : "#3E3424")}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div
            className="px-6 sm:px-12 md:px-16 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-6 text-[15px]"
            style={{ color: dark ? "rgba(229,222,201,0.5)" : "rgba(62,52,36,0.5)" }}
          >
            <p className="font-medium">{content.footer.copyright}</p>
            <div className="flex gap-8 font-medium items-center">
              <Link to="/privacy" className="transition-colors hover:opacity-80">
                Legal Center
              </Link>
              <div
                className="w-[1px] h-4"
                style={{ background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
              />
              <Link to="/terms" className="transition-colors hover:opacity-80">
                User Agreement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
