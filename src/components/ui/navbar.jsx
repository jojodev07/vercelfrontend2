import { useContext } from "react";
import { Button } from "./button";
import { Badge } from "./badge"
import { ThemeContext } from "../../contexts/DarkModeContext";
import { ArrowUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useState } from "react";
export function Navbar({ name = "زائر" }) {

    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
    const { isMobile, setOpenMobile } = useSidebar();

    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);

    const handleOpenChange = (isOpen) => {
      setOpen(isOpen)
      if (!isOpen) setStep(1)
    }

    const handleGuideFinish = () => {
      handleOpenChange(false);
      if (isMobile) setOpenMobile(true);
    };

    return (
        <nav className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-zinc-200/80 bg-white/85 px-4 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85 font-['Noto_Sans_Arabic_Variable']">
          <div className="flex items-center gap-2 font-semibold">
                <SidebarTrigger className="items-center"></SidebarTrigger>
            <span className="tracking-tight text-sm sm:text-base">المعلم الخبير</span>
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={open} onOpenChange={handleOpenChange}>
  <DialogTrigger asChild>
    <Badge
      render={<button type="button" />}
      variant="destructive"
      className="h-6 w-6 cursor-pointer bg-green-300 font-bold text-green-800 dark:bg-green-800 dark:text-green-300"
    >
      ?
    </Badge>
  </DialogTrigger>

  <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] min-w-0">
    <DialogHeader>
      <DialogTitle className="text-center font-['Noto_Sans_Arabic_Variable']">
        <p className="font-['Noto_Sans_Arabic_Variable']">آلية استخدام البرنامج</p>
      </DialogTitle>
    </DialogHeader>

    {/* Main content */}
    <div className="flex h-fit min-w-0 w-full flex-col items-center justify-center transition-all ease-in-out">
      
      {step === 1 && (
        <div className="w-full min-w-0 space-y-4">
          <form className="relative flex items-center rounded-2xl border border-zinc-200 bg-white p-2 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <input
              dir="rtl"
              type="text"
              placeholder="إسالني..."
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400 font-['Noto_Sans_Arabic_Variable']"
            />

            <div className="flex items-center gap-1">
              <button
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E3A8A] text-zinc-50 disabled:cursor-default disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="w-full min-w-0 max-w-full space-y-4 overflow-hidden text-center">
          <Carousel orientation="vertical" className="w-full min-w-0">
  <CarouselContent className="-ml-2">
    <CarouselItem className="basis-1/2 pl-2">
      <Badge className="block w-full whitespace-normal text-center bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 font-['Noto_Sans_Arabic_Variable']">
        ما هي أفضل استراتيجية لتنمية مهارات التفكير العليا لدى الطلبة؟
      </Badge>
    </CarouselItem>

    <CarouselItem className="basis-1/2 pl-2">
      <Badge className="block w-full whitespace-normal text-center bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-['Noto_Sans_Arabic_Variable']">
        ما الإجراء القانوني الصحيح عند تغيب الطالب المتكرر دون عذر؟
      </Badge>
    </CarouselItem>

    <CarouselItem className="basis-1/2 pl-2">
      <Badge className="block w-full whitespace-normal text-center bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-['Noto_Sans_Arabic_Variable']">
        كيف يبني المعلم بيئة صفية آمنة وداعمة بشكل مباشر؟
      </Badge>
    </CarouselItem>

    <CarouselItem className="basis-1/2 pl-2">
      <Badge className="block w-full whitespace-normal text-center bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 font-['Noto_Sans_Arabic_Variable']">
        أعطني افضل الاستراتيجيات
      </Badge>
    </CarouselItem>
        <CarouselItem className="basis-1/2 pl-2">
      <Badge className="block w-full whitespace-normal text-center bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-['Noto_Sans_Arabic_Variable']">
        أي الأهداف التالية يمثل فلسفة التعلم للحياة؟
      </Badge>
    </CarouselItem>
    
        <CarouselItem className="basis-1/2 pl-2">
      <Badge className="block w-full whitespace-normal text-center bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 font-['Noto_Sans_Arabic_Variable']">
        أعطني افضل الاستراتيجيات
      </Badge>
    </CarouselItem>
  </CarouselContent>

  <CarouselPrevious />
  <CarouselNext />
</Carousel>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="flex flex-col items-center gap-2">
      <p className="text-center text-sm text-gray-500 font-['Noto_Sans_Arabic_Variable']">
        {step === 1
          ? "اكتب استفسارك في الخانة لبدء الحوار"
          : "يمكنك سؤال النموذج عن العديد من الاسئلة، مثل"}
      </p>

      {step === 1 ? (
        <Button
          className="w-full max-w-[200px] font-['Noto_Sans_Arabic_Variable']"
          onClick={() => setStep(2)}
        >
          التالي
        </Button>
      ) : (
        <div className="flex w-full max-w-[200px] gap-2 font-['Noto_Sans_Arabic_Variable']">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setStep(1)}
          >
            السابق
          </Button>
          <Button
            className="flex-1"
            onClick={handleGuideFinish}
          >
            انتهاء
          </Button>
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Badge
                render={<button type="button" />}
                variant="destructive"
                className="cursor-pointer bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300"
              >
                {name}
              </Badge>
              }>
            </DropdownMenuTrigger>
              <DropdownMenuContent className="font-['Noto_Sans_Arabic_Variable']">
              <DropdownMenuItem onClick={toggleTheme}>{
                isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </nav>
    )
}