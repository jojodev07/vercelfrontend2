import { ArrowRight, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8f7] px-5 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50" dir="rtl">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          <SearchX className="size-10" />
        </div>
        <p className="text-7xl font-black tracking-tight text-emerald-700 dark:text-emerald-300">404</p>
        <h1 className="mt-4 text-2xl font-bold">الصفحة غير موجودة</h1>
        <p className="mt-3 leading-8 text-zinc-500 dark:text-zinc-400">
          يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح أو أن الصفحة لم تعد متاحة.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={() => navigate("/")} className="bg-emerald-700 text-white hover:bg-emerald-800">
            العودة للرئيسية
            <ArrowRight className="mr-2 size-4" />
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/chat")}>
            فتح المساعد الذكي
          </Button>
        </div>
      </section>
    </main>
  );
}
