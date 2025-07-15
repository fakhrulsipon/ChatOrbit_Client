import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Banner from './Banner';

const HomePage = () => {
    const [searchTag, setSearchTag] = useState('');
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('newest');

    const { data, isLoading } = useQuery({
        queryKey: ['posts', page, sortBy, searchTag],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/posts?page=${page}&sort=${sortBy}&tag=${searchTag}`);
            return res.data;
        },
    });

    if (isLoading) return <span className="loading loading-bars loading-xl"></span>;
    const totalPost = data.total || 0;
    const totalPages = Math.ceil(totalPost / 5);

    return (
        <div className="p-6">

            {/* banner section search functionality */}
            <Banner onSearch={(tag) => {
                setSearchTag(tag);
                setPage(1);
            }} />

            {/* sorting dropdwon */}
            <div className="flex justify-center mb-6">
                <div className="dropdown dropdown-center">
                    <div tabIndex={0} role="button" className="btn btn-primary">
                        {sortBy === 'popularity' ? 'Sort by Popularity' : 'All Posts'}
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button onClick={() => setSortBy('newest')}>All Posts (Newest First)</button>
                        </li>
                        <li>
                            <button onClick={() => setSortBy('popularity')}>Sort by Popularity</button>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="space-y-4">
                {isLoading ? (
                    <span className="loading loading-bars loading-xl"></span>
                ) : data?.posts?.length > 0 ? (
                    data.posts.map(post => (
                        <div key={post._id} className="card bg-base-100 shadow-md p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div>
                                    <h2 className="text-lg font-semibold">{post.postTitle}</h2>
                                    <p className="text-sm text-gray-500">{new Date(post.postTime).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-sm mb-2 text-gray-700">Tag: <span className="badge badge-outline">{post.tag}</span></p>
                            <div className="flex gap-4 text-sm text-gray-600 mt-2">
                                <span>👍 {post.upVote}</span>
                                <span>Votes: {post.upVote - post.downVote}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center mt-10 text-gray-500">No posts found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <div className="join">
                    {[...Array(totalPages).keys()].map(num => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`join-item btn btn-sm ${page === num + 1 ? 'btn-active' : ''}`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
