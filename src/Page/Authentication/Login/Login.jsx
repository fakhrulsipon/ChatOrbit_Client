import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SociaLogin/SocialLogin';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Loginlottie from '../../../assets/loginLottie.json'
import Lottie from 'lottie-react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { signUser } = use(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data)
        signUser(data.email, data.password)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${res.user.displayName || 'User'}!`,
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || 'Something went wrong!'
                });
            })

    }
    return (
        <div className=' min-h-screen flex items-center justify-center px-4 py-12'>

            <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-12 max-w-6xl w-full'>
                <div className="max-w-sm w-full bg-white mx-auto p-8 rounded-2xl transition-all duration-300 space-y-6 mt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                        <h1 className='text-3xl font-bold text-center text-blue-400'>Login to Your Account</h1>
                        <p className="text-center text-gray-500 text-sm mt-1">We're happy to see you again</p>
                        <label className="label font-semibold text-gray-700">Email</label>
                        <input type="email" {...register('email')} autoComplete="off" className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" placeholder="Email" />

                        <label className="label font-semibold text-gray-700">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { required: true, minLength: 8 })}
                                className="input w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
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
                            errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-600'>password must be 8 character or longer</p>
                        }

                        <div><a className="link link-hover text-sm text-gray-500 hover:text-blue-600">Forgot password?</a></div>

                        <button className="w-full py-2 font-semibold bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 mt-4">Login</button>
                    </form>
                    <p className='text-center text-gray-600 text-sm'>Are you new this site? please <Link className='underline text-blue-400 font-bold hover:text-blue-500' to='/register'>Register</Link></p>
                    <SocialLogin location={location}></SocialLogin>
                </div>
                {/* ✅ Right: Responsive Lottie Animation */}
                <div className="w-full max-w-md">
                    <Lottie animationData={Loginlottie} loop={true} style={{ width: '100%', height: '100%' }} />
                </div>

            </div>

        </div>
    );
};

export default Login;