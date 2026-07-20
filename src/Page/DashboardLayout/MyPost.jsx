import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { HiChatAlt, HiTrash } from 'react-icons/hi';

const MyPosts = () => {
    const { user } = use(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        document.title = 'My Posts | ChatOrbit';
    }, []);

    // Fetch all posts of the user
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['userPosts', user?.email, currentPage, limit],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`https://chatorbit-server.vercel.app/usersPosts?email=${user.email}&page=${currentPage}&limit=${limit}`, {
                withCredentials: true
            });
            return res.data;
        }
    });

    const myPosts = posts?.posts || [];
    const totalPages = posts?.totalPages || 1;

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading your discussions...</p>
            </div>
        );
    }

    const handleDelete = (postId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This discussion will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF5C5C",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "Yes, delete it!",
            background: '#1B2435',
            color: '#FFFFFF'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://chatorbit-server.vercel.app/user-posts/${postId}`, { withCredentials: true });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success",
                        background: '#1B2435',
                        color: '#FFFFFF'
                    });
                    refetch();
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error.message || "Failed to delete the post. Please try again.",
                        icon: "error",
                        background: '#1B2435',
                        color: '#FFFFFF'
                    });
                }
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 font-sans">
            <h2 className="text-3xl font-bold text-white tracking-tight heading-display">My Posts</h2>
            
            {myPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/10 border border-dashed border-slate-855 rounded-3xl">
                    <span className="text-4xl mb-3">🔍</span>
                    <p className="text-center text-slate-400 font-medium">You haven’t posted any discussions yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Table Wrapper */}
                    <div className="bg-[#1B2435] border border-slate-800 rounded-[20px] overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-[#131C2E] border-b border-slate-850 text-slate-350 text-sm heading-display">
                                        <th className="py-4 pl-6">#</th>
                                        <th className="py-4">Post Title</th>
                                        <th className="py-4 hidden md:table-cell">Votes (Score)</th>
                                        <th className="py-4">Comments</th>
                                        <th className="py-4 pr-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myPosts.map((post, index) => (
                                        <tr key={post._id} className="border-b border-slate-850/50 hover:bg-[#131C2E]/40 transition-colors">
                                            <td className="py-4 pl-6 font-bold text-slate-500">{(currentPage - 1) * limit + index + 1}</td>
                                            <td className="py-4 font-semibold text-white max-w-xs sm:max-w-md truncate">{post.postTitle}</td>
                                            <td className="py-4 hidden md:table-cell font-bold text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    ⭐ {(post.upVote || 0) - (post.downVote || 0)}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <Link to={`/postComments/${post._id}`}>
                                                    <button className="btn btn-xs sm:btn-sm bg-slate-900 hover:bg-slate-850 text-[#FF8A00] border border-slate-800 rounded-xl flex items-center gap-1 cursor-pointer">
                                                        <HiChatAlt className="w-3.5 h-3.5" /> Comments
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="py-4 pr-6">
                                                <button 
                                                    className="btn btn-xs sm:btn-sm bg-rose-950/20 hover:bg-rose-900/30 text-rose-500 border border-rose-900/20 rounded-xl flex items-center gap-1 cursor-pointer" 
                                                    onClick={() => handleDelete(post._id)}
                                                >
                                                    <HiTrash className="w-3.5 h-3.5" /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Buttons */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-1.5">
                            {/* Previous Button */}
                            <button
                                className="btn btn-sm bg-[#1B2435] hover:bg-[#131C2E] text-slate-450 border border-slate-800 rounded-xl cursor-pointer disabled:opacity-40"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>

                            {/* Dynamic Page Numbers */}
                            {(() => {
                                const pages = [];
                                for (let i = 1; i <= totalPages; i++) {
                                    pages.push(
                                        <button
                                            key={i}
                                            className={`btn btn-sm rounded-xl cursor-pointer ${
                                                currentPage === i 
                                                    ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] text-white border-none shadow-md shadow-orange-500/20' 
                                                    : 'bg-[#1B2435] hover:bg-[#131C2E] text-slate-400 border border-slate-800'
                                            }`}
                                            onClick={() => setCurrentPage(i)}
                                        >
                                            {i}
                                        </button>
                                    );
                                }
                                return pages;
                            })()}

                            {/* Next Button */}
                            <button
                                className="btn btn-sm bg-[#1B2435] hover:bg-[#131C2E] text-slate-450 border border-slate-800 rounded-xl cursor-pointer disabled:opacity-40"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
