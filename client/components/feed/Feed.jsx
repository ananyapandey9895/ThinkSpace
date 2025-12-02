"use client";

import React, { useEffect, useState } from "react";
import { Zap, Moon, Brain, Share2, X, Send } from "lucide-react";
import { motion } from "framer-motion";

const RedditPostCard = ({ post, onInteraction, onThoughtsClick }) => {
    const [sparks, setSparks] = React.useState(post.sparks || 0);
    const [dims, setDims] = React.useState(post.dims || 0);
    const [thoughts, setThoughts] = React.useState(post.thoughts || 0);
    const [userChoice, setUserChoice] = React.useState(null);

    const handleSpark = (e) => {
        e.stopPropagation();
        if (userChoice === 'spark') {
            setSparks(sparks - 1);
            setUserChoice(null);
        } else {
            if (userChoice === 'dim') {
                setDims(dims - 1);
            }
            setSparks(sparks + 1);
            setUserChoice('spark');
        }
    };

    const handleDim = (e) => {
        e.stopPropagation();
        if (userChoice === 'dim') {
            setDims(dims - 1);
            setUserChoice(null);
        } else {
            if (userChoice === 'spark') {
                setSparks(sparks - 1);
            }
            setDims(dims + 1);
            setUserChoice('dim');
        }
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
                        <img src={post.user?.image || post.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user?.name || post.author || 'User')}&background=random`} alt={post.user?.name || post.author || 'User'} className="w-5 h-5 rounded-full" />
                        <span className="font-bold text-slate-900 hover:underline">{(post.user?.name || post.author || 'user').split(' ').pop()}</span>
                    </div>
                    <span>•</span>
                    <span>Posted by u/{(post.user?.username || post.user?.name || post.author || 'user').split(' ').pop()}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                </div>

                <div onClick={onThoughtsClick}>
                    <h3 className="text-lg font-medium text-slate-900 mb-2 leading-snug">{post.content || post.caption}</h3>
                    {post.image && (
                        <div className="mt-3 mb-3 rounded-lg overflow-hidden border border-slate-200 bg-black/5 max-h-[500px] flex justify-center">
                            <img src={post.image} alt="Post content" className="max-w-full max-h-[500px] object-contain" />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 text-[#1B3C53] text-sm font-bold mt-4 pt-3 border-t border-[#456882]/30">
                    <button onClick={handleSpark} className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-[#456882]/10 ${userChoice === 'spark' ? 'bg-yellow-100' : ''}`}>
                        <Zap size={18} className="text-yellow-500" />
                        <span>{sparks}</span>
                    </button>
                    <button onClick={handleDim} className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-[#456882]/10 ${userChoice === 'dim' ? 'bg-gray-100' : ''}`}>
                        <Moon size={18} className="text-gray-600" />
                        <span>{dims}</span>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onThoughtsClick(post); }}
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
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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

    const handleThoughtsClick = (post) => {
        setSelectedPost(post);
        setComments([
            { id: 1, user: "Amit", text: "Great post!", time: "2h" },
            { id: 2, user: "Priya", text: "Thanks for sharing this", time: "1h" }
        ]);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                user: "You",
                text: newComment,
                time: "now"
            };
            setComments([...comments, comment]);
            setNewComment("");
            
            // Update thoughts count in posts
            setPosts(prevPosts => prevPosts.map(p => {
                if (p._id === selectedPost._id) {
                    return { ...p, thoughts: (p.thoughts || 0) + 1 };
                }
                return p;
            }));
            
            // Update selected post thoughts count
            setSelectedPost(prev => ({ ...prev, thoughts: (prev.thoughts || 0) + 1 }));
        }
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
                        onThoughtsClick={handleThoughtsClick}
                    />
                ))}
            </motion.div>

            {selectedPost && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
                        <div className="flex-1 flex flex-col">
                            {selectedPost.image && (
                                <div className="flex-1 bg-black flex items-center justify-center">
                                    <img src={selectedPost.image} alt="Post" className="max-w-full max-h-full object-contain" />
                                </div>
                            )}
                        </div>
                        <div className="w-96 flex flex-col border-l">
                            <div className="p-4 border-b flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={selectedPost.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPost.user?.name || 'User')}&background=random`} alt="User" className="w-8 h-8 rounded-full" />
                                    <span className="font-semibold">{(selectedPost.user?.name || selectedPost.author || 'user').split(' ').pop()}</span>
                                </div>
                                <button onClick={() => setSelectedPost(null)} className="p-1 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-4 border-b">
                                <p className="text-sm">{selectedPost.content || selectedPost.caption}</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {comments.map(comment => (
                                    <div key={comment.id} className="flex gap-2">
                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user)}&background=random`} alt={comment.user} className="w-6 h-6 rounded-full flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm">{comment.user}</span>
                                                <span className="text-xs text-gray-500">{comment.time}</span>
                                            </div>
                                            <p className="text-sm">{comment.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t flex gap-2">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                />
                                <button onClick={handleAddComment} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
