import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { t } from "../i18n";

export type Shot = { src: string; caption: string; contain?: boolean };
type Ctx = { open: (items: Shot[], index?: number) => void };
const LightboxCtx = createContext<Ctx>({ open: () => {} });
export const useLightbox = () => useContext(LightboxCtx);

const Arrow = ({ dir }: { dir: -1 | 1 }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// One full-screen viewer for every photo, plan and map on the page.
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Shot[]>([]);
  const [i, setI] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const open = useCallback((list: Shot[], index = 0) => { setItems(list); setI(index); }, []);
  const close = () => setI(null);
  const go = useCallback((d: number) => setI((x) => (x === null ? x : (x + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setI(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [i, go]);

  const shot = i === null ? null : items[i];
  const many = items.length > 1;

  return (
    <LightboxCtx.Provider value={{ open }}>
      {children}
      {shot && (
        <div
          role="dialog" aria-modal="true" aria-label={shot.caption}
          className="rise fixed inset-0 z-[100] flex flex-col bg-[#1f1b16]/95 text-paper [animation-duration:.2s]"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null || !many) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="text-[13px] tabular-nums tracking-[0.08em] text-paper/60">{many ? `${String(i! + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}` : ""}</p>
            <button type="button" onClick={close} className="cursor-pointer border border-paper/30 px-4 py-2 text-[13px] transition-colors hover:border-bronze">{t.gal.close}</button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <img key={shot.src} src={shot.src} alt={shot.caption} onClick={(e) => e.stopPropagation()}
              className={`rise max-h-full max-w-full object-contain [animation-duration:.25s] ${shot.contain ? "bg-white p-3" : ""}`} />
            {many && [-1, 1].map((d) => (
              <button key={d} type="button" aria-label={d < 0 ? t.gal.prev : t.gal.next}
                onClick={(e) => { e.stopPropagation(); go(d); }}
                className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-paper/25 transition-colors hover:border-bronze hover:text-[#d8b77f] md:flex ${d < 0 ? "left-5" : "right-5"}`}>
                <Arrow dir={d as -1 | 1} />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 px-5 pb-6 pt-4 md:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-[20px]">{shot.caption}</p>
            {many && (
              <div className="flex gap-2 md:hidden">
                {[-1, 1].map((d) => (
                  <button key={d} type="button" aria-label={d < 0 ? t.gal.prev : t.gal.next} onClick={() => go(d)}
                    className="flex h-11 w-11 items-center justify-center border border-paper/25"><Arrow dir={d as -1 | 1} /></button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </LightboxCtx.Provider>
  );
}
