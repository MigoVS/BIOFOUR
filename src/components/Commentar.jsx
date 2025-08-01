import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { getDocs, addDoc, collection, onSnapshot, query, orderBy, serverTimestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase-comment';
import { 
    MessageCircle, 
    UserCircle2, 
    Loader2, 
    AlertCircle, 
    Send, 
    ImagePlus, 
    X, 
    Heart, 
    MessageSquare, 
    MoreVertical, 
    Edit3, 
    Trash2, 
    Reply,
    Search,
    Filter,
    Star,
    Smile,
    Clock,
    TrendingUp
} from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

// Emoji picker data
const EMOJI_OPTIONS = ['😀', '😂', '😍', '🤔', '👍', '👏', '🔥', '💯', '❤️', '😊', '😎', '🚀', '✨', '🎉', '💪', '👌'];

const EmojiPicker = memo(({ onEmojiSelect, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50">
            <div className="grid grid-cols-8 gap-2 w-64">
                {EMOJI_OPTIONS.map((emoji, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => {
                            onEmojiSelect(emoji);
                            onClose();
                        }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors text-lg"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
});

const Comment = memo(({ comment, formatDate, index, onLike, onReply, onEdit, onDelete, currentUser }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [replyUserName, setReplyUserName] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);
    const menuRef = useRef(null);

    const isLiked = comment.likes?.includes(currentUser) || false;
    const likesCount = comment.likes?.length || 0;
    const repliesCount = comment.replies?.length || 0;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSaveEdit = () => {
        if (editContent.trim()) {
            onEdit(comment.id, editContent);
            setIsEditing(false);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyContent.trim() || !replyUserName.trim()) return;
        
        setIsSubmittingReply(true);
        try {
            const replyData = {
                content: replyContent,
                userName: replyUserName,
                createdAt: new Date(), // Use plain JavaScript Date instead of serverTimestamp
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9) // Better unique ID
            };
            
            await onReply(comment.id, replyData);
            setReplyContent('');
            setReplyUserName('');
            setShowReplyForm(false);
            setShowReplies(true);
        } catch (error) {
            console.error('Error submitting reply:', error);
            alert('Failed to post reply. Please try again.');
        } finally {
            setIsSubmittingReply(false);
        }
    };

    // Helper function to format reply dates
    const formatReplyDate = useCallback((date) => {
        if (!date) return '';
        
        // Handle both Firestore timestamps and regular Date objects
        const dateObj = date.toDate ? date.toDate() : new Date(date);
        const now = new Date();
        const diffMinutes = Math.floor((now - dateObj) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(dateObj);
    }, []);

    return (
        <div 
            className="group relative px-4 pt-4 pb-2 rounded-xl bg-gradient-to-br from-white/8 to-white/3 border border-white/10 hover:from-white/12 hover:to-white/6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
            data-aos="fade-up"
            data-aos-delay={index * 50}
        >
            {/* Status indicator */}
            <div className="absolute top-2 right-2 flex items-center gap-2">
                {comment.isPinned && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                        <Star className="w-3 h-3" />
                        <span>Pinned</span>
                    </div>
                )}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    {showMenu && (
                        <div className="absolute top-full right-0 mt-1 py-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-10 min-w-[120px]">
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setShowMenu(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2"
                            >
                                <Edit3 className="w-3 h-3" />
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(comment.id);
                                    setShowMenu(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                            >
                                <Trash2 className="w-3 h-3" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-start gap-3">
                {comment.profileImage ? (
                    <div className="relative">
                        <img
                            src={comment.profileImage}
                            alt={`${comment.userName}'s profile`}
                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30 ring-2 ring-indigo-500/10"
                            loading="lazy"
                        />
                        {comment.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        )}
                    </div>
                ) : (
                    <div className="relative p-2 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors">
                        <UserCircle2 className="w-5 h-5" />
                        {comment.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        )}
                    </div>
                )}
                
                <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white truncate">{comment.userName}</h4>
                            {comment.isVerified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                            {comment.badge && (
                                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                                    {comment.badge}
                                </span>
                            )}
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(comment.createdAt)}
                        </span>
                    </div>
                    
                    {isEditing ? (
                        <div className="space-y-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm resize-none"
                                rows="3"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/30 transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditContent(comment.content);
                                    }}
                                    className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-sm hover:bg-gray-500/30 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2 mb-3">
                                {comment.content}
                            </p>
                            
                            {/* Reactions and actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => onLike(comment.id)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                                            isLiked 
                                                ? 'bg-red-500/20 text-red-400 scale-105' 
                                                : 'hover:bg-red-500/10 text-gray-400 hover:text-red-400'
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-current scale-110' : ''}`} />
                                        <span className="text-xs font-medium">{likesCount}</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => {
                                            setShowReplyForm(true);
                                            setShowMenu(false);
                                        }}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all"
                                    >
                                        <Reply className="w-4 h-4" />
                                        <span className="text-xs">Reply</span>
                                    </button>
                                    
                                    {repliesCount > 0 && (
                                        <button
                                            onClick={() => setShowReplies(!showReplies)}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-400 transition-all"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            <span className="text-xs">{repliesCount} replies</span>
                                        </button>
                                    )}
                                </div>
                                
                                {comment.edited && (
                                    <span className="text-xs text-gray-500 italic">edited</span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
                <div className="mt-4 ml-8 p-4 bg-white/5 rounded-lg border border-white/10" data-aos="fade-in">
                    <h4 className="text-sm font-medium text-white mb-3">Reply to {comment.userName}</h4>
                    <form onSubmit={handleReplySubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Your name"
                            value={replyUserName}
                            onChange={(e) => setReplyUserName(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-sm"
                            required
                        />
                        <textarea
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none text-sm"
                            rows="3"
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={isSubmittingReply}
                                className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSubmittingReply ? (
                                    <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-3 h-3" />
                                        Post Reply
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowReplyForm(false);
                                    setReplyContent('');
                                    setReplyUserName('');
                                }}
                                className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Replies section */}
            {showReplies && repliesCount > 0 && (
                <div className="mt-4 ml-8 space-y-3 border-l-2 border-indigo-500/20 pl-4">
                    {comment.replies?.map((reply, replyIndex) => (
                        <div key={reply.id || replyIndex} className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-full bg-indigo-500/20 text-indigo-400">
                                    <UserCircle2 className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-white text-sm">{reply.userName}</span>
                                        <span className="text-xs text-gray-400">{formatReplyDate(reply.createdAt)}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{reply.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) return;
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleEmojiSelect = useCallback((emoji) => {
        setNewComment(prev => prev + emoji);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) return;
        
        onSubmit({ newComment, userName, imageFile });
        setNewComment('');
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [newComment, userName, imageFile, onSubmit]);

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                    <label className="block text-sm font-medium text-white">
                        Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                    />
                </div>

                <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
                    <label className="block text-sm font-medium text-white">
                        Message <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            value={newComment}
                            onChange={handleTextareaChange}
                            placeholder="Write your message here..."
                            className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="absolute bottom-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Smile className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
                        </button>
                        <EmojiPicker
                            isOpen={showEmojiPicker}
                            onEmojiSelect={handleEmojiSelect}
                            onClose={() => setShowEmojiPicker(false)}
                        />
                    </div>
                </div>

                <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
                    <label className="block text-sm font-medium text-white">
                        Profile Photo <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        {imagePreview ? (
                            <div className="flex items-center gap-4">
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Remove Photo</span>
                                </button>
                            </div>
                        ) : (
                            <div className="w-full">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 group"
                                >
                                    <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span>Choose Profile Photo</span>
                                </button>
                                <p className="text-center text-gray-400 text-sm mt-2">
                                    Max file size: 5MB
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    data-aos="fade-up" 
                    data-aos-duration="1000"
                    className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>Post Comment</span>
                            </>
                        )}
                    </div>
                </button>
            </form>
        </div>
    );
});

const Komentar = () => {
    const [comments, setComments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all');
    const [currentUser] = useState('user123'); // Mock current user

    useEffect(() => {
        AOS.init({
            once: false,
            duration: 1000,
        });
    }, []);

    useEffect(() => {
        const commentsRef = collection(db, 'portfolio-comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));
        
        return onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                likes: doc.data().likes || [],
                replies: doc.data().replies || [],
            }));
            setComments(commentsData);
        });
    }, []);

    const uploadImage = useCallback(async (imageFile) => {
        if (!imageFile) return null;
        const storageRef = ref(storage, `profile-images/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        return getDownloadURL(storageRef);
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }) => {
        setError('');
        setIsSubmitting(true);
        
        try {
            const profileImageUrl = await uploadImage(imageFile);
            await addDoc(collection(db, 'portfolio-comments'), {
                content: newComment,
                userName,
                profileImage: profileImageUrl,
                createdAt: serverTimestamp(),
                likes: [],
                replies: [],
                edited: false,
                isOnline: Math.random() > 0.5, // Mock online status
                isVerified: Math.random() > 0.7, // Mock verification
                badge: Math.random() > 0.8 ? 'Pro User' : null, // Mock badge
            });
        } catch (error) {
            setError('Failed to post comment. Please try again.');
            console.error('Error adding comment: ', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [uploadImage]);

    const handleLike = useCallback(async (commentId) => {
        try {
            const comment = comments.find(c => c.id === commentId);
            const likes = comment.likes || [];
            const isLiked = likes.includes(currentUser);
            
            const updatedLikes = isLiked 
                ? likes.filter(userId => userId !== currentUser)
                : [...likes, currentUser];
            
            await updateDoc(doc(db, 'portfolio-comments', commentId), {
                likes: updatedLikes
            });
        } catch (error) {
            console.error('Error updating like:', error);
        }
    }, [comments, currentUser]);

    // Fixed handleReply function
    const handleReply = useCallback(async (commentId, replyData) => {
        try {
            const comment = comments.find(c => c.id === commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            
            const currentReplies = comment.replies || [];
            
            // Create reply with proper timestamp
            const newReply = {
                ...replyData,
                // Convert Date to plain object for Firebase
                createdAt: replyData.createdAt.toISOString ? replyData.createdAt.toISOString() : new Date().toISOString()
            };
            
            const updatedReplies = [...currentReplies, newReply];
            
            // Update the document in Firestore
            await updateDoc(doc(db, 'portfolio-comments', commentId), {
                replies: updatedReplies
            });
        } catch (error) {
            console.error('Error adding reply:', error);
            throw error; // Re-throw to handle in component
        }
    }, [comments]);

    const handleEdit = useCallback(async (commentId, newContent) => {
        try {
            await updateDoc(doc(db, 'portfolio-comments', commentId), {
                content: newContent,
                edited: true,
                editedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    }, []);

    const handleDelete = useCallback(async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteDoc(doc(db, 'portfolio-comments', commentId));
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    }, []);

    const formatDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }, []);

    // Filter and sort comments
    const filteredAndSortedComments = comments
        .filter(comment => {
            const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                comment.userName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterBy === 'all' || 
                                (filterBy === 'liked' && comment.likes?.length > 0) ||
                                (filterBy === 'recent' && comment.createdAt && 
                                 new Date() - comment.createdAt.toDate() < 24 * 60 * 60 * 1000);
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'oldest':
                    return a.createdAt?.toMillis() - b.createdAt?.toMillis();
                case 'popular':
                    return (b.likes?.length || 0) - (a.likes?.length || 0);
                case 'newest':
                default:
                    return b.createdAt?.toMillis() - a.createdAt?.toMillis();
            }
        });

    const totalLikes = comments.reduce((sum, comment) => sum + (comment.likes?.length || 0), 0);
    const totalReplies = comments.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0);

    return (
        <div className="w-full bg-gradient-to-br from-white/10 via-white/5 to-white/8 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl border border-white/10" data-aos="fade-up" data-aos-duration="1000">
            {/* Enhanced Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
                            <MessageCircle className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Comments <span className="text-indigo-400">({comments.length})</span>
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {totalLikes} likes
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" />
                                    {totalReplies} replies
                                </span>
                                <span className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Active discussion
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search comments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="popular">Most Liked</option>
                        </select>
                        
                        <select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        >
                            <option value="all">All Comments</option>
                            <option value="liked">Most Liked</option>
                            <option value="recent">Last 24h</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl animate-pulse" data-aos="fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                <div>
                    <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar" data-aos="fade-up" data-aos-delay="200">
                    {filteredAndSortedComments.length === 0 ? (
                        <div className="text-center py-12" data-aos="fade-in">
                            <div className="relative mx-auto w-20 h-20 mb-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                                <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mt-4 opacity-50" />
                            </div>
                            <p className="text-gray-400 text-lg mb-2">
                                {searchTerm || filterBy !== 'all' ? 'No comments found' : 'No comments yet'}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {searchTerm || filterBy !== 'all' ? 'Try adjusting your search or filters' : 'Start the conversation!'}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Stats bar */}
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 mb-4">
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span>Showing {filteredAndSortedComments.length} of {comments.length} comments</span>
                                    {searchTerm && (
                                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
                                            Filtered by: "{searchTerm}"
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterBy('all');
                                        setSortBy('newest');
                                    }}
                                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 hover:bg-white/10 rounded"
                                >
                                    Clear filters
                                </button>
                            </div>

                            {filteredAndSortedComments.map((comment, index) => (
                                <Comment 
                                    key={comment.id} 
                                    comment={comment} 
                                    formatDate={formatDate}
                                    index={index}
                                    onLike={handleLike}
                                    onReply={handleReply}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    currentUser={currentUser}
                                />
                            ))}

                            {/* Load more button (for future pagination) */}
                            {comments.length > 10 && (
                                <div className="text-center pt-4">
                                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 rounded-lg hover:from-indigo-500/30 hover:to-purple-500/30 transition-all border border-indigo-500/30 hover:border-indigo-500/50">
                                        Load more comments
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Enhanced Custom Scrollbar and Animations */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    margin: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(45deg, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5));
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(45deg, rgba(99, 102, 241, 0.7), rgba(168, 85, 247, 0.7));
                }
                
                /* Custom animations */
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes heartBeat {
                    0% { transform: scale(1); }
                    14% { transform: scale(1.1); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.1); }
                    70% { transform: scale(1); }
                }
                
                .animate-heart-beat {
                    animation: heartBeat 1.5s ease-in-out infinite;
                }
                
                /* Hover effects */
                .group:hover .group-hover\\:animate-heart-beat {
                    animation: heartBeat 1.5s ease-in-out infinite;
                }
                
                /* Glass morphism effect */
                .backdrop-blur-xl {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }
                
                /* Smooth transitions for all interactive elements */
                * {
                    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 200ms;
                }
                
                /* Custom gradient borders */
                .gradient-border {
                    position: relative;
                    background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
                    border: 1px solid transparent;
                }
                
                .gradient-border::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: inherit;
                    padding: 1px;
                    background: linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: exclude;
                    -webkit-mask-composite: xor;
                }
                
                /* Improved focus states */
                input:focus, textarea:focus, select:focus, button:focus {
                    outline: 2px solid rgba(99, 102, 241, 0.5);
                    outline-offset: 2px;
                }
                
                /* Enhanced loading states */
                .loading-shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                /* Mobile responsiveness improvements */
                @media (max-width: 640px) {
                    .custom-scrollbar {
                        -webkit-overflow-scrolling: touch;
                    }
                }
                
                /* Dark mode enhancements */
                @media (prefers-color-scheme: dark) {
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.2);
                    }
                }
                
                /* Print styles */
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }
                
                /* Accessibility improvements */
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
                
                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .border-white\\/10 {
                        border-color: rgba(255, 255, 255, 0.3);
                    }
                    .bg-white\\/5 {
                        background-color: rgba(255, 255, 255, 0.15);
                    }
                }
            `}</style>
        </div>
    );
};

export default Komentar;