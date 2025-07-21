import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { use, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyPosts = () => {
    const { user } = use(AuthContext);
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5;

    // Fetch all posts of the user
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['userPosts', user?.email, currentPage, limit],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(` http://localhost:5000/usersPosts?email=${user.email}&page=${currentPage}&limit=${limit}`,{
                withCredentials: true
            });
            return res.data;
        }
    });

    const myPosts = posts.posts || [];
    const totalPages = posts.totalPages || 1;
    console.log('mypost', myPosts, 'totalpages',totalPages)


    if (isLoading) return <span className="loading loading-bars loading-xl"></span>;

    const handleDelete = (postId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(` http://localhost:5000/user-posts/${postId}`, {withCredentials: true})
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success"
                    });
                    refetch()

                }
                catch (error) {
                    console.log('userPost delete error', error)
                }
            }
        });
    }


    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Posts</h2>
            {posts.length === 0 ? (
                <p className="text-gray-600">You haven’t posted anything yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th>#</th>
                                <th>Post Title</th>
                                <th>Votes</th>
                                <th>Comment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPosts.map((post, index) => (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-medium">{post.postTitle}</td>
                                    <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                                    <td>
                                        <Link to={`/postComments/${post._id}`}>
                                            <button className="btn btn-sm btn-outline btn-info">Comments</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(post._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
                    {/* Pagination Buttons */}
                    <div className="flex justify-center mt-6 gap-2">
                        {/* Previous Button */}
                        <button
                            className="btn btn-sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {/* Page Number Buttons */}
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {idx + 1}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            className="btn btn-sm"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>



                </div>
            )}
        </div>
    );
};

export default MyPosts;
