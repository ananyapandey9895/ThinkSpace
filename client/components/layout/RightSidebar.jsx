"use client";

import React from "react";
import { Sparkles, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

const RightSidebar = () => {
    return (
        <div className="hidden lg:block w-[310px] space-y-4">
            {/* Premium Widget */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-[var(--color-primary)] fill-current" size={24} />
                    <h3 className="text-sm font-semibold text-slate-900">ThinkSpace Premium</h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                    The best ThinkSpace experience, with monthly Coins, exclusive awards, and more.
                </p>
                <button className="w-full py-2 bg-[var(--color-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                    Try Now
                </button>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Posts</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-5 h-5 rounded-full bg-slate-200" />
                                <span className="text-xs text-slate-500">r/Design • 4h ago</span>
                            </div>
                            <h4 className="text-sm font-medium text-slate-900 mb-1">
                                Minimalist layout inspiration for 2025
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>24 comments</span>
                                <span>Share</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 text-center border-t border-slate-200">
                    <button className="text-sm font-bold text-[var(--color-primary)] hover:underline">
                        Clear
                    </button>
                </div>
            </div>

            {/* Footer Links */}
            <div className="px-4 py-2 text-xs text-slate-500 leading-relaxed">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
                    <Link href="#" className="hover:underline">User Agreement</Link>
                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <Link href="#" className="hover:underline">Content Policy</Link>
                    <Link href="#" className="hover:underline">Moderator Code of Conduct</Link>
                </div>
                <p className="mt-4">ThinkSpace © 2025. All rights reserved.</p>
            </div>
        </div>
    );
};

export default RightSidebar;
