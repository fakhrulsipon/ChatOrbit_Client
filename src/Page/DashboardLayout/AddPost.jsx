import React, { useState, use } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/Provider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AddPost = () => {
    const [profileImage, setProfileImage] = useState('');
    const { user } = use(AuthContext)


    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const {
        data: postCountData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['postCount', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/posts/count/${user.email}`);
            return res.data;
        },
    });

    console.log('postCount', postCountData?.postCount)

    if (postCountData?.postCount > 5) {
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
            authorImage: profileImage || '',
            authorName: user?.displayName || '',
            authorEmail: user?.email || '',
            upVote: 0,
            downVote: 0,
        };

        try {
            await axios.post('http://localhost:5000/posts', postData);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Post added successfully',
                timer: 2000,
                showConfirmButton: false,
            });
            reset();
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

    const handleImage = async (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image)

        const imgUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imgUrl, formData)
        setProfileImage(res.data.data.url)

    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">📝 Add New Post</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <input
                    type="text"
                    {...register('authorName')}
                    defaultValue={user?.displayName || ''}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="file"
                    onChange={handleImage}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 cursor-pointer bg-gray-50"
                />

                <input
                    type="email"
                    {...register('authorEmail')}
                    defaultValue={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    {...register('postTitle', { required: true })}
                    placeholder="🖋️ Post Title"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.postTitle && <p className="text-red-500 text-sm">Post Title is required</p>}

                <textarea
                    {...register('postDescription', { required: true })}
                    placeholder="📄 Write your post description here..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
                {errors.postDescription && <p className="text-red-500 text-sm">Post Description is required</p>}

                <div>
                    <select
                        {...register('tag', { required: true })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                    >
                        <option value="" disabled>Select a tag</option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="nodejs">Node.js</option>
                        <option value="mongodb">MongoDB</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="mern">MERN Stack</option>
                    </select>
                    {errors.tag && <p className="text-red-500 text-sm mt-1">Tag is required</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 rounded-xl shadow-md"
                >
                    🚀 Add Post
                </button>
            </form>
        </div>

    );
};

export default AddPost;
