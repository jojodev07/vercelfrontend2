import { useEffect, useRef, useState } from "react";
import { BookOpenCheck, Download, FileText, LoaderCircle, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { generateLessonPlan } from "../axiosServices/axiosHelper";

const initialForm = {
  subject: "",
  grade: "",
  unit: "",
  lesson: "",
  sessions: "",
};

const fields = [
  { key: "subject", label: "اسم المبحث", placeholder: "مثال: الرياضيات" },
  { key: "grade", label: "الصف والشعبة", placeholder: "مثال: الصف السابع / أ" },
  { key: "unit", label: "عنوان الوحدة", placeholder: "مثال: النسبة والتناسب" },
  { key: "lesson", label: "موضوع الدرس", placeholder: "مثال: تبسيط النسب" },
  { key: "sessions", label: "عدد الحصص", placeholder: "مثال: 2", type: "number", min: "1" },
];

export function LessonPlan() {
  const [form, setForm] = useState(initialForm);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState(null);
  const [error, setError] = useState("");
  const fileUrlRef = useRef("");

  useEffect(() => () => {
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
  }, []);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const generatePlan = async (event) => {
    event.preventDefault();
    setIsGenerating(true);
    setGeneratedFile(null);
    setError("");

    const payload = {
      subject: form.subject.trim(),
      unit_title: form.unit.trim(),
      lesson_title: form.lesson.trim(),
      grade: form.grade.trim(),
      periods: Number(form.sessions),
    };

    try {
      const response = await generateLessonPlan(payload);
      const blob = response.data instanceof Blob
        ? response.data
        : new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const url = URL.createObjectURL(blob);
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = url;
      setGeneratedFile({
        name: `خطة-تحضير-${payload.lesson_title}.docx`,
        size: blob.size,
        url,
      });
    } catch {
      setError("تعذر توليد الملف حاليًا. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-3.5rem)] overflow-y-auto bg-[#f4f8f7] px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 sm:px-8 lg:px-12" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="size-4" />
            أداة التخطيط الذكي (قيد التطوير، يرجى مراجعة الملف  الناتج من النموذج)
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">خطة تحضير الدرس</h1>
          <p className="mt-3 text-base leading-8 text-zinc-600 dark:text-zinc-300">
            أدخل تفاصيل الدرس، وسنرتّب لك تصورًا أوليًا يساعدك على بدء التحضير بثقة.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7" aria-labelledby="lesson-plan-form-title">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <FileText className="size-5" />
              </div>
              <div>
                <h2 id="lesson-plan-form-title" className="font-bold">بيانات الدرس</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">جميع الحقول مطلوبة</p>
              </div>
            </div>

            <form onSubmit={generatePlan} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="space-y-2 text-sm font-semibold">
                    <span>{field.label}</span>
                    <Input
                      required
                      dir="rtl"
                      type={field.type || "text"}
                      min={field.min}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(event) => updateField(field.key, event.target.value)}
                      className="h-11 rounded-xl bg-zinc-50 px-3 dark:bg-zinc-950"
                    />
                  </label>
                ))}
              </div>
              <Button type="submit" disabled={isGenerating} className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800">
                {isGenerating ? <LoaderCircle className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                {isGenerating ? "جارٍ تجهيز الملف..." : "توليد خطة التحضير"}
              </Button>
              {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400" role="alert">{error}</p>}
              {generatedFile && <p className="text-center text-sm font-semibold text-emerald-700 dark:text-emerald-400" role="status">تم تجهيز الملف للتحميل من اللوحة المجاورة</p>}
            </form>
          </section>

          <section className="min-h-107.5 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900" aria-live="polite">
            <div className="flex min-h-107.5 flex-col items-center justify-center px-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
                <BookOpenCheck className="size-8" />
              </div>
              {generatedFile ? (
                <>
                  <h2 className="mt-5 text-xl font-bold">ملف DOCX جاهز</h2>
                  <p className="mt-2 max-w-sm break-all text-sm leading-7 text-zinc-500 dark:text-zinc-400">{generatedFile.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">{(generatedFile.size / 1024).toFixed(1)} كيلوبايت</p>
                  <a
                    href={generatedFile.url}
                    download={generatedFile.name}
                    className="mt-5 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#1e3a8a] px-6 text-sm font-medium text-white transition-colors hover:bg-[#172554] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]"
                  >
                    <Download className="size-4" />
                    تنزيل الملف
                  </a>
                </>
              ) : (
                <>
                  <h2 className="mt-5 text-xl font-bold">ملف DOCX جاهز للتنزيل</h2>
                  <p className="mt-2 max-w-sm leading-7 text-zinc-500 dark:text-zinc-400">بعد توليد الخطة، سيظهر الملف هنا لتتمكن من تنزيله.</p>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

