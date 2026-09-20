import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const domains = [
  {
    number: "1",
    title: "التربية والتعليم في الأردن",
    color: "emerald",
    topics: [
      { title: "رؤية وزارة التربية والتعليم ورسالتها", href: "" },
      { title: "التشريعات التربوية", href: "" },
      { title: "اتجاهات التطوير التربوي", href: "" },
    ],
  },
  {
    number: "2",
    title: "الفلسفة الشخصية وأخلاقيات المهنة",
    color: "sky",
    topics: [
      { title: "رؤية المعلم ورسالته", href: "" },
      { title: "القيم والاتجاهات والسلوك المهني", href: "" },
    ],
  },
  {
    number: "3",
    title: "المعرفة الأكاديمية والتربوية (البيداغوجية)",
    color: "amber",
    topics: [
      { title: "نظريات التعلم والتعليم", href: "" },
      { title: "المعرفة الأكاديمية", href: "" },
      { title: "الإطار العام للمناهج", href: "" },
    ],
  },
  {
    number: "4",
    title: "التعلم والتعليم",
    color: "violet",
    topics: [
      { title: "التخطيط للتعلم", href: "" },
      { title: "تنفيذ عمليات التعلم والتعليم", href: "" },
      { title: "تقويم التعلم", href: "" },
    ],
  },
  {
    number: "5",
    title: "بيئة التعلم",
    color: "rose",
    topics: [
      { title: "الأوعية المعرفية", href: "" },
      { title: "الدعم النفسي الاجتماعي", href: "" },
      { title: "الابتكار والإبداع", href: "" },
    ],
  },
  {
    number: "6",
    title: "التنمية المهنية المستدامة",
    color: "teal",
    topics: [
      { title: "منهجية التنمية المهنية", href: "" },
      { title: "توظيف التنمية المهنية", href: "" },
      { title: "استدامة التنمية المهنية", href: "" },
    ],
  },
  {
    number: "7",
    title: "التعلم للحياة",
    color: "indigo",
    topics: [
      { title: "البحث العلمي", href: "" },
      { title: "المهارات الحياتية", href: "" },
      { title: "مسؤولية التعلم", href: "" },
    ],
  },
];

const colorStyles = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-100",
  sky: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900/70 dark:bg-sky-950/30 dark:text-sky-100",
  amber: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-100",
  violet: "border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-900/70 dark:bg-violet-950/30 dark:text-violet-100",
  rose: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-100",
  teal: "border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-900/70 dark:bg-teal-950/30 dark:text-teal-100",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900/70 dark:bg-indigo-950/30 dark:text-indigo-100",
};

export function NationalStandards() {
  const [openRows, setOpenRows] = useState(new Set(["domain-0"]));

  const toggleRow = (id) => {
    setOpenRows((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="min-h-[calc(100vh-3.5rem)] overflow-y-auto bg-[#f5f8f7] px-4 py-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 sm:px-8 lg:px-12" dir="rtl">
      <section className="mx-auto max-w-5xl space-y-3" aria-label="المجالات الوطنية">
          {domains.map((domain, domainIndex) => {
            const domainId = `domain-${domainIndex}`;
            const domainOpen = openRows.has(domainId);

            return (
              <article key={domain.title} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => toggleRow(domainId)}
                  aria-expanded={domainOpen}
                  className={`flex min-h-20 w-full items-center gap-4 border-r-4 px-5 py-4 text-right transition-colors hover:brightness-[0.98] dark:hover:brightness-110 ${colorStyles[domain.color]}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/75 text-sm font-black shadow-sm dark:bg-black/20">{domain.number}</span>
                  <span className="flex-1 text-base font-bold sm:text-lg">{domain.title}</span>
                  <ChevronDown className={`size-5 shrink-0 transition-transform duration-200 ${domainOpen ? "rotate-180" : ""}`} />
                </button>

                {domainOpen && (
                  <div className="space-y-2 border-t border-zinc-100 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-4">
                    {domain.topics.map((topic) => {
                      return (
                        <div key={topic.title} className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                          <a
                            href={topic.href || undefined}
                            onClick={(event) => {
                              if (!topic.href) event.preventDefault();
                            }}
                            className="flex min-h-14 items-center gap-3 px-4 py-3 text-right font-semibold text-zinc-800 transition-colors hover:bg-emerald-50/60 dark:text-zinc-100 dark:hover:bg-emerald-950/20"
                          >
                            <ExternalLink className="size-4 shrink-0 text-emerald-600" />
                            <span className="flex-1">{topic.title}</span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
      </section>
    </main>
  );
}