import React, { use } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const SocialLogin = ({location}) => {
    const { googleSignIn } = use(AuthContext)
    const navigate = useNavigate();
    const handleGoogle = () => {
        googleSignIn()
            .then(async (res) => {
                // update userinfo in the database
                const userInfo = {
                    uid: res.user.uid,
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL || null,
                    role: 'user',
                    isMember: false,
                    badges: ['bronze'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }

                await axios.post('http://localhost:5000/users', userInfo)
              

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${res.user.displayName}!`,
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            })
    }
    return (
        <div className='text-center'>
            <p className='mb-4'>OR</p>
            {/* Google */}
            <button onClick={handleGoogle} className="btn w-full bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>

        </div>
    );
};

export default SocialLogin;