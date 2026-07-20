import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import { HiChevronDown } from 'react-icons/hi';

const HomePage = ({ searchTag, setSearchTag, currentPage, setCurrentPage }) => {
    const [sortBy, setSortBy] = useState('newest');

    const { data, isLoading } = useQuery({
        queryKey: ['posts', currentPage, sortBy, searchTag],
        queryFn: async () => {
            const res = await axios.get(`https://chatorbit-server.vercel.app/posts?page=${currentPage}&sort=${sortBy}&tag=${searchTag}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-orange-500 scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading discussions...</p>
            </div>
        );
    }
    
    const totalPost = data?.total || 0;
    const totalPages = Math.ceil(totalPost / 12);

    return (
        <div className="px-1 mt-6">
            {/* sorting dropdown */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-200">
                    {searchTag ? `Search Results for #${searchTag}` : 'All Discussions'}
                    <span className="text-sm font-medium text-slate-500 ml-2">({totalPost} posts)</span>
                </h2>
                
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline border-slate-800/80 hover:bg-slate-850 hover:text-slate-100 text-slate-300 rounded-xl px-4 py-2 text-sm bg-slate-900/60 shadow-sm flex items-center gap-1.5 cursor-pointer">
                        {sortBy === 'popularity' ? 'Popularity' : 'Newest First'}
                        <HiChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-slate-900 border border-slate-800 rounded-2xl w-52 mt-1">
                        <li>
                            <button onClick={() => setSortBy('newest')} className="rounded-xl hover:bg-slate-800 text-slate-200">Newest First</button>
                        </li>
                        <li>
                            <button onClick={() => setSortBy('popularity')} className="rounded-xl hover:bg-slate-800 text-slate-200">Popularity</button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                {data?.posts?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {data?.posts?.map(post => (
                            <div key={post._id} className="group bg-slate-900/30 hover:bg-slate-900/50 backdrop-blur-sm border border-slate-850/60 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                                {/* Author & Header Section */}
                                <div>
                                    <div className="flex items-center gap-3.5 mb-4">
                                        <div className="relative">
                                            <img 
                                                className="w-12 h-12 rounded-full border-2 border-slate-800 object-cover shadow-sm group-hover:border-orange-500 transition-colors duration-300" 
                                                src={post.authorImage} 
                                                alt="author" 
                                            />
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-slate-200 truncate">{post.authorName || 'Anonymous'}</h4>
                                            <p className="text-[10px] text-slate-550">{new Date(post.postTime).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                                        </div>
                                    </div>

                                    {/* Post Title */}
                                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-orange-400 transition-colors duration-200 mb-3 line-clamp-2 min-h-[3rem]">
                                        {post.postTitle}
                                    </h3>

                                    {/* Tag & Votes count badges */}
                                    <div className="flex flex-wrap gap-2 items-center mb-5">
                                        <span className="px-3 py-1 text-xs font-semibold text-orange-400 bg-orange-950/30 border border-orange-900/20 rounded-full font-sans">
                                            #{post.tag}
                                        </span>
                                        <div className="flex items-center gap-2.5 bg-slate-950/50 px-2.5 py-1 rounded-full border border-slate-850 text-[11px] text-slate-400 font-medium">
                                            <span className="flex items-center gap-1">👍 {post.upVote}</span>
                                            <span className="text-slate-800">|</span>
                                            <span className="flex items-center gap-1">👎 {post.downVote}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer info & CTA */}
                                <div className="pt-4 border-t border-slate-850/80 flex items-center justify-between gap-4 mt-auto">
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                                        <span className="flex items-center gap-1 bg-slate-950/40 px-2 py-1 rounded-xl border border-slate-850/50 text-slate-400" title={`${post.totalComments} comments`}>
                                            💬 {post.totalComments}
                                        </span>
                                        <span className="flex items-center gap-1 bg-slate-950/40 px-2 py-1 rounded-xl border border-slate-850/50 text-orange-400 font-semibold" title={`Score: ${post.upVote - post.downVote}`}>
                                            ⭐ {post.upVote - post.downVote}
                                        </span>
                                    </div>

                                    <Link to={`details/${post._id}`}>
                                        <button className="btn btn-sm px-4 h-9 bg-gradient-to-r from-orange-500 to-rose-500 text-white border-none rounded-xl hover:from-orange-450 hover:to-rose-450 hover:shadow-md hover:shadow-orange-500/20 active:scale-95 transition-all duration-300 font-semibold cursor-pointer">
                                            View More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/10 border border-dashed border-slate-855 rounded-3xl">
                        <span className="text-4xl mb-3">🔍</span>
                        <p className="text-center text-slate-400 font-medium">No posts found matching the query.</p>
                        {searchTag && (
                            <button 
                                onClick={() => setSearchTag('')} 
                                className="mt-4 btn btn-sm bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-450 hover:to-rose-450 border-none text-white rounded-xl cursor-pointer"
                            >
                                Clear search filter
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-1.5">
                    {/* Previous Button */}
                    <button
                        className="btn btn-sm bg-slate-900 hover:bg-slate-850 text-slate-355 border border-slate-800 shadow-sm rounded-xl cursor-pointer disabled:opacity-40"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>

                    {/* Dynamic Page Numbers */}
                    {(() => {
                        const pages = [];
                        const maxVisiblePages = 5;
                        let startPage, endPage;

                        if (totalPages <= maxVisiblePages) {
                            startPage = 1;
                            endPage = totalPages;
                        } else {
                            const half = Math.floor(maxVisiblePages / 2);
                            if (currentPage <= half + 1) {
                                startPage = 1;
                                endPage = maxVisiblePages;
                            } else if (currentPage >= totalPages - half) {
                                startPage = totalPages - maxVisiblePages + 1;
                                endPage = totalPages;
                            } else {
                                startPage = currentPage - half;
                                endPage = currentPage + half;
                            }
                        }

                        if (startPage > 1) {
                            pages.push(
                                <button
                                    key={1}
                                    className={`btn btn-sm rounded-xl cursor-pointer ${currentPage === 1 ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-none shadow-md shadow-orange-500/20' : 'bg-slate-900 hover:bg-slate-850 text-slate-355 border border-slate-800 shadow-sm'}`}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    1
                                </button>
                            );
                            if (startPage > 2) {
                                pages.push(<span key="start-ellipsis" className="px-2 self-center text-slate-500 font-medium">...</span>);
                            }
                        }

                        for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                                <button
                                    key={i}
                                    className={`btn btn-sm rounded-xl cursor-pointer ${currentPage === i ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-none shadow-md shadow-orange-500/20' : 'bg-slate-900 hover:bg-slate-850 text-slate-355 border border-slate-800 shadow-sm'}`}
                                    onClick={() => setCurrentPage(i)}
                                >
                                    {i}
                                </button>
                            );
                        }

                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                pages.push(<span key="end-ellipsis" className="px-2 self-center text-slate-505 font-medium">...</span>);
                            }
                            pages.push(
                                <button
                                    key={totalPages}
                                    className={`btn btn-sm rounded-xl cursor-pointer ${currentPage === totalPages ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-none shadow-md shadow-orange-500/20' : 'bg-slate-900 hover:bg-slate-850 text-slate-355 border border-slate-800 shadow-sm'}`}
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            );
                        }

                        return pages;
                    })()}

                    {/* Next Button */}
                    <button
                        className="btn btn-sm bg-slate-900 hover:bg-slate-850 text-slate-355 border border-slate-800 shadow-sm rounded-xl cursor-pointer disabled:opacity-40"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
