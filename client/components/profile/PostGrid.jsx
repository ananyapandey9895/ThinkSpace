"use client";

import React, { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Zap, CloudRain, Brain, CornerUpRight } from "lucide-react";
import PostDetailModal from "./PostDetailModal";
import InteractionBar from "@/components/ui/InteractionBar";
import { api } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

const PostGrid = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const handle = user?.username || user?.firstName?.toLowerCase();
                if (handle) {
                    const userPosts = await api.getUserPosts(handle);
                    setPosts(userPosts || []);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [user]);

    const handleCommentAdd = async (text) => {
        if (!selectedPost || !text) return;
        try {
            await api.createComment(selectedPost._id, text);
            setPosts(prev => prev.map(p => 
                p._id === selectedPost._id 
                    ? { ...p, commentCount: (p.commentCount || 0) + 1 }
                    : p
            ));
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleInteraction = async (postId, type) => {
        try {
            if (type === 'spark') {
                await api.likePost(postId);
                setPosts(prev => prev.map(p => 
                    p._id === postId 
                        ? { ...p, likes: [...(p.likes || []), 'temp'] }
                        : p
                ));
            }
        } catch (error) {
            console.error('Failed to interact:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-slate-500">Loading posts...</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center py-10 text-slate-500">No posts yet.</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <GlassCard
                        key={post._id}
                        onClick={() => setSelectedPost(post)}
                        className="group relative aspect-[4/3] overflow-hidden cursor-pointer rounded-3xl border-0 shadow-md"
                    >
                        {post.media?.[0] || post.image ? (
                            <img
                                src={post.media?.[0] || post.image}
                                alt="Post"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                                <p className="text-white text-center p-6">{post.content?.substring(0, 100)}</p>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-center gap-2 mb-2 opacity-80">
                                <img src={post.user?.imageUrl || post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.name}`} alt={post.user?.name} className="w-6 h-6 rounded-full border border-white/50" />
                                <span className="text-xs font-medium">{post.user?.name || 'Anonymous'}</span>
                            </div>
                            <h3 className="text-lg font-bold leading-tight mb-3 line-clamp-2">{post.content || post.title}</h3>

                            <div className="flex items-center gap-4 text-sm opacity-80">
                                <div className="flex items-center gap-1.5">
                                    <Zap size={16} className="fill-white/20" />
                                    <span>{post.likes?.length || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Brain size={16} className="fill-white/20" />
                                    <span>{post.commentCount || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CornerUpRight size={16} className="fill-white/20" />
                                    <span>{post.shares || 0}</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <PostDetailModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                onCommentAdd={handleCommentAdd}
                onInteraction={(type, value) => selectedPost && handleInteraction(selectedPost.id, type, value)}
            />
        </>
    );
};

export default PostGrid;
