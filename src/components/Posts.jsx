import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Banner from './Banner';
import { Link } from 'react-router';
import AllTags from './AllTags';
import { HiChevronDown } from 'react-icons/hi';

const HomePage = () => {
    const [searchTag, setSearchTag] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('newest');

    const { data, isLoading } = useQuery({
        queryKey: ['posts', currentPage, sortBy, searchTag],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/posts?page=${currentPage}&sort=${sortBy}&tag=${searchTag}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-bars loading-xl text-center"></span>
            </div>
        );
    }
    const totalPost = data?.total || 0;
    const totalPages = Math.ceil(totalPost / 12);

    return (
        <div className="mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16">

            {/* banner section search functionality */}
            <Banner onSearch={(tag) => {
                setSearchTag(tag);
                setCurrentPage(1);
            }} />

            <AllTags setSearchTag={setSearchTag} setCurrentPage={setCurrentPage}></AllTags>

            {/* sorting dropdwon */}
            <div className="flex justify-center mb-6 mt-8">
                <div className="dropdown dropdown-center">
                    <div tabIndex={0} role="button" className="btn btn-outline">
                        {sortBy === 'popularity' ? 'Sort by Popularity' : 'All Posts'}

                        <HiChevronDown className="w-4 h-4 ml-1" />

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
                {data?.posts?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.posts?.map(post => (
                            <div key={post._id} className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 p-6 rounded-2xl flex flex-col justify-between">
                                {/* Author Info */}
                                <div className="flex items-center gap-4 mb-5">
                                    <img className="w-16 h-16 rounded-full border-2 border-blue-400 object-cover" src={post.authorImage} alt="author" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">{post.postTitle}</h2>
                                        <p className="text-xs text-gray-500">{new Date(post.postTime).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Tags & Votes */}
                                <div className='flex flex-col justify-center items-start mb-4 gap-2'>
                                    <span className="badge badge-outline badge-sm text-blue-500 border-blue-400">{post.tag}</span>
                                    <div className="flex gap-6 text-sm text-gray-700">
                                        <span>👍 {post.upVote}</span>
                                        <span>👎 {post.downVote}</span>
                                    </div>
                                </div>

                                {/* Comments & Vote Count */}
                                <div className="flex justify-between text-sm text-gray-600 font-medium mb-4">
                                    <span>💬 {post.totalComments} Comments</span>
                                    <span>⭐ Votes: {post.upVote - post.downVote}</span>
                                </div>

                                {/* View More Button */}
                                <Link to={`details/${post._id}`} className='mt-auto'>
                                    <button className="btn btn-sm rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white transition-all duration-300">
                                        View More
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-10 text-gray-500">No posts found.</p>
                )}
            </div>

            {/* Pagination Buttons */}
            <div className="join flex flex-wrap justify-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                    className="join-item btn btn-sm"
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
                                className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(1)}
                            >
                                1
                            </button>
                        );
                        if (startPage > 2) {
                            pages.push(<span key="start-ellipsis" className="join-item btn btn-sm disabled">...</span>);
                        }
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                            <button
                                key={i}
                                className={`join-item btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(i)}
                            >
                                {i}
                            </button>
                        );
                    }

                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                            pages.push(<span key="end-ellipsis" className="join-item btn btn-sm disabled">...</span>);
                        }
                        pages.push(
                            <button
                                key={totalPages}
                                className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-active' : ''}`}
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
                    className="join-item btn btn-sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>


        </div>
    );
};

export default HomePage;
