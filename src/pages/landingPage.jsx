import { ArrowLeft, BookOpen, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Screenshot_2026-08-05_155526-removebg-preview.png";
import { Button } from "../components/ui/button";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-50 text-zinc-900" dir="rtl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
          aria-label="المعلم الخبير"
        >
          <img src={logo} alt="المعلم الخبير" className="h-11 w-auto object-contain" />
          <span className="hidden text-sm font-bold sm:block">المعلم الخبير</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" onClick={() => navigate("/chat")}>
            افتح المحادثة
          </Button>
          <Button
            onClick={() => navigate("/chat")}
            className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]"
          >
            ابدأ الآن
          </Button>
        </div>
      </nav>

      <section className="relative mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-7xl items-center px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24">
        <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full border border-emerald-200/70" />
        <div className="pointer-events-none absolute bottom-16 right-0 h-48 w-48 rounded-full border border-blue-200/70" />

        <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 border-b-2 border-emerald-500 pb-2 text-sm font-semibold text-emerald-700">
              <Sparkles className="size-4" />
              مساحة أذكى للمعلم
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-[1.16] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              وقتك للتعليم،
              <span className="block text-emerald-600">ودعمك صار أقرب.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-loose text-zinc-600 sm:text-xl">
              مساعد تربوي يفهم أسئلتك، يختصر بحثك، ويساعدك على اتخاذ قرار أوضح داخل الصف وخارجه.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="h-12 rounded-xl bg-[#1E3A8A] px-7 text-base text-white shadow-lg shadow-blue-900/20 hover:bg-[#1E3A8A]"
              >
                اكتشف مساحتك
                <ArrowLeft className="mr-2 size-5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => navigate("/chat")}
                className="h-12 justify-center px-5 text-[#1E3A8A] hover:bg-blue-100"
              >
                ابدأ المحادثة
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><BookOpen className="size-4 text-emerald-600" /> أسئلة تربوية عملية</span>
              <span className="flex items-center gap-2"><FileText className="size-4 text-emerald-600" /> مصادر رسمية منظمة</span>
            </div>
          </div>

          <div className="relative mx-auto min-h-[430px] w-full max-w-[510px] lg:min-h-[560px]">
            <div className="absolute inset-x-4 top-10 bottom-8 rounded-[2.5rem] bg-[#1E3A8A] shadow-2xl shadow-blue-900/25" />
            <div className="absolute inset-x-0 top-24 rounded-[1.75rem] border border-white/15 bg-[#059669] p-5 text-white shadow-2xl sm:top-28 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <p className="text-xs text-emerald-100">مساحتك للمحادثات</p>
                  <p className="mt-1 text-lg font-bold">كيف أبدأ؟</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-white text-emerald-700">
                  <Sparkles className="size-5" />
                </div>
              </div>
              <div className="mt-7 space-y-3">
                <div className="mr-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-sm font-semibold text-emerald-700">
                  كيف أبني بيئة تعلم آمنة وداعمة؟
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-emerald-700/60 px-4 py-4 text-sm leading-7 text-emerald-50">
                  لنبدأ بثلاث خطوات عملية تساعدك على بناء الثقة، وضوح القواعد، وحضور الطلبة...
                </div>
              </div>
              <div className="mt-7 flex items-center gap-2 rounded-xl border border-white/15 bg-black/10 p-2">
                <span className="flex-1 px-2 text-sm text-emerald-100">اكتب استفسارك...</span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-white text-emerald-700">
                  <ArrowLeft className="size-4" />
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-xl sm:-left-8">
              <p className="text-xs text-zinc-500">جاهز لدعمك</p>
              <p className="mt-1 text-sm font-bold text-emerald-600">في كل حصة، وكل سؤال</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
