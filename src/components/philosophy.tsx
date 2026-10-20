import { philosophy } from "@/content";
import { Reveal } from "@/components/reveal";

// "Why I build with AI": a short, unnumbered interlude between the hero and the
// numbered sections. The quote sits on the left, the paragraphs in a reading
// column on the right; on phones they stack.
export function Philosophy() {
  return (
    <section id="why" className="border-t border-line">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {philosophy.title}
          </h2>
          <figure className="mt-6 lg:sticky lg:top-28">
            <blockquote className="text-[26px] leading-snug font-medium tracking-[-0.01em] sm:text-[30px]">
              <span aria-hidden="true" className="text-accent">
                “
              </span>
              {philosophy.quote.text}
              <span aria-hidden="true" className="text-accent">
                ”
              </span>
            </blockquote>
            <figcaption className="mt-4 font-mono text-[13px] text-muted">
              {philosophy.quote.author}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="flex max-w-[640px] flex-col gap-5 lg:pt-12">
          {philosophy.paragraphs.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
