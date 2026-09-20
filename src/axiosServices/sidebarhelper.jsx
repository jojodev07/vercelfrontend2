import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/ui/appSideBar";
import { Navbar } from "../components/ui/navbar";



export function SidebarHelper() {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState(() => {
        try {
            const storedSessions = localStorage.getItem("authify-chat-sessions");
            return storedSessions ? JSON.parse(storedSessions) : [];
        } catch {
            return [];
        }
    });
    const [displayName, setDisplayName] = useState(() => (
        localStorage.getItem("authify-display-name") || "زائر"
    ));
    const [sessionToLoad, setSessionToLoad] = useState(null);
    const [sessionToDelete, setSessionToDelete] = useState(null);
    const [showRatingPrompt, setShowRatingPrompt] = useState(false);

    useEffect(() => {
        localStorage.setItem("authify-chat-sessions", JSON.stringify(sessions));
    }, [sessions]);

    useEffect(() => {
        localStorage.setItem("authify-display-name", displayName);
    }, [displayName]);

    const createSession = () => {
        const session = {
            id: Date.now().toString(),
            title: "محادثة جديدة",
            messages: [],
        };

        setSessions((currentSessions) => [...currentSessions, session]);
        setSessionToLoad(session.id);
        navigate("/chat");
    };

    const openSession = (sessionId) => {
        setSessionToLoad(sessionId);
        navigate("/chat");
    };

    const renameSession = (sessionId, title) => {
        setSessions((currentSessions) => currentSessions.map((session) => (
            session.id === sessionId ? { ...session, title } : session
        )));
    };

    const deleteSession = (sessionId) => {
        setSessions((currentSessions) => currentSessions.filter(
            (session) => session.id !== sessionId
        ));
        setSessionToDelete(sessionId);
    };


    return (
        <SidebarProvider>
            <AppSidebar
                sessions={sessions}
                onSessionSelect={openSession}
                onNewSession={createSession}
                onRenameSession={renameSession}
                onDeleteSession={deleteSession}
                name={displayName}
                onNameChange={setDisplayName}
            ></AppSidebar>
            <div className="min-w-0 flex-1">
            <Navbar name={displayName}></Navbar>
            <Outlet context={{
                sessions,
                setSessions,
                sessionToLoad,
                clearSessionToLoad: () => setSessionToLoad(null),
                sessionToDelete,
                clearSessionToDelete: () => setSessionToDelete(null),
                showRatingPrompt,
                openRatingPrompt: () => setShowRatingPrompt(true),
                closeRatingPrompt: () => setShowRatingPrompt(false),
            }}></Outlet>
            </div>
        </SidebarProvider>
    )
}