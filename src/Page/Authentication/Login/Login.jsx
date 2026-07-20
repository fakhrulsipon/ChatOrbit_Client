import React, { use, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SociaLogin/SocialLogin';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff, HiSparkles } from 'react-icons/hi';
import Loginlottie from '../../../assets/loginLottie.json'
import Lottie from 'lottie-react';

import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { signUser } = use(AuthContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = 'Login | ChatOrbit';
    }, []);

    const performLogin = (email, password) => {
        signUser(email, password)
            .then(res => {
                toast.success(`Welcome Back, ${res.user.displayName || 'User'}! 👋`);
                navigate(location.state || '/');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed ❌',
                    text: error.message || 'Incorrect email or password.',
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
            });
    };

    const onSubmit = data => {
        performLogin(data.email, data.password);
    };

    const handleQuickAccess = (email, password) => {
        setValue('email', email);
        setValue('password', password);
        performLogin(email, password);
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-[#0B1120]">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 max-w-6xl w-full">
                
                {/* Form Container */}
                <div className="max-w-md w-full bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8A00]/5 to-transparent rounded-full filter blur-2xl"></div>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] text-[10px] font-bold uppercase tracking-wider mb-3 heading-display">
                            <HiSparkles className="w-3.5 h-3.5 text-[#FF5C5C]" />
                            Join the Orbit
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white heading-display tracking-tight">Login to Your Account</h1>
                        <p className="text-xs text-[#94A3B8] font-semibold mt-1">Explore discussions and connect globally</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">Email Address</label>
                            <input 
                                type="email" 
                                {...register('email', { required: true })} 
                                className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors" 
                                placeholder="name@email.com" 
                            />
                            {errors.email && <p className="text-red-500 font-bold text-xs">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
                                <a className="text-[10px] font-black text-[#FF8A00] hover:underline cursor-pointer">Forgot password?</a>
                            </div>
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
                            {errors.password?.type === 'required' && <p className="text-red-500 font-bold text-xs">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-500 font-bold text-xs">Password must be 8 characters or longer</p>}
                        </div>

                        {/* Login Button */}
                        <button 
                            style={{
                                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                            }}
                            className="w-full text-white font-extrabold text-sm py-4 rounded-xl border-none shadow-lg active:scale-98 transition-all duration-300 cursor-pointer mt-4"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Quick Access Recruiter Buttons */}
                    <div className="space-y-3 pt-3 border-t border-slate-900/60">
                        <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            — Quick Access for Recruiters —
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleQuickAccess('siponkhan@gmail.com', '12345678')}
                                className="btn btn-sm bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-xl font-bold py-2 text-xs flex-1 transition-all duration-300 cursor-pointer"
                            >
                                🔑 Demo User
                            </button>
                            <button
                                onClick={() => handleQuickAccess('sipon@gmail.com', '12345678')}
                                className="btn btn-sm bg-slate-900 hover:bg-slate-850 text-[#FF8A00] border border-[#FF8A00]/20 hover:border-[#FF8A00]/40 rounded-xl font-bold py-2 text-xs flex-1 transition-all duration-300 cursor-pointer"
                            >
                                🛡️ Demo Admin
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 text-center">
                        <p className="text-xs text-slate-450 font-semibold">
                            New to ChatOrbit? <Link className="text-[#FF8A00] font-black hover:underline" to="/register">Create an account</Link>
                        </p>
                    </div>

                    <SocialLogin location={location}></SocialLogin>
                </div>

                {/* Right: Lottie Animation */}
                <div className="w-full max-w-md hidden lg:block">
                    <Lottie animationData={Loginlottie} loop={true} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Login;