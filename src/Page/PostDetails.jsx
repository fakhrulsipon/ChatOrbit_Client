import { useNavigate, useParams } from "react-router";
import { FaThumbsUp, FaThumbsDown, FaUser } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import useAxiosSecure from "../hook/useAxiosSecure";

const PostDetails = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState("");
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const shareUrl = `${window.location.origin}/post/${postId}`;

    useEffect(() => {
        document.title = 'PostDetails | ChatOrbit';
    }, []);

    const { data: post, refetch, isError, isLoading } = useQuery({
        queryKey: ['post', postId],
        enabled: !!postId,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/post/${postId}`);
            return res.data;
        }
    });

    const handleVote = async (type) => {
        if (!user) return navigate('/login');

        try {
            const res = await axiosSecure.patch(`/post/${type}/${postId}`);
            if (res.data.modifiedCount > 0) refetch();
            else Swal.fire({ icon: 'error', title: 'Already Voted or Failed!', text: 'Try again later.' });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Something went wrong!', text: error.message || 'Please try again later.' });
        }
    };

    const handleComment = async () => {
        if (!user) return navigate('/login');
        if (!commentText.trim()) return Swal.fire("Empty Comment", "Write something to comment.", "error");

        const commentData = {
            postId,
            postTitle: post.title,
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            commentText,
            commentTime: new Date()
        };

        try {
            const res = await axiosSecure.post("/comments", commentData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Your comment has been posted.", "success");
                setCommentText("");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to post comment.", error);
        }
    };

    if (isError) return <p>Something is Wrong</p>;
    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    );

    return (
        <div className="max-w-full my-12 px-6 lg:px-20">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Side: Post Content */}
                <div className="flex-1">
                    <h1 className="text-2xl xl:text-4xl font-medium text-gray-900 mb-3 leading-snug tracking-tight">{post.postTitle}</h1>
                    <p className="text-xs uppercase bg-blue-100 text-blue-700 inline-block px-4 py-1 rounded-full font-semibold tracking-wider mb-6 shadow-sm">
                        #{post.tag}
                    </p>
                    <p className="text-gray-800 text-lg leading-relaxed mb-8">{post.postDescription}</p>

                    {/* Buttons */}
                    <div className="flex items-center flex-wrap gap-4 mb-10">
                        <button onClick={() => handleVote('upVote')} className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium transition">
                            <FaThumbsUp /> {post.upVote}
                        </button>
                        <button onClick={() => handleVote('downVote')} className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium transition">
                            <FaThumbsDown /> {post.downVote}
                        </button>

                        <FacebookShareButton url={shareUrl} quote={post.postTitle}>
                            <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition">
                                <FacebookIcon size={28} round />
                                <span>Share</span>
                            </div>
                        </FacebookShareButton>

                        <button className="btn btn-outline btn-sm text-sm hover:bg-emerald-500 hover:text-white transition">Comment</button>
                    </div>

                    {/* Comment Section */}
                    <div className="pt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                        <textarea
                            placeholder="Write your comment..."
                            className="textarea textarea-bordered border-gray-400 w-full xl:w-5/10 mb-4 focus:outline-none rounded-lg text-base"
                            rows="4"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <div>
                            <button onClick={handleComment} className="btn bg-blue-400 hover:bg-blue-500 text-white btn-sm transition">Post Comment</button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Author Info */}
                <div className="w-full lg:w-80 bg-white p-6 rounded-3xl">
                    <h2 className="text-2xl font-extrabold text-blue-400 mb-5 flex items-center gap-2">
                        <FaUser className="text-blue-400" /> Author Info
                    </h2>
                    <div className="flex items-center gap-5 mb-6 border-b pb-5">
                        <img className="w-16 h-16 rounded-full ring-4 ring-blue-300 shadow-md object-cover" src={post.authorImage} alt="" />
                        <div>
                            <h3 className="font-bold text-xl text-gray-800">{post.authorName}</h3>
                            <p className="text-sm text-gray-500 italic">{post.postTime}</p>
                        </div>
                    </div>

                    {/* Static Text Section */}
                    <div className="space-y-3">
                        <p className="text-gray-700 text-sm">
                            <span className="font-semibold">Bio:</span> Passionate developer and content creator sharing tips and tutorials.
                        </p>
                        <p className="text-gray-700 text-sm">
                            <span className="font-semibold">Followers:</span> 1.2k
                        </p>
                        <p className="text-gray-700 text-sm">
                            <span className="font-semibold">Joined:</span> January 2022
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostDetails;
