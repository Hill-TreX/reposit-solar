import { TESTIMONIALS, avatarUrl, type Testimonial } from "../lib/testimonials";

const COLUMNS = 3;

function columnItems(column: number) {
  return TESTIMONIALS.filter((_, index) => index % COLUMNS === column);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, handle, role, quote } = testimonial;

  return (
    <figure className="testimonial-card mb-4 break-inside-avoid rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3 mb-4">
        <img
          src={avatarUrl(handle)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="testimonial-avatar size-11 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="testimonial-name text-sm font-semibold leading-tight">{name}</span>
          {role && (
            <span className="testimonial-role text-xs leading-snug">{role}</span>
          )}
        </div>
      </div>
      <blockquote className="testimonial-quote text-[15px] leading-relaxed">
        "{quote}"
      </blockquote>
    </figure>
  );
}

function MarqueeColumn({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const duplicated = [...items, ...items];

  return (
    <div className="relative h-[560px] overflow-hidden lg:h-[640px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div className="will-change-transform" style={{
        animation: `${reverse ? 'marquee-y-reverse' : 'marquee-y'} ${items.length > 4 ? '40s' : '30s'} linear infinite`,
      }}>
        {duplicated.map((t, i) => (
          <TestimonialCard key={`${t.handle}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section py-20 px-5 sm:px-6" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col items-center gap-3 text-center mb-12">
          <h2 id="testimonials-heading" className="testimonials-heading max-w-2xl text-balance text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            Trusted by homeowners across the UK
          </h2>
          <p className="testimonials-intro max-w-lg text-balance text-sm font-medium sm:text-base">
            Real people, real savings. See what our customers have to say.
          </p>
        </header>

        {/* Mobile: single column */}
        <div className="lg:hidden">
          <MarqueeColumn items={TESTIMONIALS} />
        </div>

        {/* Desktop: 3 columns with different directions */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          <MarqueeColumn items={columnItems(0)} />
          <MarqueeColumn items={columnItems(1)} reverse />
          <MarqueeColumn items={columnItems(2)} />
        </div>
      </div>
    </section>
  );
}
