import { useQuery } from '@tanstack/react-query';
import { FaMedal } from 'react-icons/fa';
import { use, useEffect } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../hook/useAxiosSecure';

const MyProfile = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

     useEffect(() => {
            document.title = 'MyProfile | ChatOrbit';
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
    // console.log('users', userInfo)

    // Get latest 3 posts
    const { data: recentPosts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['recentPosts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-posts?email=${user.email}`);
            return res.data;
        }
    });
    // console.log('latest 3ta post', recentPosts)

    if (userLoading || postsLoading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-spinner text-cyan-500 w-16 h-16"></span>
            </div>
        );
    }
   

    return (
        <div className="max-w-4xl md:mx-auto mx-6 p-6 bg-gradient-to-br from-white via-sky-50 to-cyan-100 shadow-xl rounded-2xl my-10 border border-cyan-200 transition-transform hover:scale-[1.01] duration-300">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
                <img
                    src={userInfo?.image || user?.photoURL}
                    alt="User"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-300"
                />
                <div>
                    <h2 className="text-2xl font-extrabold text-cyan-800">{userInfo?.name || user?.displayName}</h2>
                    <p className="text-gray-700 font-medium">{userInfo?.email || user?.email}</p>

                    {/* Show Badges */}
                    <div className="mt-3 flex gap-4">
                        {userInfo?.badges?.includes('bronze') && (
                            <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full shadow-sm">
                                <FaMedal className="text-lg" />
                                <span className="text-sm font-semibold">Bronze Badge</span>
                            </div>
                        )}
                        {userInfo?.badges?.includes('gold') && (
                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full shadow-sm">
                                <FaMedal className="text-lg" />
                                <span className="text-sm font-semibold">Gold Badge</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold text-cyan-800 mb-4 border-b pb-2 border-cyan-300">
                    My Recent Posts
                </h3>
                {recentPosts?.length > 0 ? (
                    <div className="space-y-4">
                        {recentPosts?.map(post => (
                            <div
                                key={post._id}
                                className="p-4 border border-cyan-200 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h4 className="text-lg font-semibold text-gray-800">{post.postTitle}</h4>
                                <p className="text-gray-600 mt-1">
                                    {post.postDescription?.slice(0, 100)}...
                                </p>
                                <p className="text-sm text-cyan-600 mt-2 font-medium">
                                    Tag: #{post.tag}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">You haven’t posted anything yet.</p>
                )}
            </div>
        </div>

    );
};

export default MyProfile;
