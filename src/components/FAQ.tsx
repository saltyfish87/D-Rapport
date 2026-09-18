import { useState } from 'react';
import { FAQS } from '../data';

/** Frequently asked questions, styled like the other editorial sections. */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-[#FAF9F6] border-b border-editorial-faint">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">Frequently Asked Questions</span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-tight mb-10 leading-[1.1]">Before You Enquire</h2>
        <div className="divide-y divide-[#1A1A1A]/10 border-t border-b border-[#1A1A1A]/10">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-5 text-left cursor-pointer"
              >
                <span className="text-lg font-serif text-[#1A1A1A]">{f.question}</span>
                <span className="text-[#B2946E] text-2xl leading-none shrink-0">{open === i ? '–' : '+'}</span>
              </button>
              {open === i && <p className="pb-6 pr-10 text-base text-[#1A1A1A]/70 font-sans leading-relaxed">{f.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
