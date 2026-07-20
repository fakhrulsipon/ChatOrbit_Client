import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import axios from 'axios';

const LatestPosts = () => {

    const { data: latestPosts = [], isLoading, isError, error } = useQuery({
        queryKey: ['latestPosts'],
        queryFn: async () => {
            try {
                const res = await axios.get('https://chatorbit-server.vercel.app/latest');
                if (Array.isArray(res.data)) {
                    return res.data;
                }
                throw new Error("Invalid response format");
            } catch (err) {
                console.warn("Failed to fetch from /latest, falling back to /posts?sort=newest. Error:", err);
                const fallbackRes = await axios.get('https://chatorbit-server.vercel.app/posts?page=1&sort=newest');
                return fallbackRes.data?.posts || [];
            }
        }
    });

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-orange-500 scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading latest posts...</p>
            </div>
        );
    }

    if (isError) {
        console.error("LatestPosts loading failed with error:", error);
        return (
            <div className="text-center py-10 bg-rose-950/20 border border-rose-900/30 rounded-2xl max-w-md mx-auto my-8">
                <p className="text-rose-400 font-semibold">Failed to load latest posts</p>
            </div>
        );
    }

    return (
        <div className="px-1 mt-6">
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                    📌 Latest Discussions
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Check out the most recent posts shared by our community
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {latestPosts.map(post => (
                    <div 
                        key={post._id} 
                        className="group bg-slate-900/30 hover:bg-slate-900/50 backdrop-blur-sm border border-slate-850/60 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
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
                                    <p className="text-[10px] text-slate-500">{new Date(post.postTime).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                                </div>
                            </div>

                            {/* Post Title */}
                            <h3 className="text-base font-bold text-white leading-snug group-hover:text-orange-400 transition-colors duration-200 mb-3 line-clamp-2 min-h-[3rem]">
                                {post.postTitle}
                            </h3>

                            {/* Tag & Votes count badges */}
                            <div className="flex flex-wrap gap-2 items-center mb-5">
                                <span className="px-3 py-1 text-xs font-semibold text-orange-400 bg-orange-950/30 border border-orange-900/20 rounded-full">
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
                                <span className="flex items-center gap-1 bg-slate-950/40 px-2 py-1 rounded-xl border border-slate-850/50 text-slate-400" title={`${post.totalComments || 0} comments`}>
                                    💬 {post.totalComments || 0}
                                </span>
                                <span className="flex items-center gap-1 bg-slate-950/40 px-2 py-1 rounded-xl border border-slate-850/50 text-orange-400 font-semibold" title={`Score: ${post.upVote - post.downVote}`}>
                                    ⭐ {post.upVote - post.downVote}
                                </span>
                            </div>

                            <Link to={`/details/${post._id}`}>
                                <button className="btn btn-sm px-4 h-9 bg-gradient-to-r from-orange-500 to-rose-500 text-white border-none rounded-xl hover:from-orange-450 hover:to-rose-450 hover:shadow-md hover:shadow-orange-500/20 active:scale-95 transition-all duration-300 font-semibold cursor-pointer">
                                    View More
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;
