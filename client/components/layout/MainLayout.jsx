"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#DAE0E6]">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="pt-16 md:pl-[270px]">
                <div className="max-w-[1200px] mx-auto p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
