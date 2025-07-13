import { useQuery } from '@tanstack/react-query';

import { FaMedal } from 'react-icons/fa';
import { use } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../hook/useAxiosSecure';

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext);

    // Get user info
    const { data: userInfo = {}, isLoading: userLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    // console.log('users', userInfo)

    // Get latest 3 posts
    const { data: recentPosts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['recentPosts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user.email}`);
            return res.data;
        }
    });
    // console.log('latest 3ta post', recentPosts)

    if (userLoading || postsLoading) {
        return <span className="loading loading-bars loading-xl"></span>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center gap-6">
                <img
                    src={userInfo.image || user?.photoURL}
                    alt="User"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">{userInfo.name || user?.displayName}</h2>
                    <p className="text-gray-600">{userInfo.email || user?.email}</p>

                    {/* Show Badges */}
                    <div className="mt-2 flex gap-3">
                        {userInfo?.badges?.includes('bronze') && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <FaMedal className="text-xl" />
                                <span className="text-sm font-semibold">Bronze Badge</span>
                            </div>
                        )}
                        {userInfo?.badges?.includes('gold') && (
                            <div className="flex items-center gap-1 text-yellow-500">
                                <FaMedal className="text-xl" />
                                <span className="text-sm font-semibold">Gold Badge</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>
                {recentPosts.length > 0 ? (
                    <div className="space-y-4">
                        {recentPosts.map(post => (
                            <div key={post._id} className="p-4 border rounded shadow-sm">
                                <h4 className="text-lg font-bold">{post.
                                    postTitle}</h4>
                                <p className="text-gray-600">{post.
                                    postDescription?.slice(0, 100)}...</p>
                                <p className="text-sm text-gray-400">Tag: #{post.tag}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You haven’t posted anything yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
