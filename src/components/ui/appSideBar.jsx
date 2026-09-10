import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
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
import { MessageSquare, Star, Plus, Pencil, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { sendDatatoSheet } from "../../axiosServices/axiosHelper";
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
  showRatingPrompt,
  closeRatingPrompt,
}) {

  const {userEmail, name} = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [msgBoolean, setMsgBoolean] = useState(false);
  const [rating, setRating] = useState(0);
  const [renameSession, setRenameSession] = useState(null);
  const [renameTitle, setRenameTitle] = useState("");

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

  const selectRating = (value) => {
    setRating(value);
    console.log("Rating:", value);
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
    <Sidebar className="border-l-0 shadow-xl">
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
                    className="h-10 rounded-xl px-3 text-right hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
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
                    className="right-8"
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
                    <Button
                    className="font-['Noto_Sans_Arabic_Variable'] block mx-auto"
                    onClick={() => {
                      console.log(message);
                      setMsgBoolean(true);
                      sendDatatoSheet(message);
                    }}
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
          <CardHeader className="flex space-x-2 items-center">
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
                {userEmail}
                </Badge>
                </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </SidebarFooter>
    </Sidebar>
  )
}