import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction
} from "@/components/ui/sidebar"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Star, Plus, Pencil, Trash2, ListTree } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { submitFeedback } from "../../axiosServices/axiosHelper";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.trim().split(/\s+/);

  return names
    .slice(0, 2)
    .map((name) => name[0])
    .join('');
}
 
export function AppSidebar({
  sessions,
  onSessionSelect,
  onNewSession,
  onRenameSession,
  onDeleteSession,
  name,
  onNameChange,
  showRatingPrompt,
  closeRatingPrompt,
}) {

  const [message, setMessage] = useState("");
  const [msgBoolean, setMsgBoolean] = useState(false);
  const [rating, setRating] = useState(0);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [renameSession, setRenameSession] = useState(null);
  const [renameTitle, setRenameTitle] = useState("");
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const openRenameDialog = (session) => {
    setRenameSession(session);
    setRenameTitle(session.title);
  };

  const saveSessionName = () => {
    const title = renameTitle.trim();
    if (!renameSession || !title) return;

    onRenameSession(renameSession.id, title);
    setRenameSession(null);
  };

  const saveDisplayName = () => {
    const nextName = nameInput.trim();
    if (!nextName) return;

    onNameChange(nextName);
    setNameDialogOpen(false);
  };

  const selectRating = (value) => {
    setRating(value);
  };

  const handleFeedbackSubmit = async () => {
    const review = message.trim();

    if (!rating || !review || isSubmittingFeedback) return;

    setIsSubmittingFeedback(true);
    setFeedbackError("");

    try {
      await submitFeedback(rating, review);
      setMsgBoolean(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setFeedbackError("تعذر إرسال التقييم. حاول مرة أخرى.");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const stars = (value = rating, closeAfterSelect = false) => (
    <div className="flex justify-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`${star} stars`}
          onClick={() => {
            selectRating(star);
            if (closeAfterSelect) closeRatingPrompt();
          }}
          className="size-10 rounded-full hover:bg-amber-50 dark:hover:bg-amber-950/30"
        >
          <Star className={star <= value ? "size-6 fill-amber-400 text-amber-400" : "size-6 text-zinc-300 dark:text-zinc-600"} />
        </Button>
      ))}
    </div>
  );

  return (
    <Sidebar side="right" dir="rtl" className="border-r-0 shadow-xl">
      <SidebarHeader className="border-b border-zinc-200/80 px-4 py-5 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="min-w-0">
              <p className="truncate font-bold font-['Noto_Sans_Arabic_Variable']">مساحتك للمحادثات</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            title="محادثة جديدة"
            onClick={onNewSession}
            className="size-9 shrink-0 rounded-xl"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup className="py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.length === 0 && (
                <p className="px-2 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  لا توجد محادثات بعد
                </p>
              )}
              {sessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton
                    className="h-10 rounded-xl py-2 pl-16 pr-3 text-right hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                    onClick={() => onSessionSelect(session.id)}
                    title={session.title}
                  >
                    <MessageSquare className="size-4 shrink-0 text-emerald-600" />
                    <span className="truncate font-['Noto_Sans_Arabic_Variable'] text-sm">
                      {session.title}
                    </span>
                  </SidebarMenuButton>
                  <SidebarMenuAction
                    showOnHover
                    title="تعديل اسم المحادثة"
                    className="left-8 right-auto bg-sidebar"
                    onClick={(event) => {
                      event.stopPropagation();
                      openRenameDialog(session);
                    }}
                  >
                    <Pencil />
                  </SidebarMenuAction>
                  <SidebarMenuAction
                    showOnHover
                    title="حذف المحادثة"
                    className="left-1 right-auto bg-sidebar"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                  >
                    <Trash2 />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Dialog
        open={Boolean(renameSession)}
        onOpenChange={(open) => {
          if (!open) setRenameSession(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-['Noto_Sans_Arabic_Variable']">تعديل اسم المحادثة</DialogTitle>
          </DialogHeader>
          <Input
            dir="rtl"
            value={renameTitle}
            onChange={(event) => setRenameTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") saveSessionName();
            }}
          />
          <Button type="button" onClick={saveSessionName}>حفظ</Button>
        </DialogContent>
      </Dialog>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<NavLink to="/chat" />}>
              <MessageSquare className="text-emerald-600" />
              <span className="font-bold font-['Noto_Sans_Arabic_Variable'] text-center">المساعد الذكي</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton render={<NavLink to="/standards" />}>
                <ListTree className="text-emerald-600"></ListTree>
                <span className="font-bold font-['Noto_Sans_Arabic_Variable'] text-center">المعايير الوطنية</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <Dialog>
              <DialogTrigger className="w-full">
                <SidebarMenuButton>
                  <Star color="yellow"></Star>
                <span className="font-bold font-['Noto_Sans_Arabic_Variable'] text-center">قيم تجربتك للموقع</span>
                </SidebarMenuButton>
              </DialogTrigger>
              {!msgBoolean ? 
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <p className="font-['Noto_Sans_Arabic_Variable'] text-center mb-1.5">إرسل تقييمك لنا</p>
                    </DialogTitle>
                  <DialogDescription className="space-y-2">
                    {stars()}
                    <Textarea
                    placeholder="اترك نصائح هنا"
                    className="font-['Noto_Sans_Arabic_Variable'] rtl"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    >
                    </Textarea>
                    {feedbackError && (
                      <p className="text-center text-sm text-red-600" role="alert">
                        {feedbackError}
                      </p>
                    )}
                    <Button
                    className="font-['Noto_Sans_Arabic_Variable'] block mx-auto"
                    disabled={!rating || !message.trim() || isSubmittingFeedback}
                    onClick={handleFeedbackSubmit}
                    >إرسال
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent> :
              <DialogContent>
                <DialogHeader>
                  <DialogTitle><p className="rtl font-['Noto_Sans_Arabic_Variable'] text-center">شكرا لتقييمك</p></DialogTitle>
                </DialogHeader>
              </DialogContent>
              }
              </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
        <Dialog open={showRatingPrompt} onOpenChange={(open) => !open && closeRatingPrompt()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-['Noto_Sans_Arabic_Variable'] text-center">
                كيف تقيّم إجابة المعلم الخبير؟
              </DialogTitle>
            </DialogHeader>
            {stars(rating, true)}
          </DialogContent>
        </Dialog>
        <Separator></Separator>
        <Card>
          <CardHeader
            className="flex cursor-pointer items-center space-x-2"
            onClick={() => {
              setNameInput(name);
              setNameDialogOpen(true);
            }}
          >
            <div>
              <Avatar>
                <AvatarImage src="" className="w-2 h-2"/>
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <CardTitle className="space-y-1">
                <p className="text-sm">{name}</p>
                <Badge
                variant="destructive"
                className="cursor-pointer bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-300"
                >
                استخدام مجاني
                </Badge>
                </CardTitle>
            </div>
          </CardHeader>
        </Card>
        <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-['Noto_Sans_Arabic_Variable']">ما الاسم الذي تفضله؟</DialogTitle>
            </DialogHeader>
            <Input
              dir="rtl"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveDisplayName();
              }}
              autoFocus
            />
            <Button type="button" onClick={saveDisplayName}>حفظ الاسم</Button>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}