import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/ui/appSideBar";
import { Navbar } from "../components/ui/navbar";



export function SidebarHelper() {

    const [sessions, setSessions] = useState(() => {
        try {
            const storedSessions = localStorage.getItem("authify-chat-sessions");
            return storedSessions ? JSON.parse(storedSessions) : [];
        } catch {
            return [];
        }
    });
    const [sessionToLoad, setSessionToLoad] = useState(null);
    const [sessionToDelete, setSessionToDelete] = useState(null);
    const [showRatingPrompt, setShowRatingPrompt] = useState(false);

    useEffect(() => {
        localStorage.setItem("authify-chat-sessions", JSON.stringify(sessions));
    }, [sessions]);

    const createSession = () => {
        const session = {
            id: Date.now().toString(),
            title: "محادثة جديدة",
            messages: [],
        };

        setSessions((currentSessions) => [...currentSessions, session]);
        setSessionToLoad(session.id);
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
                onSessionSelect={setSessionToLoad}
                onNewSession={createSession}
                onRenameSession={renameSession}
                onDeleteSession={deleteSession}
            ></AppSidebar>
            <div>
            <Navbar></Navbar>
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