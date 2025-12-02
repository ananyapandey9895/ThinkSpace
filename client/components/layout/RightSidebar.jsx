"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

const RightSidebar = () => {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const posts = await api.getPosts();
                setRecentPosts(posts.slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch recent posts:', error);
            }
        };
        fetchRecentPosts();
    }, []);

    return (
        <div className="hidden lg:block w-[310px] space-y-4">
            {/* Recent Posts Widget */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Posts</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentPosts.length > 0 ? recentPosts.map((post) => (
                        <div key={post._id} className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <img src={post.user?.imageUrl || post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.name}`} alt="" className="w-5 h-5 rounded-full" />
                                <span className="text-xs text-slate-500">{post.user?.name || 'Anonymous'} • {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-sm font-medium text-slate-900 mb-1 line-clamp-2">
                                {post.content?.substring(0, 60)}{post.content?.length > 60 ? '...' : ''}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>{post.commentCount || 0} comments</span>
                                <span>{post.likes?.length || 0} likes</span>
                            </div>
                        </div>
                    )) : (
                        <div className="p-3 text-center text-slate-400 text-sm">No recent posts</div>
                    )}
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
