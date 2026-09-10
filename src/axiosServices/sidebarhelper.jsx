import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/ui/appSideBar";
import { Navbar } from "../components/ui/navbar";



export function SidebarHelper() {

    const [chatHistory, setChatHistory] = useState([]);

    const addChatMessage = (newMessage) => {
        setChatHistory((prev) => [...prev, newMessage]);
    }

    return (
        <SidebarProvider>
            <AppSidebar sessions={chatHistory}></AppSidebar>
            <div>
            <Navbar></Navbar>
            <Outlet context={{ chatHistory, addChatMessage }}></Outlet>
            </div>
        </SidebarProvider>
    )
}