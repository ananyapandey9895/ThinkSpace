"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Zap, Compass, ShoppingBag, User, Bell, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { id: "/", icon: Home, label: "Home" },
        { id: "/sparks", icon: Zap, label: "Spark Feed" },
        { id: "/explore", icon: Compass, label: "Explore" },
        { id: "/market", icon: ShoppingBag, label: "Marketplace" },
        { id: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <>
            {/* Top bar: brand, search, actions */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[#F1F1F2]/90 backdrop-blur-md border-b border-[#A1D6E2]">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-[#1995AD] flex items-center justify-center text-white text-lg font-bold">
                            T
                        </div>
                        <span className="hidden sm:inline text-lg font-semibold text-[#1995AD]">
                            ThinkSpace
                        </span>
                    </Link>

                    {/* Search */}
                    <div className="flex-1 hidden md:flex">
                        <div className="w-full">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A1D6E2]/40 border border-[#A1D6E2]">
                                <span className="text-slate-500 text-sm">Search ThinkSpace</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        <button className="h-9 w-9 rounded-full bg-white border border-[#A1D6E2] flex items-center justify-center text-slate-600 hover:bg-[#A1D6E2]/40 transition-colors">
                            <Bell size={18} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1995AD] text-white text-sm font-medium hover:bg-[#157a8e] transition-colors">
                            <PlusSquare size={18} />
                            <span>Create</span>
                        </button>
                        <UserButton afterSignOutUrl="/sign-in" />
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-2 md:hidden ml-auto">
                        <button className="h-8 w-8 rounded-full bg-white border border-[#A1D6E2] flex items-center justify-center text-slate-600">
                            <Bell size={16} />
                        </button>
                        <UserButton afterSignOutUrl="/sign-in" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full bg-white border border-[#A1D6E2] hover:bg-[#A1D6E2]/40 transition-colors"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile slide-out nav for main sections */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.id;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.id}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div
                                            className={cn(
                                                "flex items-center gap-4 p-4 rounded-2xl transition-all",
                                                isActive
                                                    ? "bg-[#A1D6E2] text-[#1995AD]"
                                                    : "text-slate-600"
                                            )}
                                        >
                                            <item.icon size={24} />
                                            <span className="text-lg font-medium">{item.label}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
