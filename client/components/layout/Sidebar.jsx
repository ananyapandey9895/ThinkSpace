"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Zap, Compass, Users, User, Settings, LogOut, LogIn, UserPlus, MessageCircle, ChevronDown, ChevronRight, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";

const SidebarSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-xs font-bold text-[#1B3C53] uppercase tracking-wider hover:bg-[#D0D0D0] transition-colors"
            >
                <span>{title}</span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, href, isActive }) => (
    <Link href={href}>
        <div className={cn(
            "flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors text-sm font-medium",
            isActive
                ? "bg-[#456882] text-white"
                : "text-[#1B3C53] hover:bg-[#D0D0D0]"
        )}>
            <Icon size={20} className={cn(isActive ? "text-white" : "text-[#234C68]")} />
            <span>{label}</span>
        </div>
    </Link>
);

const Sidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const { isSignedIn } = useUser();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-16 bottom-0 w-[270px] bg-[#E3E3E3] border-r border-[#456882] overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="py-4">
                    <SidebarSection title="Feeds">
                        <SidebarItem icon={Home} label="Home" href="/" isActive={pathname === "/"} />
                        <SidebarItem icon={TrendingUp} label="Popular" href="/popular" isActive={pathname === "/popular"} />
                        <SidebarItem icon={Zap} label="Sparks" href="/sparks" isActive={pathname === "/sparks"} />
                    </SidebarSection>

                    <SidebarSection title="Topics">
                        <SidebarItem icon={Compass} label="Explore" href="/explore" isActive={pathname === "/explore"} />
                        <SidebarItem icon={MessageCircle} label="Discussions" href="/messages" isActive={pathname === "/messages"} />
                        <SidebarItem icon={Users} label="Communities" href="/community" isActive={pathname === "/community"} />
                    </SidebarSection>

                    <SidebarSection title="Resources">
                        <SidebarItem icon={Star} label="Premium" href="/premium" isActive={pathname === "/premium"} />
                        <SidebarItem icon={User} label="Profile" href="/profile" isActive={pathname === "/profile"} />
                        <SidebarItem icon={Settings} label="Settings" href="/settings" isActive={pathname === "/settings"} />
                    </SidebarSection>

                    <div className="mt-4 px-4 pt-4 border-t border-[#456882]">
                        {isSignedIn ? (
                            <SignOutButton>
                                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-[#1B3C53] hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
                                    <LogOut size={20} />
                                    <span>Log Out</span>
                                </button>
                            </SignOutButton>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link href="/sign-in" className="w-full py-2 text-center text-sm font-bold text-white bg-[#1B3C53] rounded-full hover:bg-[#234C68] transition-colors">
                                    Log In
                                </Link>
                                <Link href="/sign-up" className="w-full py-2 text-center text-sm font-bold text-[#1B3C53] border border-[#1B3C53] rounded-full hover:bg-[#1B3C53]/10 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
