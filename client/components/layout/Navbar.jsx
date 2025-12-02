"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Bell, Plus, User } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import CreatePostModal from "@/components/ui/CreatePostModal";

const Navbar = ({ onMenuClick, onPostCreated }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B3C53]/90 backdrop-blur-md border-b border-[#234C68] h-16">
            <div className="flex items-center justify-between h-full px-4">
                {/* Left: Logo & Menu */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-[#234C68] rounded-full md:hidden"
                    >
                        <Menu size={24} className="text-white" />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="ThinkSpace" className="w-8 h-8" />
                        <span className="hidden md:block text-xl font-bold text-white tracking-tight">
                            ThinkSpace
                        </span>
                    </Link>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-2xl px-4 md:px-8">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-300 group-focus-within:text-white" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-[#456882] rounded-full leading-5 bg-[#E3E3E3] text-[#1B3C53] placeholder-[#456882] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#456882] focus:border-[#456882] sm:text-sm transition-all"
                            placeholder="Search ThinkSpace"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button onClick={() => setIsCreateOpen(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#234C68] text-white font-medium transition-colors">
                        <Plus size={20} />
                        <span>Create</span>
                    </button>

                    <button className="p-2 hover:bg-[#234C68] rounded-full text-white relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#1B3C53]"></span>
                    </button>



                    <div className="ml-2">
                        <UserButton afterSignOutUrl="/sign-in" />
                    </div>
                </div>
            </div>

            <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onPostCreated={onPostCreated} />
        </nav>
    );
};

export default Navbar;
