import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { use } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';
import Swal from 'sweetalert2';

const MyPosts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext);

    // Fetch all posts of the user
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['userPosts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-posts?email=${user.email}`);
            return res.data;
        }
    });

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
                    await axiosSecure.delete(`/user-posts/${postId}`)
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
                            {posts.map((post, index) => (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-medium">{post.postTitle}</td>
                                    <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                                    <td>
                                        <Link to={`/comments/${post._id}`}>
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
                </div>
            )}
        </div>
    );
};

export default MyPosts;
