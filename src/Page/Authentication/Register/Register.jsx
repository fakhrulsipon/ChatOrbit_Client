import React, { use, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import SocialLogin from '../SociaLogin/SocialLogin';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff, HiSparkles } from 'react-icons/hi';
import Lottie from 'lottie-react';
import Loginlottie from '../../../assets/registerLottie.json'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, updateProfileInfo } = use(AuthContext);

    useEffect(() => {
        document.title = 'Register | ChatOrbit';
    }, []);

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
                };
                await axios.post('https://chatorbit-server.vercel.app/users', userInfo);

                // update user profile in firebase
                const updateProfile = {
                    displayName: data.name,
                    photoURL: profileImage
                };
                updateProfileInfo(updateProfile)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Welcome to ChatOrbit! 🎉',
                            text: 'Registration successful. Let\'s explore discussions!',
                            timer: 2500,
                            showConfirmButton: false,
                            background: '#1B2435',
                            color: '#FFFFFF'
                        });
                        navigate('/');
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: error.message || 'Failed to update profile details',
                            background: '#1B2435',
                            color: '#FFFFFF'
                        });
                    });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed ❌',
                    text: error.message || 'Failed to register account.',
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
            });
    };

    const handleImage = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setUploadingImage(true);

        const formData = new FormData();
        formData.append('image', image);

        try {
            const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const res = await axios.post(imgUrl, formData);
            setProfileImage(res.data.data.url);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Failed',
                text: 'Could not upload your profile image. Please try again.',
                background: '#1B2435',
                color: '#FFFFFF'
            });
        } finally {
            setUploadingImage(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-[#0B1120]">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 max-w-6xl w-full">
                
                {/* Form Wrapper */}
                <div className="max-w-md w-full bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF4D79]/5 to-transparent rounded-full filter blur-2xl"></div>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5C5C]/10 border border-[#FF5C5C]/25 text-[#FF5C5C] text-[10px] font-bold uppercase tracking-wider mb-3 heading-display">
                            <HiSparkles className="w-3.5 h-3.5" />
                            Start Your Journey
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white heading-display tracking-tight">Create Your Account</h1>
                        <p className="text-xs text-[#94A3B8] font-semibold mt-1">Join the community feed today</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold tracking-wider text-slate-405 uppercase">Your Name</label>
                            <input 
                                type="text" 
                                {...register('name', { required: true })} 
                                className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors" 
                                placeholder="Fakhrul Sipon" 
                            />
                            {errors.name?.type === 'required' && <p className="text-red-500 font-bold text-xs mt-1">Name is required</p>}
                        </div>

                        {/* Profile Photo */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold tracking-wider text-slate-405 uppercase">Profile Picture</label>
                            <input 
                                type="file" 
                                onChange={handleImage} 
                                className="w-full px-4 py-2 border rounded-xl text-slate-450 border-slate-800 bg-[#0B1120] text-xs font-semibold focus:outline-none file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1B2435] file:text-[#FF8A00] file:hover:opacity-90 file:cursor-pointer" 
                            />
                            {uploadingImage && <p className="text-[#FF8A00] text-xs animate-pulse">Uploading image details...</p>}
                            {profileImage && <p className="text-emerald-500 text-xs font-semibold">✓ Image uploaded successfully!</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold tracking-wider text-slate-405 uppercase">Email Address</label>
                            <input 
                                type="email" 
                                {...register('email', { required: true })} 
                                autoComplete="off" 
                                className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors" 
                                placeholder="name@email.com" 
                            />
                            {errors.email?.type === 'required' && <p className="text-red-500 font-bold text-xs mt-1">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold tracking-wider text-slate-405 uppercase">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: true, minLength: 8 })}
                                    className="w-full px-4 py-3 pr-10 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
                                    placeholder="••••••••"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3.5 cursor-pointer text-slate-500 hover:text-white transition-colors text-lg"
                                >
                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                </span>
                            </div>
                            {errors.password?.type === 'required' && <p className="text-red-500 font-bold text-xs mt-1">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-500 font-bold text-xs mt-1">Password must be 8 characters or longer</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold tracking-wider text-slate-405 uppercase">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword', {
                                        required: true,
                                        validate: value => value === watch('password') || "Passwords do not match"
                                    })}
                                    className="w-full px-4 py-3 pr-10 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
                                    placeholder="••••••••"
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-3.5 cursor-pointer text-slate-500 hover:text-white transition-colors text-lg"
                                >
                                    {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 font-bold text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Register Button */}
                        <button 
                            type="submit"
                            style={{
                                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                            }}
                            className="w-full text-white font-extrabold text-sm py-4 rounded-xl border-none shadow-lg active:scale-98 transition-all duration-300 cursor-pointer mt-4"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="pt-2 text-center border-t border-slate-900/60">
                        <p className="text-xs text-slate-450 font-semibold">
                            Already have an account? <Link className="text-[#FF8A00] font-black hover:underline" to="/login">Sign in</Link>
                        </p>
                    </div>

                    <SocialLogin></SocialLogin>
                </div>

                {/* Right: Lottie Animation */}
                <div className="w-full max-w-md hidden lg:block">
                    <Lottie animationData={Loginlottie} loop={true} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Register;