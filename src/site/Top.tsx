import { useEffect, useRef, useState, type ReactNode } from "react";
import { t } from "../i18n";
import { hero, introPhoto } from "../project";

// Fade-up once when scrolled into view.
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(.23,1,.32,1)] ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="text-[12px] uppercase tracking-[0.2em] text-bronze">{children}</p>
);
export const H2 = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`text-balance font-display text-[clamp(2rem,4.2vw,3.3rem)] font-light leading-[1.1] ${className}`}>{children}</h2>
);
export const btnDark = "inline-flex h-12 items-center whitespace-nowrap bg-ink px-6 text-[14px] tracking-[0.03em] text-paper transition-colors hover:bg-bronze";
export const btnLine = "inline-flex h-12 items-center whitespace-nowrap border border-ink/25 px-6 text-[14px] tracking-[0.03em] transition-colors hover:border-ink";

export function Nav() {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [["#residence", t.nav.residence], ["#facilities", t.nav.facilities], ["#homes", t.nav.homes], ["#location", t.nav.location], ["#gallery", t.nav.gallery]];
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[76rem] items-center justify-between px-6 md:px-12">
        <a href={t.nav.otherHref === "/" ? "/zh" : "/"} className="leading-tight">
          <span className="block font-display text-[21px] tracking-[0.05em]">Cappella Embassy</span>
          <span className="hidden text-[10px] uppercase tracking-[0.16em] text-ink/55 sm:block">{t.nav.formerly}</span>
        </a>
        <nav className="hidden gap-7 text-[13px] text-ink/70 lg:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="transition-colors hover:text-ink">{l}</a>)}
        </nav>
        <div className="flex items-center gap-4 text-[13px]">
          <a href={t.nav.otherHref} className="whitespace-nowrap hover:text-bronze">{t.nav.other}</a>
          <a href="#enquire" className="inline-flex h-10 items-center whitespace-nowrap border border-bronze px-4 transition-colors hover:bg-ink hover:text-paper hover:border-ink">
            <span className="hidden sm:inline">{t.nav.cta}</span><span className="sm:hidden">{t.nav.ctaShort}</span>
          </a>
          <button type="button" aria-label={open ? t.nav.menuClose : t.nav.menuOpen} onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center lg:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-ink/10 bg-paper px-6 pb-4 lg:hidden">
          {links.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-ink/10 py-4 font-display text-[22px]">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section className="px-6 pb-8 pt-16 text-center md:px-12 md:pt-24">
      <div className="mx-auto max-w-[76rem]">
        <p className="rise text-[12px] uppercase tracking-[0.2em] text-bronze [animation-delay:.05s]">{t.hero.where}</p>
        <h1 className="rise mt-5 font-display text-[clamp(3rem,8.4vw,6.8rem)] font-light leading-[0.95] [animation-delay:.12s]">Cappella Embassy</h1>
        <div className="rise mx-auto my-7 h-px w-14 bg-bronze [animation-delay:.18s]" />
        <p className="rise mx-auto max-w-[36rem] text-[16px] leading-[1.7] text-ink/70 [animation-delay:.18s]">{t.hero.line}</p>
        <div className="rise mt-8 flex flex-wrap justify-center gap-3 [animation-delay:.24s]">
          <a href="#enquire" className={btnDark}>{t.hero.cta}</a>
          <a href="#homes" className={btnLine}>{t.hero.see}</a>
        </div>
        <div className="rise relative mx-auto mt-14 max-w-[70rem] [animation-delay:.3s] md:mt-20">
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-bronze/55 md:translate-x-5 md:translate-y-5" />
          <picture>
            <source media="(max-width: 767px)" srcSet={hero.srcMobile} />
            <img src={hero.src} alt={t.hero.alt} width={hero.w} height={hero.h} fetchPriority="high" className="relative block aspect-[16/9] w-full object-cover" />
          </picture>
        </div>
        <dl className="mt-16 grid grid-cols-2 border-y border-ink/15 md:mt-20 md:grid-cols-4">
          {t.hero.facts.map(([k, v], i) => (
            <div key={k} className={`py-6 md:py-8 ${i % 2 === 1 ? "border-l border-ink/12" : ""} ${i === 2 ? "md:border-l md:border-ink/12" : ""} ${i >= 2 ? "border-t border-ink/12 md:border-t-0" : ""}`}>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-ink/55">{k}</dt>
              <dd className={`mt-2 whitespace-nowrap font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-light ${i === 0 ? "text-bronze" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Intro() {
  return (
    <section id="residence" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[76rem] items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-6">
          <H2>{t.intro.heading}</H2>
          <div className="mt-7 space-y-5 text-[16px] leading-[1.75] text-ink/70">{t.intro.body.map((p) => <p key={p}>{p}</p>)}</div>
        </Reveal>
        <Reveal className="md:col-span-6" delay={80}>
          <img src={introPhoto} alt={t.intro.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  );
}
