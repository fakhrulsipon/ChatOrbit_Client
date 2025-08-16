import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import SocialLogin from '../SociaLogin/SocialLogin';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Lottie from 'lottie-react';
import Loginlottie from '../../../assets/registerLottie.json'


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { createUser, updateProfileInfo } = use(AuthContext);
    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(async (res) => {
                // update userinfo in the database
                const userInfo = {
                    uid: res.user.uid,
                    name: data.name,
                    email: res.user.email,
                    photoURL: profileImage || null,
                    role: 'user',
                    isMember: false,
                    badges: ['bronze'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
                await axios.post('http://localhost:5000/users', userInfo)

                // update user profile in firebase
                const updateProfile = {
                    displayName: data.name,
                    photoURL: profileImage
                }
                updateProfileInfo(updateProfile)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            text: 'Welcome to the site, ' + data.name + '!',
                            timer: 2500,
                            showConfirmButton: false
                        });
                        navigate('/')
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: error.message || 'Failed to update profile image and name'
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message || 'Something went wrong during registration'
                });
            })
    }

    const handleImage = async (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image)

        const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imgUrl, formData)
        setProfileImage(res.data.data.url)

    }
    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-12'>

            <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-12 max-w-6xl w-full'>

                <div className="max-w-sm w-full mx-auto p-4  rounded-2xl transition-all duration-300 mt-6 bg-white">
                    <h1 className="text-3xl font-bold text-center text-blue-400">Create Your Account</h1>
                    <p className="text-center text-gray-500 text-sm mt-1">Join us and start your journey today</p>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">

                                <label className="label font-semibold text-gray-700">Name</label>
                                <input type="text" {...register('name', { required: true })} className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" placeholder="Name" />
                                {
                                    errors.name?.type === 'required' && <p className='text-red-600'>name is required</p>
                                }

                                <label className="label font-semibold text-gray-700">Your Photo</label>
                                <input type="file" onChange={handleImage} className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" placeholder="Your Profile Picture" />

                                <label className="label font-semibold text-gray-700">Email</label>
                                <input type="email" {...register('email', { required: true })} autoComplete="off" className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" placeholder="Email" />
                                {
                                    errors.email?.type === 'required' && <p className='text-red-600'>email is required</p>
                                }

                                <label className="label font-semibold text-gray-700">Password</label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', { required: true, minLength: 8 })}
                                        className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                        placeholder="Password"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 z-50 top-3 cursor-pointer text-gray-600 text-xl"
                                    >
                                        {showPassword ? <HiEyeOff /> : <HiEye />}
                                    </span>
                                </div>

                                {
                                    errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className='text-red-600'>password must be 8 character or longer</p>
                                }

                                {/* confirm password */}
                                <label className="label font-semibold text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register('confirmPassword', {
                                            required: true,
                                            validate: value => value === watch('password') || "Passwords do not match"
                                        })}
                                        className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                        placeholder="Confirm Password"
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 z-50 top-3 cursor-pointer text-gray-600 text-xl"
                                    >
                                        {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                                    </span>
                                </div>
                                {
                                    errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message}</p>
                                }

                                <button className="w-full py-2 font-semibold bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 mt-4">Register</button>
                            </fieldset>
                        </form>
                        <p className='text-center text-gray-600 text-sm'>Already have an account? please <Link className='underline text-blue-400 font-bold hover:text-blue-500' to='/login'>Login</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>

                {/* ✅ Right: Responsive Lottie Animation */}
                <div className="w-full max-w-md">
                    <Lottie animationData={Loginlottie} loop={true} style={{ width: '100%', height: '100%' }} />
                </div>

            </div>

        </div>

    );
};

export default Register;