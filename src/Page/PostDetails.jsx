import { useNavigate, useParams } from "react-router";
import { FaThumbsUp, FaThumbsDown, FaUser } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import useAxiosSecure from "../hook/useAxiosSecure";
import { HiSparkles, HiChatAlt, HiShare } from 'react-icons/hi';

const PostDetails = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState("");
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const shareUrl = `${window.location.origin}/post/${postId}`;

    useEffect(() => {
        document.title = 'Post Details | ChatOrbit';
    }, []);

    const { data: post, refetch, isError, isLoading } = useQuery({
        queryKey: ['post', postId],
        enabled: !!postId,
        queryFn: async () => {
            const res = await axios.get(`https://chatorbit-server.vercel.app/post/${postId}`);
            return res.data;
        }
    });

    const handleVote = async (type) => {
        if (!user) return navigate('/login');

        try {
            const res = await axiosSecure.patch(`/post/${type}/${postId}`);
            if (res.data.modifiedCount > 0) {
                refetch();
            } else {
                Swal.fire({ 
                    icon: 'warning', 
                    title: 'Vote Limit ⚠️', 
                    text: 'You have already voted on this post.',
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
            }
        } catch (error) {
            Swal.fire({ 
                icon: 'error', 
                title: 'Error ❌', 
                text: error.message || 'Please try again later.',
                background: '#1B2435',
                color: '#FFFFFF',
                confirmButtonColor: '#FF8A00'
            });
        }
    };

    const handleComment = async () => {
        if (!user) return navigate('/login');
        if (!commentText.trim()) {
            return Swal.fire({
                title: "Empty Comment ⚠️", 
                text: "Write something before publishing.", 
                icon: "warning",
                background: '#1B2435',
                color: '#FFFFFF',
                confirmButtonColor: '#FF8A00'
            });
        }

        const commentData = {
            postId,
            postTitle: post.postTitle,
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            commentText,
            commentTime: new Date()
        };

        try {
            const res = await axiosSecure.post("/comments", commentData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success! 🎉", 
                    text: "Your comment has been posted.", 
                    icon: "success",
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
                setCommentText("");
            }
        } catch (error) {
            Swal.fire({
                title: "Error ❌", 
                text: "Failed to post comment.", 
                icon: "error",
                background: '#1B2435',
                color: '#FFFFFF'
            });
        }
    };

    if (isError) return <p className="text-center text-red-500 font-bold heading-display py-12">Failed to load discussion details.</p>;
    
    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4 bg-[#0B1120]">
                <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading discussion details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-[#CBD5E1] font-sans py-12 px-4 md:px-12 lg:px-8 xl:px-16 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Side: Post Content */}
                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight heading-display tracking-tight">
                            {post.postTitle}
                        </h1>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] text-xs font-bold uppercase tracking-wider heading-display">
                            <HiSparkles className="w-3.5 h-3.5 text-[#FF5C5C]" />
                            #{post.tag}
                        </span>
                    </div>

                    <div className="bg-[#1B2435] border border-slate-800 p-6 sm:p-8 rounded-[20px] shadow-lg">
                        <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                            {post.postDescription}
                        </p>
                    </div>

                    {/* Interaction Actions */}
                    <div className="flex items-center flex-wrap gap-4 py-2 border-y border-slate-800/80">
                        <button 
                            onClick={() => handleVote('upVote')} 
                            className="bg-[#1B2435] border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 text-slate-300 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-300 cursor-pointer text-xs font-bold"
                        >
                            <FaThumbsUp /> {post.upVote}
                        </button>
                        <button 
                            onClick={() => handleVote('downVote')} 
                            className="bg-[#1B2435] border border-slate-800 hover:border-rose-500 hover:text-rose-500 text-slate-300 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-300 cursor-pointer text-xs font-bold"
                        >
                            <FaThumbsDown /> {post.downVote}
                        </button>

                        <FacebookShareButton url={shareUrl} quote={post.postTitle}>
                            <div className="bg-[#1B2435] border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-300 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-300 cursor-pointer text-xs font-bold">
                                <FacebookIcon size={20} round />
                                <span>Share</span>
                            </div>
                        </FacebookShareButton>
                    </div>

                    {/* Comment Form Section */}
                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-bold text-white heading-display tracking-tight flex items-center gap-2">
                            <HiChatAlt className="text-[#FF8A00]" /> Add Discussion Comment
                        </h3>
                        <textarea
                            placeholder="Write your comment here..."
                            className="w-full xl:max-w-2xl bg-[#0B1120] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8A00] transition-colors"
                            rows="4"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <div>
                            <button 
                                onClick={handleComment} 
                                style={{
                                    background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                    boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                                }}
                                className="px-6 py-3 rounded-xl text-white font-extrabold text-sm hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer"
                            >
                                Publish Comment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Author Info */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8A00]/5 to-transparent rounded-full filter blur-2xl"></div>

                        <h3 className="text-lg font-bold text-white heading-display flex items-center gap-2">
                            <FaUser className="text-[#FF8A00] w-4 h-4" /> Author Details
                        </h3>
                        
                        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                            <img 
                                className="w-16 h-16 rounded-full border border-slate-800 ring-4 ring-[#FF5C5C]/50 shadow-md object-cover shrink-0" 
                                src={post.authorImage} 
                                alt={post.authorName} 
                            />
                            <div className="min-w-0">
                                <h4 className="font-bold text-base text-white truncate">{post.authorName}</h4>
                                <p className="text-[10px] text-slate-500 italic mt-0.5">
                                    {new Date(post.postTime).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4 text-xs font-medium">
                            <p className="text-[#CBD5E1] leading-relaxed">
                                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px] mb-1">Author Bio</span> 
                                Passionate creator sharing daily tech articles, bug-fixing tips, and design ideas.
                            </p>
                            <div className="flex justify-between items-center py-2.5 border-y border-slate-800/60">
                                <span className="text-[#94A3B8] uppercase tracking-wider text-[9px]">Followers</span>
                                <span className="text-white font-bold">1.2k</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#94A3B8] uppercase tracking-wider text-[9px]">Joined Orbit</span>
                                <span className="text-white font-bold">Jan 2022</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostDetails;
