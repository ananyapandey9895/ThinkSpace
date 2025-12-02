"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const mainPadding = isSidebarCollapsed ? "md:pl-24" : "md:pl-[300px]";

    return (
        <div className="min-h-screen bg-[var(--color-bg)] relative">
            <Sidebar />
            <Navbar />

            <main
                className={`relative z-10 min-h-screen pt-24 transition-all duration-300 ${mainPadding}`}
            >
                <div className="max-w-7xl mx-auto p-6 md:p-8">{children}</div>
            </main>
        </div>
    );
};

export default MainLayout;
