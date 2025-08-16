import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import axios from 'axios';

const TopVotedPosts = () => {
    const { data: topPosts = [], isLoading, isError } = useQuery({
        queryKey: ['topVotedPosts'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/top-voted');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading top voted posts...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Failed to load top voted posts</div>;
    }

    return (
        <div className='mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16'>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">🔥 Top Voted Posts</h2>
                <p className="text-gray-500 mt-2">
                    Discover the posts that received the highest votes
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {topPosts.map(post => (
                    <div
                        key={post._id}
                        className="bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-6 rounded-3xl"
                    >
                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                className="w-16 h-16 rounded-full border-2 border-blue-400 object-cover"
                                src={post.authorImage}
                                alt="author"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{post.postTitle}</h2>
                                <p className="text-xs text-gray-500">
                                    {new Date(post.postTime).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Tag */}
                        <p className="text-sm text-gray-600 mb-4">
                            Tag: <span className="badge badge-outline badge-sm text-blue-500 border-blue-400">{post.tag}</span>
                        </p>

                        {/* Votes */}
                        <div className="flex justify-between text-sm text-gray-700 font-medium">
                            <span>👍 {post.upVote}</span>
                            <span>Votes: {post.upVote - post.downVote}</span>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default TopVotedPosts;
