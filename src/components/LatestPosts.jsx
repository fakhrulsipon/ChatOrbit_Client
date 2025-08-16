import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import axios from 'axios';

const LatestPosts = () => {

    const { data: latestPosts = [], isLoading, isError } = useQuery({
        queryKey: ['latestPosts'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/latest');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading latest posts...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Failed to load posts</div>;
    }

    return (
        <div className='mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16'>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">📌 Latest Posts</h2>
                <p className="text-gray-500 mt-2">
                    Check out the most recent posts shared by our community
                </p>
            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {latestPosts.map(post => (
                    <div
                        key={post._id}
                        className="card bg-white shadow-xl border hover:shadow-2xl transition-all duration-300 p-5 rounded-xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                className="w-14 h-14 rounded-full border-2 border-primary"
                                src={post.authorImage}
                                alt="author"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{post.postTitle}</h2>
                                <p className="text-xs text-gray-500">
                                    {new Date(post.postTime).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                            Tag:{" "}
                            <span className="badge badge-outline badge-sm">{post.tag}</span>
                        </p>

                        <div className="flex justify-between text-sm text-gray-700 mb-4">
                            <span>👍 {post.upVote}</span>
                            <span>Votes: {post.upVote - post.downVote}</span>
                        </div>

                        <Link to={`details/${post._id}`} className="mt-auto">
                            <button className="btn btn-sm rounded-lg bg-blue-400 hover:bg-blue-500 text-white">
                                View More
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;
