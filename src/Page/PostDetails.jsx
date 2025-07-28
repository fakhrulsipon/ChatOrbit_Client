import { useNavigate, useParams } from "react-router";
import { FaThumbsUp, FaThumbsDown, FaUser } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/Provider";
import useAxiosSecure from "../hook/useAxiosSecure";

const PostDetails = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const [commentText, setCommentText] = useState("");
    const { postId } = useParams();
    const { user } = use(AuthContext)
    const shareUrl = `${window.location.origin}/post/${postId}`;

     useEffect(() => {
            document.title = 'PostDetails | ChatOrbit';
        }, []);


    const { data: post, refetch, isError, isLoading } = useQuery({
        queryKey: ['post', postId],
        enabled: !!postId,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/post/${postId}`)
            return res.data
        }
    })

    const handleVote = async (type) => {
        if (!user) {
            return navigate('/login')
        }

        try {
            const res = await axiosSecure.patch(`/post/${type}/${postId}`);
            if (res.data.modifiedCount > 0) {
                refetch();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Already Voted or Failed!',
                    text: 'Try again later.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: error.message || 'Please try again later.',
            });
        }
    }


    const handleComment = async () => {
        if (!user) {
            return navigate('/login')
        }
        if (!commentText.trim()) {
            return Swal.fire("Empty Comment", "Write something to comment.", "error");
        }
       
        const commentData = {
            postId,
            postTitle: post.postTitle,
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



    if (isError) return <p>Something is Wrong</p>

    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    );
    return (
        <div className="max-w-4xl my-12 mx-auto px-6 py-10 bg-gradient-to-br from-white via-emerald-50 to-white rounded-3xl border border-emerald-400 shadow-xl shadow-emerald-100/50 transition-all duration-300">
            <h2 className="text-2xl font-extrabold text-emerald-700 mb-5 flex items-center gap-2"> <FaUser className="text-emerald-500" /> Author Info</h2>
            <div className="flex items-center gap-5 mb-6 border-b pb-5">
                <img className="w-16 h-16 rounded-full ring-4 ring-emerald-300 shadow-md object-cover" src={post.authorImage} alt="" />
                <div>
                    <h3 className="font-bold text-xl text-gray-800">{post.authorName}</h3>
                    <p className="text-sm text-gray-500 italic">{post.postTime}</p>
                </div>
            </div>

            {/* Post Title & Tag */}
            <h1 className="text-4xl font-black text-gray-900 mb-3 leading-snug tracking-tight">{post.title}</h1>
            <p className="text-xs uppercase bg-blue-100 text-blue-700 inline-block px-4 py-1 rounded-full font-semibold tracking-wider mb-6 shadow-sm">
                #{post.tag}
            </p>

            {/* Post Description */}
            <p className="text-gray-800 text-lg leading-relaxed mb-8">{post.description}</p>

            {/* Buttons: Vote + Share + Comment */}
            <div className="flex items-center flex-wrap gap-4 mb-10">
                <button onClick={() => handleVote('upVote')} className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium transition">
                    <FaThumbsUp /> {post.upVote}
                </button>
                <button onClick={() => handleVote('downVote')} className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium transition">
                    <FaThumbsDown /> {post.downVote}
                </button>

                <FacebookShareButton url={shareUrl} quote={post.title}>
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition">
                        <FacebookIcon size={28} round />
                        <span>Share</span>
                    </div>
                </FacebookShareButton>

                <button className="btn btn-outline btn-sm text-sm hover:bg-emerald-500 hover:text-white transition">Comment</button>
            </div>

            {/* Comment Section */}
            <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                <textarea
                    placeholder="Write your comment..."
                    className="textarea textarea-bordered w-full mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-lg text-base"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button onClick={handleComment} className="btn bg-emerald-600 hover:bg-emerald-700 text-white btn-sm transition">Post Comment</button>
            </div>
        </div>
    );
};

export default PostDetails;
