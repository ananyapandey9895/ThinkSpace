"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Search, Edit, Loader2, MessageSquare } from "lucide-react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({
    conversations,
    selectedConversation,
    onSelectConversation,
    loading,
}) => {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
        const loadFollowedUsers = () => {
            const users = JSON.parse(localStorage.getItem('followedUsers') || '[]');
            setFollowedUsers(users);
        };

        loadFollowedUsers();
        window.addEventListener('followedUsersUpdated', loadFollowedUsers);
        return () => window.removeEventListener('followedUsersUpdated', loadFollowedUsers);
    }, []);

    const handleSelectFollowedUser = (followedUser) => {
        const conversation = {
            _id: followedUser.username,
            participants: [
                { _id: user?.id, username: user?.username },
                { _id: followedUser.username, username: followedUser.username, fullName: followedUser.fullName, imageUrl: followedUser.imageUrl }
            ],
            lastMessage: null,
            updatedAt: new Date().toISOString()
        };
        onSelectConversation(conversation);
    };

    const filteredConversations = conversations.filter((conv) => {
        return true;
    });

    return (
        <div className="w-full md:w-96 border-r border-slate-200 bg-white flex flex-col">
            {/* Header */}
            <div className="px-4 py-5 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">Messages</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                    >
                        <Edit size={20} />
                    </motion.button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {/* Followed Users Section */}
                {followedUsers.length > 0 && (
                    <div>
                        <div className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                            Following
                        </div>
                        <div className="divide-y divide-slate-100">
                            {followedUsers.map((followedUser) => (
                                <motion.div
                                    key={followedUser.username}
                                    onClick={() => handleSelectFollowedUser(followedUser)}
                                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-3"
                                    whileHover={{ x: 4 }}
                                >
                                    <img
                                        src={followedUser.imageUrl}
                                        alt={followedUser.fullName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 truncate">{followedUser.fullName}</p>
                                        <p className="text-xs text-slate-500 truncate">@{followedUser.username}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Conversations Section */}
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
                    </div>
                ) : filteredConversations.length === 0 && followedUsers.length === 0 ? (
                    <div className="flex items-center justify-center h-full px-6">
                        <div className="text-center">
                            <MessageSquare size={48} className="mx-auto text-slate-300 mb-3" />
                            <h3 className="font-semibold text-slate-600 mb-1">
                                No conversations yet
                            </h3>
                            <p className="text-sm text-slate-500">
                                Follow someone to start messaging
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredConversations.map((conversation) => (
                            <ConversationItem
                                key={conversation._id}
                                conversation={conversation}
                                isActive={selectedConversation?._id === conversation._id}
                                onClick={() => onSelectConversation(conversation)}
                                currentUserId={user?.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationList;
