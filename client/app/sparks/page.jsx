"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Zap, CloudRain, Brain } from "lucide-react";
import SparkCommentModal from "@/components/feed/SparkCommentModal";
import { api } from "@/lib/api";
export default function SparkFeed() {
    const [sparks, setSparks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSparkContent, setNewSparkContent] = useState("");
    const [selectedSpark, setSelectedSpark] = useState(null);

    useEffect(() => {
        const fetchSparks = async () => {
            try {
                const posts = await api.getPosts();
                setSparks(posts.map(post => ({
                    ...post,
                    user: {
                        name: post.user?.name || 'Anonymous',
                        handle: `@${post.user?.handle || post.user?.username || 'user'}`,
                        avatar: post.user?.imageUrl || post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.name || 'User'}&background=random`
                    },
                    likes: post.likes?.length || 0,
                    comments: post.commentCount || 0,
                    shares: post.shares || 0
                })));
            } catch (error) {
                console.error('Failed to fetch sparks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSparks();
    }, []);

    const handlePostSpark = async () => {
        if (!newSparkContent.trim()) return;
        try {
            const newPost = await api.createPost({ content: newSparkContent, type: 'thought' });
            const newSpark = {
                ...newPost,
                user: {
                    name: newPost.user?.name || "You",
                    handle: `@${newPost.user?.handle || 'you'}`,
                    avatar: newPost.user?.imageUrl || "https://ui-avatars.com/api/?name=You&background=random"
                },
                likes: 0,
                comments: 0,
                shares: 0
            };
            setSparks([newSpark, ...sparks]);
            setNewSparkContent("");
        } catch (error) {
            console.error('Failed to create spark:', error);
        }
    };

    const handleInteraction = async (id, type) => {
        if (type === 'comments') {
            const spark = sparks.find(s => s._id === id);
            if (spark) setSelectedSpark(spark);
            return;
        }

        if (type === 'likes') {
            try {
                await api.likePost(id);
                setSparks(prevSparks => prevSparks.map(spark => {
                    if (spark._id === id) {
                        return { ...spark, likes: spark.likes + 1 };
                    }
                    return spark;
                }));
            } catch (error) {
                console.error('Failed to like spark:', error);
            }
        }
    };

    const handleCommentSubmit = async (sparkId, text) => {
        try {
            await api.createComment(sparkId, text);
            setSparks(prevSparks => prevSparks.map(spark => {
                if (spark._id === sparkId) {
                    return { ...spark, comments: spark.comments + 1 };
                }
                return spark;
            }));
            setSelectedSpark(null);
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Sparks</h1>
                    <p className="text-slate-500">See what's happening right now.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 bg-slate-200 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/4" />
                                        <div className="h-4 bg-slate-200 rounded w-full" />
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=You&background=random" alt="You" className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="What's sparking?"
                                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-400"
                                        value={newSparkContent}
                                        onChange={(e) => setNewSparkContent(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handlePostSpark();
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                                        <div className="flex gap-2 text-[var(--color-primary)]"></div>
                                        <button
                                            onClick={handlePostSpark}
                                            disabled={!newSparkContent.trim()}
                                            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-full font-medium hover:bg-[var(--color-primary)]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Spark
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {sparks.map((spark) => (
                            <div key={spark._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                                        <img src={spark.user.avatar} alt={spark.user.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-slate-900">{spark.user.name}</span>
                                            <span className="text-slate-500">{spark.user.handle}</span>
                                        </div>
                                        <p className="text-slate-700 mb-4 leading-relaxed">{spark.content}</p>
                                        <div className="flex gap-6 text-slate-500">
                                            <button
                                                onClick={() => handleInteraction(spark._id, 'likes')}
                                                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
                                            >
                                                <Zap size={20} className="fill-current" />
                                                <span>{spark.likes}</span>
                                            </button>
                                            <button
                                                onClick={() => handleInteraction(spark._id, 'shares')}
                                                className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
                                            >
                                                <CloudRain size={20} />
                                                <span>{spark.shares}</span>
                                            </button>
                                            <button
                                                onClick={() => handleInteraction(spark._id, 'comments')}
                                                className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
                                            >
                                                <Brain size={20} />
                                                <span>{spark.comments}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <SparkCommentModal
                spark={selectedSpark}
                isOpen={!!selectedSpark}
                onClose={() => setSelectedSpark(null)}
                onCommentSubmit={handleCommentSubmit}
            />
        </MainLayout>
    );
}
