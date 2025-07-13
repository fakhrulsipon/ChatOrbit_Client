import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SociaLogin/SocialLogin';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signUser } = use(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
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
        <div className="max-w-sm w-full mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                <label className="label">Email</label>
                <input type="email" {...register('email')} autoComplete="off" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input type="password" {...register('password', { required: true, minLength: 8 })} className="input" placeholder="Password" />
                {
                    errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>
                }
                {
                    errors.password?.type === 'minLength' && <p className='text-red-600'>password must be 8 character or longer</p>
                }

                <div><a className="link link-hover">Forgot password?</a></div>

                <button className="py-2 font-semibold rounded-md btn-neutral bg-[#CAEB66] text-black border-none mt-4">Login</button>
            </form>
            <p>Are you new this site? please <Link className='underline text-[#8FA748] font-bold' to='/register'>Register</Link></p>
            <SocialLogin location={location}></SocialLogin>
        </div>
    );
};

export default Login;