"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Zap, Compass, Users, User, Settings, LogOut, LogIn, UserPlus, MessageCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";

const Sidebar = ({ collapsed = false, onToggle }) => {
    const pathname = usePathname();
    const { isSignedIn, user } = useUser();

    const navItems = [
        { id: "/", icon: Home, label: "Home" },
        { id: "/sparks", icon: Zap, label: "Spark Feed" },
        { id: "/explore", icon: Compass, label: "Explore" },
        { id: "/messages", icon: MessageCircle, label: "Messages" },
        { id: "/community", icon: Users, label: "Community" },
        { id: "/profile", icon: User, label: "Profile" },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <aside className="fixed inset-y-0 left-0 hidden md:flex z-40">
            <div
                className={cn(
                    "relative flex h-full items-start pt-24 transition-all duration-300",
                    collapsed ? "w-0" : "w-72"
                )}
            >
                {/* Sidebar content (cloned from Reddit style, no box, just text on background) */}
                <motion.div
                    className={cn(
                        "flex flex-col gap-2 pr-8 pl-6 py-1 transition-all duration-300 w-72",
                        collapsed
                            ? "-translate-x-full opacity-0 pointer-events-none"
                            : "translate-x-0 opacity-100"
                    )}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-[#1995AD]">
                            ThinkSpace
                        </h1>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.id;
                            return (
                                <Link key={item.id} href={item.id}>
                                    <motion.div
                                        variants={itemVariants}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-full transition-colors duration-200",
                                            isActive
                                                ? "bg-[#A1D6E2] text-[#1995AD]"
                                                : "text-slate-700 hover:bg-[#F1F1F2] hover:text-[#1995AD]"
                                        )}
                                        whileHover={{ x: 4 }}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-4 pt-4 border-t border-[#A1D6E2] flex flex-col gap-1">
                        {isSignedIn ? (
                            <>
                                <Link href="/settings">
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex items-center gap-3 px-4 py-2 rounded-full text-slate-700 hover:bg-[#F1F1F2] hover:text-slate-900 transition-colors"
                                        whileHover={{ x: 4 }}
                                    >
                                        <Settings size={20} />
                                        <span className="font-medium">Settings</span>
                                    </motion.div>
                                </Link>

                                <SignOutButton>
                                    <motion.button
                                        variants={itemVariants}
                                        className="flex items-center gap-3 px-4 py-2 rounded-full text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors text-left"
                                        whileHover={{ x: 4 }}
                                    >
                                        <LogOut size={20} />
                                        <span className="font-medium">Sign Out</span>
                                    </motion.button>
                                </SignOutButton>
                            </>
                        ) : (
                            <>
                                <Link href="/sign-in">
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex items-center gap-3 px-4 py-2 rounded-full text-slate-700 hover:bg-[#F1F1F2] hover:text-[#1995AD] transition-colors"
                                        whileHover={{ x: 4 }}
                                    >
                                        <LogIn size={20} />
                                        <span className="font-medium">Sign In</span>
                                    </motion.div>
                                </Link>

                                <Link href="/sign-up">
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#1995AD] text-white hover:bg-[#157a8e] transition-colors shadow-md"
                                        whileHover={{ x: 4 }}
                                    >
                                        <UserPlus size={20} />
                                        <span className="font-medium">Sign Up</span>
                                    </motion.div>
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>

                {/* Vertical divider line like Reddit */}
                <div className={cn("h-full w-px bg-[#A1D6E2] transition-opacity duration-300", collapsed ? "opacity-0" : "opacity-100")} />

                {/* Collapse / expand button */}
                <button
                    type="button"
                    onClick={onToggle}
                    className={cn(
                        "absolute top-24 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 z-50",
                        collapsed
                            ? "left-6 bg-transparent hover:bg-slate-200"
                            : "left-full -translate-x-1/2 bg-white border border-[#1995AD] shadow-sm hover:bg-[#A1D6E2]/60"
                    )}
                    title={collapsed ? "Expand navigation" : "Collapse navigation"}
                >
                    <Menu size={20} className="text-[#1995AD]" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
