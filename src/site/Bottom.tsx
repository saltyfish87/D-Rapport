import { useState, type FormEvent } from "react";
import { PHONE_DISPLAY, t, whatsapp } from "../i18n";
import { gallery, layouts, locationMap } from "../project";
import { useLightbox } from "./Lightbox";
import { Eyebrow, H2, Reveal, btnDark } from "./Top";

export function Location() {
  const { open } = useLightbox();
  return (
    <section id="location" className="scroll-mt-20 bg-paper-2 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[76rem]">
        <Reveal><Eyebrow>{t.loc.eyebrow}</Eyebrow><H2 className="mt-4">{t.loc.heading}</H2></Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-5">
            <ul className="border-t border-ink/15">
              {t.loc.places.map(([n, d]) => (
                <li key={n} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4 text-[15px] max-sm:pr-14">
                  <span>{n}</span><span className="whitespace-nowrap tabular-nums text-ink/55">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-ink/50">{t.loc.intro}</p>
          </Reveal>
          <Reveal className="md:col-span-7" delay={80}>
            <button type="button" onClick={() => open([{ src: locationMap, caption: t.loc.map, contain: true }])} aria-label={t.gal.open} className="block w-full cursor-zoom-in bg-white p-3">
              <img src={locationMap} alt={t.loc.map} loading="lazy" className="w-full" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Gallery grid; every tile opens the shared viewer.
const SPAN = ["md:col-span-8 md:row-span-2", "md:col-span-4", "md:col-span-4", "md:col-span-6", "md:col-span-6", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-6", "md:col-span-6", "md:col-span-4", "md:col-span-4", "md:col-span-4"];
export function Gallery() {
  const { open } = useLightbox();
  const shots = gallery.map((g) => ({ src: g.src, caption: t.gal.caps[g.key] }));
  return (
    <section id="gallery" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[76rem]">
        <Reveal><Eyebrow>{t.gal.eyebrow}</Eyebrow><H2 className="mt-4">{t.gal.heading}</H2></Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-2 md:auto-rows-[15rem] md:grid-cols-12 md:gap-3">
          {shots.map((s, i) => (
            <li key={s.src} className={`${i === 0 ? "col-span-2" : ""} ${SPAN[i]}`}>
              <button type="button" onClick={() => open(shots, i)} aria-label={`${s.caption} · ${t.gal.open}`}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden bg-paper-2">
                <img src={s.src} alt={s.caption} loading="lazy" className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${i === 0 ? "aspect-[16/10] md:aspect-auto" : "aspect-square md:aspect-auto"}`} />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2.5 pt-8 text-left text-[12px] tracking-[0.04em] text-white md:px-4 md:text-[13px]">{s.caption}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-ink/50">{t.gal.note}</p>
      </div>
    </section>
  );
}

export function Enquiry() {
  const [intent, setIntent] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), phone = String(f.get("phone") || "").trim();
    if (!name) return setMsg(t.reg.needName);
    if (!phone) return setMsg(t.reg.needPhone);
    setMsg(""); setState("sending");
    try {
      const r = await fetch("https://formsubmit.co/ajax/saltyfish1987@gmail.com", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: `Cappella Embassy enquiry: ${t.reg.intents[intent]}`, _template: "table", project: "Cappella Embassy (D'Rapport Residences)", intent: t.reg.intents[intent], name, phone, email: String(f.get("email") || ""), layout: String(f.get("layout") || ""), page: location.href }),
      });
      setState(r.ok ? "ok" : "err");
    } catch { setState("err"); }
  };
  const field = "peer w-full border-0 border-b border-ink/25 bg-transparent pb-2.5 pt-6 text-[16px] outline-none transition-colors focus:border-bronze";
  const label = "pointer-events-none absolute left-0 top-5 text-[14px] text-ink/55 transition-all peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.1em] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px]";
  return (
    <section id="enquire" className="scroll-mt-20 bg-ink px-6 py-24 text-paper md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[76rem] gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#d8b77f]">{t.reg.eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(2rem,4.2vw,3.3rem)] font-light leading-[1.1]">{t.reg.heading}</h2>
          <p className="mt-6 text-[15px] leading-[1.8] text-paper/65">{t.reg.agent}</p>
          <a href={whatsapp(t.float.msg)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[15px] text-[#d8b77f] underline decoration-[#d8b77f]/40 underline-offset-4">{t.reg.wa} {PHONE_DISPLAY}</a>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {state === "ok" ? (
            <p className="font-display text-[26px]">{t.reg.ok}</p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6 [&_input]:text-paper [&_select]:text-paper">
              <div className="flex flex-wrap gap-2" role="radiogroup">
                {t.reg.intents.map((x, i) => (
                  <button key={x} type="button" role="radio" aria-checked={i === intent} onClick={() => setIntent(i)}
                    className={`border px-4 py-2.5 text-[13px] transition-colors ${i === intent ? "border-[#d8b77f] text-[#d8b77f]" : "border-paper/20 text-paper/75 hover:border-paper/50"}`}>{x}</button>
                ))}
              </div>
              <div className="relative"><input id="f-name" name="name" placeholder=" " autoComplete="name" className={`${field} border-paper/25`} /><label htmlFor="f-name" className={`${label} text-paper/55`}>{t.reg.name}</label></div>
              <div className="relative"><input id="f-phone" name="phone" placeholder=" " inputMode="tel" autoComplete="tel" className={`${field} border-paper/25`} /><label htmlFor="f-phone" className={`${label} text-paper/55`}>{t.reg.phone}</label></div>
              <div className="relative"><input id="f-email" name="email" type="email" placeholder=" " autoComplete="email" className={`${field} border-paper/25`} /><label htmlFor="f-email" className={`${label} text-paper/55`}>{t.reg.email}</label></div>
              <select name="layout" defaultValue="" aria-label={t.reg.layout} className="w-full border-0 border-b border-paper/25 bg-transparent pb-2.5 pt-4 text-[15px] outline-none focus:border-[#d8b77f] [&>option]:text-ink">
                <option value="">{t.reg.layout}</option>
                {layouts.map((l) => <option key={l.key} value={l.key}>{t.res.names[l.key] ?? `${t.res.type} ${l.key}`} · {l.sqft.toLocaleString("en-MY")} {t.res.sqft}</option>)}
              </select>
              {(msg || state === "err") && <p className="text-[14px] text-[#e7a58a]" role="alert">{msg || t.reg.err}</p>}
              <button type="submit" disabled={state === "sending"} className={`${btnDark} justify-self-start bg-[#d8b77f] text-ink hover:bg-paper disabled:opacity-60`}>{state === "sending" ? t.reg.sending : t.reg.send}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[56rem]">
        <Eyebrow>{t.faq.eyebrow}</Eyebrow>
        <div className="mt-6 border-t border-ink/15">
          {t.faq.items.map(([q, a]) => (
            <details key={q} className="group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[21px] [&::-webkit-details-marker]:hidden">
                {q}<span aria-hidden className="font-sans text-[18px] text-bronze transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[46rem] pb-6 text-[15px] leading-[1.75] text-ink/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/12 px-6 py-7 text-[12px] leading-[1.7] text-ink/55 md:px-12 md:pr-28">
      <div className="mx-auto max-w-[76rem]">{t.foot.line}</div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={whatsapp(t.float.msg)} target="_blank" rel="noopener noreferrer" aria-label={t.float.label} title={t.float.label}
      className="fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[#d8b77f] shadow-[0_8px_24px_rgba(31,27,22,0.28)] transition-colors hover:bg-bronze hover:text-paper md:bottom-8 md:right-8">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4A8.4 8.4 0 1 1 20.5 11.6Z" strokeLinejoin="round" />
        <path d="M9 8.6c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.4-1.5.5-2.4.1a9.3 9.3 0 0 1-4.9-4.9c-.4-.9-.3-1.8.1-2.4Z" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
