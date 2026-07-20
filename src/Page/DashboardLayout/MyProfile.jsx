import { useQuery } from '@tanstack/react-query';
import { FaMedal } from 'react-icons/fa';
import { use, useEffect } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../hook/useAxiosSecure';

const MyProfile = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        document.title = 'My Profile | ChatOrbit';
    }, []);

    // Get user info
    const { data: userInfo, isLoading: userLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Get latest 3 posts
    const { data: recentPosts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['recentPosts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-posts?email=${user.email}`);
            return res.data;
        }
    });

    if (userLoading || postsLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
                <p className="text-sm font-medium text-slate-505 animate-pulse">Loading profile data...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Profile Section */}
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8A00]/5 to-transparent rounded-full filter blur-2xl"></div>
                
                <img
                    src={userInfo?.image || user?.photoURL}
                    alt="User Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 ring-4 ring-[#FF8A00]/50 shadow-lg shrink-0"
                />
                
                <div className="text-center md:text-left space-y-3">
                    <h2 className="text-3xl font-bold text-white heading-display tracking-tight">{userInfo?.name || user?.displayName}</h2>
                    <p className="text-sm font-semibold text-slate-400 font-sans">{userInfo?.email || user?.email}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                        {userInfo?.badges?.includes('bronze') && (
                            <div className="flex items-center gap-1.5 bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/25 px-3 py-1 rounded-full text-xs font-bold uppercase heading-display">
                                <FaMedal className="text-sm" />
                                <span>Bronze Badge</span>
                            </div>
                        )}
                        {userInfo?.badges?.includes('gold') && (
                            <div className="flex items-center gap-1.5 bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/25 px-3 py-1 rounded-full text-xs font-bold uppercase heading-display">
                                <FaMedal className="text-sm" />
                                <span>Gold Badge</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white heading-display tracking-tight border-b border-slate-800/80 pb-3">
                    My Recent Posts
                </h3>
                {recentPosts?.length > 0 ? (
                    <div className="space-y-4">
                        {recentPosts?.map(post => (
                            <div
                                key={post._id}
                                className="bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-lg hover:shadow-xl hover:border-[#FF5C5C]/30 transition-all duration-300"
                            >
                                <h4 className="text-lg font-bold text-white heading-display leading-snug">{post.postTitle}</h4>
                                <p className="text-xs text-[#CBD5E1] mt-3 leading-relaxed">
                                    {post.postDescription}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-bold px-3 py-1 bg-[#0B1120] text-[#FF8A00] border border-slate-850 rounded-full">
                                        #{post.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/10 border border-dashed border-slate-855 rounded-3xl">
                        <span className="text-4xl mb-3">🔍</span>
                        <p className="text-center text-slate-400 font-medium">You haven’t posted any discussions yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
