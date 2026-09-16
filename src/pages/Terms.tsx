import { content } from "../content";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  const doc = content.legal.terms;
  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-[68ch] px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{doc.title}</h1>
        <p className="mt-3 text-sm opacity-60">{doc.updated}</p>
        {/* Visible on purpose: shipping unreviewed legal text silently is worse
            than showing the owner a line they must delete. */}
        <p className="mt-6 text-sm opacity-60 italic">{content.legal.notice}</p>
        <div className="mt-10 flex flex-col gap-8">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
              <p className="mt-3 leading-relaxed opacity-80">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}