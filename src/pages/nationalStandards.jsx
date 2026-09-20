import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";

const domains = [
  {
    number: "1",
    title: "التربية والتعليم في الأردن",
    color: "emerald",
    topics: [
      { title: "رؤية وزارة التربية والتعليم ورسالتها", details: ["الرؤية الوطنية للتعليم", "رسالة الوزارة وأولوياتها"] },
      { title: "التشريعات التربوية", details: ["الأنظمة والتعليمات الناظمة للعمل التربوي", "حقوق وواجبات المعلم"] },
      { title: "اتجاهات التطوير التربوي", details: ["التجديد في التعليم", "تحسين جودة المخرجات التعليمية"] },
    ],
  },
  {
    number: "2",
    title: "الفلسفة الشخصية وأخلاقيات المهنة",
    color: "sky",
    topics: [
      { title: "رؤية المعلم ورسالته", details: ["دور المعلم في بناء المتعلم", "الالتزام برسالة التعليم"] },
      { title: "القيم والاتجاهات والسلوك المهني", details: ["النزاهة والعدالة المهنية", "احترام المتعلم والزملاء"] },
    ],
  },
  {
    number: "3",
    title: "المعرفة الأكاديمية والتربوية (البيداغوجية)",
    color: "amber",
    topics: [
      { title: "نظريات التعلم والتعليم", details: ["مفاهيم التعلم الأساسية", "تطبيق النظريات في الموقف التعليمي"] },
      { title: "المعرفة الأكاديمية", details: ["المفاهيم والمحتوى التخصصي", "الربط بين المعرفة والتطبيق"] },
      { title: "الإطار العام للمناهج", details: ["مكونات المنهاج", "نواتج التعلم والمعايير"] },
    ],
  },
  {
    number: "4",
    title: "التعلم والتعليم",
    color: "violet",
    topics: [
      { title: "التخطيط للتعلم", details: ["تحديد الأهداف التعليمية", "اختيار الاستراتيجيات والموارد"] },
      { title: "تنفيذ عمليات التعلم والتعليم", details: ["تنويع طرائق التدريس", "إدارة التفاعل الصفي"] },
      { title: "تقويم التعلم", details: ["التقويم التكويني والختامي", "استخدام نتائج التقويم للتحسين"] },
    ],
  },
  {
    number: "5",
    title: "بيئة التعلم",
    color: "rose",
    topics: [
      { title: "الأوعية المعرفية", details: ["مصادر التعلم الرقمية والورقية", "تنظيم المعرفة وإتاحتها"] },
      { title: "الدعم النفسي الاجتماعي", details: ["الأمان النفسي للمتعلمين", "بناء علاقات إيجابية في الصف"] },
      { title: "الابتكار والإبداع", details: ["تحفيز التفكير الإبداعي", "توظيف الأفكار الجديدة في التعلم"] },
    ],
  },
  {
    number: "6",
    title: "التنمية المهنية المستدامة",
    color: "teal",
    topics: [
      { title: "منهجية التنمية المهنية", details: ["تحديد الاحتياجات المهنية", "التعلم المستمر والتأمل"] },
      { title: "توظيف التنمية المهنية", details: ["نقل أثر التدريب إلى الصف", "مشاركة الخبرات مع الزملاء"] },
      { title: "استدامة التنمية المهنية", details: ["خطط النمو المهني", "متابعة التطور وقياس أثره"] },
    ],
  },
  {
    number: "7",
    title: "التعلم للحياة",
    color: "indigo",
    topics: [
      { title: "البحث العلمي", details: ["طرح الأسئلة وجمع الأدلة", "قراءة النتائج والاستفادة منها"] },
      { title: "المهارات الحياتية", details: ["التواصل والعمل الجماعي", "حل المشكلات واتخاذ القرار"] },
      { title: "مسؤولية التعلم", details: ["التعلم الذاتي", "تحمل المسؤولية وبناء الدافعية"] },
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

function DetailRows({ details, parentId, openRows, onToggle }) {
  return (
    <div className="space-y-2 border-r-2 border-zinc-200 pr-4 dark:border-zinc-700">
      {details.map((detail, index) => {
        const id = `${parentId}-detail-${index}`;
        const isOpen = openRows.has(id);

        return (
          <div key={detail} className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white/75 dark:border-zinc-700 dark:bg-zinc-900/60">
            <button
              type="button"
              onClick={() => onToggle(id)}
              aria-expanded={isOpen}
              className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-right text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <ChevronLeft className={`size-4 shrink-0 text-emerald-600 transition-transform ${isOpen ? "-rotate-90" : ""}`} />
              <span className="flex-1">{detail}</span>
            </button>
            {isOpen && (
              <div className="border-t border-zinc-100 px-11 py-3 text-sm leading-7 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                محور مرتبط ضمن هذا المجال من المعايير الوطنية لتنمية المعلمين مهنيًا.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
                    {domain.topics.map((topic, topicIndex) => {
                      const topicId = `${domainId}-topic-${topicIndex}`;
                      const topicOpen = openRows.has(topicId);

                      return (
                        <div key={topic.title} className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                          <button
                            type="button"
                            onClick={() => toggleRow(topicId)}
                            aria-expanded={topicOpen}
                            className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-right font-semibold text-zinc-800 transition-colors hover:bg-emerald-50/60 dark:text-zinc-100 dark:hover:bg-emerald-950/20"
                          >
                            <ChevronDown className={`size-4 shrink-0 text-emerald-600 transition-transform ${topicOpen ? "rotate-180" : ""}`} />
                            <span className="flex-1">{topic.title}</span>
                            <span className="text-xs font-normal text-zinc-400">{topic.details.length} محاور</span>
                          </button>
                          {topicOpen && (
                            <div className="border-t border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-950/30">
                              <DetailRows details={topic.details} parentId={topicId} openRows={openRows} onToggle={toggleRow} />
                            </div>
                          )}
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