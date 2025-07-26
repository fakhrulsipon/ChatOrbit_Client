
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/Provider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { use, useEffect } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AddPost = () => {

    useEffect(() => {
        document.title = 'AddPost | ChatOrbit';
    }, []);


    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // all tag ger 
    const { data: tags, isLoading: tagLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/tags');
            return res.data
        }
    })

    // akta user koyta post korse er data fetch
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
    // console.log(postCountData?.postCount)

    // user er badge branze kina check
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
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
                <div className="flex flex-col items-center gap-6 animate-fade-in">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full border-indigo-500 animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <p className="text-xl font-bold text-indigo-700 animate-pulse tracking-wide">
                        Loading please wait...
                    </p>
                </div>
            </div>
        );
    }


    if (postCountData?.postCount >= 5 && badge === 'bronze') {
        return (
            <div className="text-center mt-10">
                <p className="mb-4 text-red-600 font-semibold">
                    You have reached the maximum limit of 5 posts.
                </p>
                <Link to={'/memberShip'}><button className="btn btn-primary">Become a Membe</button></Link>
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
            await axiosSecure.post('http://localhost:5000/posts', postData);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Post added successfully',
                timer: 2000,
                showConfirmButton: false,
            });
            reset();
            refetch()
            // প্রয়োজন হলে অন্য পেইজে নিয়ে যেতে পারো
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Failed to add post. Please try again.',
                confirmButtonText: 'Retry',
            });
        }
    };

    return (
        <div className="max-w-lg md:mx-auto mx-6 mt-10 bg-emerald-200 p-10 rounded-3xl shadow-2xl border border-gray-200">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                📝 Add New Post
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

                {/* Display Name */}
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    👤 Display Name
                </label>
                <input
                    type="text"
                    defaultValue={user?.displayName || ''}
                    readOnly
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-shadow duration-300"
                />

                {/* Photo URL */}
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    🖼️ Image URL
                </label>
                <input
                    type="text"
                    defaultValue={user?.photoURL || ''}
                    readOnly
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-shadow duration-300"
                />

                {/* Email */}
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    📧 Email
                </label>
                <input
                    type="email"
                    defaultValue={user?.email || ''}
                    readOnly
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-shadow duration-300"
                />

                {/* Post Title */}
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    🖋️ Post Title
                </label>
                <input
                    type="text"
                    {...register('postTitle', { required: true })}
                    placeholder="Type your post title here..."
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-shadow duration-300"
                />
                {errors.postTitle && <p className="text-red-600 text-sm mt-1">Post Title is required</p>}

                {/* Post Description */}
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    📄 Post Description
                </label>
                <textarea
                    {...register('postDescription', { required: true })}
                    placeholder="Write your post description here..."
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-shadow duration-300"
                    rows={5}
                />
                {errors.postDescription && <p className="text-red-600 text-sm mt-1">Post Description is required</p>}

                {/* Tag Selector */}
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    🏷️ Select a Tag
                </label>
                <select
                    {...register('tag', { required: true })}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-shadow duration-300"
                    defaultValue=""
                >
                    <option value="" disabled>Select a tag</option>
                    {tags?.map((tag) => (
                        <option key={tag._id} value={tag.tag}>
                            {tag.tag}
                        </option>
                    ))}
                </select>
                {errors.tag && <p className="text-red-600 text-sm mt-1">Tag is required</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-bold py-3 rounded-2xl shadow-lg"
                >
                    🚀 Add Post
                </button>

            </form>
        </div>


    );
};

export default AddPost;