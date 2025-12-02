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
                <div className="px-4 py-4 mb-2">
                    <h1 className="text-2xl font-bold text-[var(--color-primary)]">
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
                                        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                        isActive ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-800"
                                    )}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-2xl -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <item.icon size={22} className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", isActive && "fill-current")} />
                                    <span className="font-medium relative z-10">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-4 pt-4 border-t border-[var(--color-primary)]/20 flex flex-col gap-1">
                    {isSignedIn ? (
                        <>
                            <Link href="/settings">
                                <motion.div
                                    variants={itemVariants}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-slate-800 hover:bg-white/40 transition-all"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                >
                                    <Settings size={22} />
                                    <span className="font-medium">Settings</span>
                                </motion.div>
                            </Link>

                            <SignOutButton>
                                <motion.button
                                    variants={itemVariants}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all w-full text-left"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                >
                                    <LogOut size={22} />
                                    <span className="font-medium">Sign Out</span>
                                </motion.button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <motion.div
                                    variants={itemVariants}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                >
                                    <LogIn size={22} />
                                    <span className="font-medium">Sign In</span>
                                </motion.div>
                            </Link>

                            <Link href="/sign-up">
                                <motion.div
                                    variants={itemVariants}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/80 transition-all shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <UserPlus size={22} />
                                    <span className="font-medium">Sign Up</span>
                                </motion.div>
                            </Link>
                        </>
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
