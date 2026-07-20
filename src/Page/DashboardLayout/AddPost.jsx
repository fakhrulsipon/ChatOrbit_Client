import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/Provider';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { use, useEffect } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { HiSparkles } from 'react-icons/hi';

const AddPost = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Add Post | ChatOrbit';
    }, []);

    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Fetch tags
    const { data: tags, isLoading: tagLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axios.get('https://chatorbit-server.vercel.app/tags');
            return res.data;
        }
    });

    // Fetch user post count
    const {
        data: postCountData,
        isLoading: countLoading,
        refetch
    } = useQuery({
        queryKey: ['postCount', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count/${user.email}`);
            return res.data;
        },
    });

    // Fetch user badge
    const {
        data: usersBadge,
        isLoading: badgeLoading
    } = useQuery({
        queryKey: ['usersBadge', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });
    const badge = usersBadge?.badges?.[0];

    if (!user || countLoading || badgeLoading || tagLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading dashboard elements...</p>
            </div>
        );
    }

    if (postCountData?.postCount >= 5 && badge === 'bronze') {
        return (
            <div className="max-w-md mx-auto my-12 p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-2xl text-center space-y-6">
                <div className="p-3 bg-[#FF5C5C]/10 border border-[#FF5C5C]/20 rounded-2xl w-fit mx-auto text-[#FF5C5C]">
                    <HiSparkles className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-white heading-display">Post Limit Reached</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    You have reached the maximum limit of <strong>5 posts</strong> on the free tier. Upgrade to Gold membership to enjoy unrestricted posting privileges.
                </p>
                <div className="pt-2">
                    <Link to="/memberShip">
                        <button 
                            style={{
                                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                            }}
                            className="px-6 py-3 rounded-xl text-white font-extrabold text-sm hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer"
                        >
                            Become a Gold Member
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const onSubmit = async (data) => {
        const postData = {
            ...data,
            authorImage: user.photoURL || '',
            authorName: user?.displayName || '',
            authorEmail: user?.email || '',
            upVote: 0,
            downVote: 0,
            postTime: new Date()
        };

        try {
            await axiosSecure.post('https://chatorbit-server.vercel.app/posts', postData);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Post added successfully',
                timer: 2000,
                showConfirmButton: false,
                background: '#1B2435',
                color: '#FFFFFF'
            });
            reset();
            refetch();
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Failed to add post. Please try again.',
                confirmButtonText: 'Retry',
                background: '#1B2435',
                color: '#FFFFFF',
                confirmButtonColor: '#FF8A00'
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto my-6 p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white heading-display tracking-tight flex items-center justify-center gap-2">
                📝 Add New Post
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Display Name */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">👤 Display Name</label>
                    <input
                        type="text"
                        defaultValue={user?.displayName || ''}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl text-slate-400 border border-slate-800 bg-[#0B1120] focus:outline-none text-sm font-semibold select-none"
                    />
                </div>

                {/* Photo URL */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">🖼️ Image URL</label>
                    <input
                        type="text"
                        defaultValue={user?.photoURL || ''}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl text-slate-400 border border-slate-800 bg-[#0B1120] focus:outline-none text-sm font-semibold select-none"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">📧 Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl text-slate-400 border border-slate-800 bg-[#0B1120] focus:outline-none text-sm font-semibold select-none"
                    />
                </div>

                {/* Post Title */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-350 uppercase">🖋️ Post Title</label>
                    <input
                        type="text"
                        {...register('postTitle', { required: true })}
                        placeholder="Type your post title here..."
                        className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
                    />
                    {errors.postTitle && <p className="text-red-500 font-bold text-xs mt-1">Post Title is required</p>}
                </div>

                {/* Post Description */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-350 uppercase">📄 Post Description</label>
                    <textarea
                        {...register('postDescription', { required: true })}
                        placeholder="Write your post description here..."
                        className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
                        rows={4}
                    />
                    {errors.postDescription && <p className="text-red-500 font-bold text-xs mt-1">Post Description is required</p>}
                </div>

                {/* Tag Selector */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-350 uppercase">🏷️ Select a Tag</label>
                    <select
                        {...register('tag', { required: true })}
                        className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors cursor-pointer"
                        defaultValue=""
                    >
                        <option value="" disabled className="text-slate-500">Select a tag</option>
                        {tags?.map((tag) => (
                            <option key={tag._id} value={tag.tag} className="bg-[#1B2435]">
                                #{tag.tag}
                            </option>
                        ))}
                    </select>
                    {errors.tag && <p className="text-red-500 font-bold text-xs mt-1">Tag is required</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                        boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                    }}
                    className="w-full text-white font-extrabold text-sm py-4 rounded-xl border-none shadow-lg active:scale-98 transition-all duration-300 cursor-pointer"
                >
                    🚀 Add Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;