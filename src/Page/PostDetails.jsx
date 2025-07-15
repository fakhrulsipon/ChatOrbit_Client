import { useNavigate, useParams } from "react-router";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { use, useState } from "react";
import { AuthContext } from "../Provider/Provider";

const PostDetails = () => {
    const navigate = useNavigate()
    const [commentText, setCommentText] = useState("");
    const { postId } = useParams();
    const {user} = use(AuthContext)
    const shareUrl = `${window.location.origin}/post/${postId}`;


    const { data: post, refetch, isError, isLoading } = useQuery({
        queryKey: ['post', postId],
        enabled: !!postId,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/post/${postId}`)
            return res.data
        }
    })



    const handleVote = async (type) => {
        try {
            const res = await axios.patch(`http://localhost:5000/post/${type}/${postId}`);
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
            const res = await axios.post("http://localhost:5000/comments", commentData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Your comment has been posted.", "success");
                setCommentText("");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to post comment.", error);
        }
    };



    if (isError) return <p>Something is Wrong</p>
    if (isLoading) return <span className="loading loading-bars loading-xl"></span>;
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            Author Info
            <div className="flex items-center gap-4 mb-6">
                <img className="w-12 h-12" src={post.authorImage} alt="" />
                <div>
                    <h3 className="font-semibold text-lg">{post.authorName}</h3>
                    <p className="text-sm text-gray-500">{post.postTime}</p>
                </div>
            </div>

            {/* Post Title & Tag */}
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm bg-blue-100 text-blue-700 inline-block px-2 py-1 rounded mb-4">
                #{post.tag}
            </p>

            {/* Post Description */}
            <p className="text-gray-800 mb-6">{post.description}</p>

            {/* Buttons: Vote + Share + Comment */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => handleVote('upVote')} className="flex items-center gap-1 text-green-600 hover:text-green-800">
                    <FaThumbsUp /> {post.upVote}
                </button>
                <button onClick={() => handleVote('downVote')} className="flex items-center gap-1 text-red-500 hover:text-red-700">
                    <FaThumbsDown /> {post.downVote}
                </button>

                <FacebookShareButton url={shareUrl} quote={post.title}>
                    <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                        <FacebookIcon size={28} round />
                        <span>Share</span>
                    </div>
                </FacebookShareButton>

                <button className="btn btn-outline btn-sm">Comment</button>
            </div>

            {/* Comment Section */}
            <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                <textarea
                    placeholder="Write your comment..."
                    className="textarea textarea-bordered w-full mb-4"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button onClick={handleComment} className="btn btn-primary btn-sm">Post Comment</button>
            </div>
        </div>
    );
};

export default PostDetails;
