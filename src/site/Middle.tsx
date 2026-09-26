import { useEffect, useState } from "react";
import { t, whatsapp } from "../i18n";
import { facilitiesPlan, layouts, showUnits, zonePhotos } from "../project";
import { useLightbox } from "./Lightbox";
import { Eyebrow, H2, Reveal } from "./Top";

// Facilities: numbered zones on the left (auto-advancing, like 21st's lumina list),
// the zone's photograph and its facilities on the right.
export function Facilities() {
  const [z, setZ] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open } = useLightbox();
  const zones = t.fac.zones;
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setZ((z + 1) % zones.length), 7000);
    return () => clearTimeout(id);
  }, [z, paused, zones.length]);

  return (
    <section id="facilities" className="scroll-mt-20 bg-paper-2 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[76rem]">
        <Reveal>
          <Eyebrow>{t.fac.eyebrow}</Eyebrow>
          <H2 className="mt-4 max-w-[46rem]">{t.fac.heading}</H2>
          <p className="mt-5 max-w-[40rem] text-[16px] leading-[1.7] text-ink/70">{t.fac.intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="border-t border-ink/15 md:col-span-5" role="tablist" aria-label={t.fac.eyebrow}>
            {zones.map((zone, i) => {
              const on = i === z;
              return (
                <li key={zone.name}>
                  <button type="button" role="tab" aria-selected={on} onClick={() => { setZ(i); setPaused(true); }}
                    className={`relative grid w-full cursor-pointer grid-cols-[40px_1fr] border-b border-ink/15 py-5 text-left transition-colors ${on ? "text-ink" : "text-ink/55 hover:text-ink"}`}>
                    <span className="pt-1.5 text-[12px] tabular-nums text-bronze">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={`block font-display text-[24px] leading-tight ${on ? "text-bronze-deep" : ""}`}>{zone.name}</span>
                      <span className="mt-1 block text-[13px] text-ink/55">{zone.note}</span>
                    </span>
                    {on && <span key={`${z}-${paused}`} aria-hidden className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-bronze" style={{ animation: paused ? "none" : "fill 7s linear both", transform: paused ? "scaleX(1)" : undefined }} />}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="md:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden bg-paper">
              {zonePhotos.map((src, i) => (
                <img key={src} src={src} alt={zones[i].name} loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === z ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-ink/75">
              {zones[z].items.map((it) => <li key={it} className="flex items-center gap-2"><span aria-hidden className="h-1 w-1 bg-bronze" />{it}</li>)}
            </ul>
            <button type="button" onClick={() => open([{ src: facilitiesPlan, caption: t.fac.plan, contain: true }])}
              className="mt-6 cursor-pointer text-[14px] text-bronze-deep underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze">{t.fac.plan}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Homes: layouts on the left, the matched plan on a white sheet on the right.
export function Homes() {
  const [k, setK] = useState(0);
  const { open } = useLightbox();
  const l = layouts[k];
  const name = (key: typeof l.key) => t.res.names[key] ?? `${t.res.type} ${key}`;
  const sq = (n: number) => `${n.toLocaleString("en-MY")} ${t.res.sqft}`;
  const row = (i: number) => {
    const x = layouts[i]; const on = i === k;
    return (
      <li key={x.key} className="border-b border-ink/15">
        <button type="button" role="tab" aria-selected={on} onClick={() => setK(i)}
          className={`flex w-full cursor-pointer items-baseline justify-between gap-4 py-4 text-left transition-colors max-sm:pr-14 ${on ? "text-ink" : "text-ink/55 hover:text-ink"}`}>
          <span className={`font-display text-[23px] ${on ? "text-bronze-deep" : ""}`}>{name(x.key)}</span>
          <span className="whitespace-nowrap text-[13px] tabular-nums">{sq(x.sqft)}</span>
        </button>
      </li>
    );
  };
  const plans = l.plans.map((src, i) => ({ src, caption: `${name(l.key)}${l.plans.length > 1 ? ` · ${i + 1}/${l.plans.length}` : ""}`, contain: true }));

  return (
    <section id="homes" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[76rem]">
        <Reveal>
          <Eyebrow>{t.res.eyebrow}</Eyebrow>
          <H2 className="mt-4">{t.res.heading}</H2>
          <p className="mt-4 text-[15px] text-ink/60">{t.res.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <ul className="border-t border-ink/15" role="tablist">{layouts.map((x, i) => !x.special && row(i))}</ul>
            <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-ink/50">{t.res.special}</p>
            <ul className="mt-2 border-t border-ink/15" role="tablist">{layouts.map((x, i) => x.special && row(i))}</ul>
          </div>
          <div className="md:col-span-8">
            <button type="button" onClick={() => open(plans)} aria-label={t.gal.open}
              className="flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center bg-white p-5 md:p-8">
              <img key={l.plans[0]} src={l.plans[0]} alt={name(l.key)} loading="lazy" className="rise max-h-full max-w-full object-contain [animation-duration:.3s]" />
            </button>
            <dl className="mt-6 grid grid-cols-2 gap-y-4 border-t border-ink/15 pt-5 text-[14px] sm:grid-cols-4">
              <div><dt className="text-[11px] uppercase tracking-[0.14em] text-ink/50">{t.res.sqft}</dt><dd className="mt-1 font-display text-[22px]">{l.sqft.toLocaleString("en-MY")}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.14em] text-ink/50">{t.res.bed}</dt><dd className="mt-1 font-display text-[22px]">{l.beds}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.14em] text-ink/50">{t.res.bath}</dt><dd className="mt-1 font-display text-[22px]">{l.baths}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.14em] text-ink/50">{t.res.towers}</dt><dd className="mt-1 font-display text-[22px]">{t.res.towerList[l.key]}</dd></div>
            </dl>
            <p className="mt-4 text-[14px] text-ink/65">{t.res.notes[l.key]}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
              <span className="text-ink/55">{t.res.price}</span>
              <a href={whatsapp(`${t.float.msg} ${name(l.key)} (${sq(l.sqft)})`)} target="_blank" rel="noopener noreferrer"
                className="text-bronze-deep underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze">{t.res.ask}</a>
            </div>
          </div>
        </div>

        <Reveal className="mt-20">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">{t.res.showUnits}</p>
          {([["C", t.res.showC], ["D2", t.res.showD2]] as const).map(([key, label]) => {
            const shots = showUnits[key].map((src) => ({ src, caption: label }));
            return (
              <div key={key} className="mt-6">
                <p className="font-display text-[22px]">{label}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {shots.map((s, i) => (
                    <button key={s.src} type="button" onClick={() => open(shots, i)} aria-label={`${label} · ${t.gal.open}`}
                      className={`group cursor-zoom-in overflow-hidden bg-paper-2 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
                      <img src={s.src} alt={label} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
