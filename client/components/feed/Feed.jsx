"use client";

import React, { useEffect, useState } from "react";
import { Zap, Moon, Brain, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const RedditPostCard = ({ post, onInteraction, onThoughtsClick }) => {
    const [sparks, setSparks] = React.useState(post.likes?.length || 0);
    const [dims, setDims] = React.useState(0);
    const [thoughts, setThoughts] = React.useState(post.commentCount || 0);

    const handleSpark = (e) => {
        e.stopPropagation();
        setSparks(sparks + 1);
        onInteraction(post._id, 'spark', sparks + 1);
    };

    const handleDim = (e) => {
        e.stopPropagation();
        setDims(dims + 1);
        onInteraction(post._id, 'dim', dims + 1);
    };

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: 'ThinkSpace',
                text: post.content || post.caption,
                url: window.location.href
            });
        }
    };

    return (
        <div className="flex flex-col bg-white border border-[#456882]/30 rounded-md mb-3 hover:border-[#456882]/50 transition-colors cursor-pointer overflow-hidden">
            <div className="flex-1 p-2 md:p-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1">
                        <img src={post.user?.imageUrl || post.user?.avatar || post.user?.image || `https://ui-avatars.com/api/?name=${post.user?.name}`} alt={post.user?.name} className="w-5 h-5 rounded-full" />
                        <span className="font-bold text-slate-900 hover:underline">{post.user?.name || 'Anonymous'}</span>
                    </div>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                </div>

                <div onClick={onThoughtsClick}>
                    <h3 className="text-lg font-medium text-slate-900 mb-2 leading-snug">{post.content || post.caption}</h3>
                    {(post.media?.[0] || post.image) && (
                        <div className="mt-3 mb-3 rounded-lg overflow-hidden border border-slate-200 bg-black/5 max-h-[500px] flex justify-center">
                            <img src={post.media?.[0] || post.image} alt="Post content" className="max-w-full max-h-[500px] object-contain" />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 text-[#1B3C53] text-sm font-bold mt-4 pt-3 border-t border-[#456882]/30">
                    <button onClick={handleSpark} className="flex items-center gap-2 px-3 py-2 hover:bg-[#456882]/10 rounded-md transition-colors">
                        <Zap size={18} className="text-yellow-500" />
                        <span>{sparks}</span>
                    </button>
                    <button onClick={handleDim} className="flex items-center gap-2 px-3 py-2 hover:bg-[#456882]/10 rounded-md transition-colors">
                        <Moon size={18} className="text-gray-600" />
                        <span>{dims}</span>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onThoughtsClick(); }}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#456882]/10 rounded-md transition-colors"
                    >
                        <Brain size={18} className="text-purple-600" />
                        <span>{thoughts}</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center gap-2 px-3 py-2 hover:bg-[#456882]/10 rounded-md transition-colors">
                        <Share2 size={18} className="text-blue-600" />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Feed({ initialPosts }) {
    const [posts, setPosts] = useState(initialPosts || []);

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const updatePostStats = (postId, type, value) => {
        setPosts(prevPosts => prevPosts.map(p => {
            if (p._id === postId) {
                return { ...p, [type]: value };
            }
            return p;
        }));
    };

    return (
        <div className="flex-1 min-w-0">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {posts?.map((post) => (
                    <RedditPostCard
                        key={post._id}
                        post={post}
                        onInteraction={updatePostStats}
                        onThoughtsClick={() => console.log('Thought clicked')}
                    />
                ))}
            </motion.div>
        </div>
    );
}
