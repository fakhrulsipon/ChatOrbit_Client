import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import axios from 'axios';
import SocialLogin from '../SociaLogin/SocialLogin';
import { AuthContext } from '../../../Provider/Provider';
import Swal from 'sweetalert2';


const Register = () => {
    const [profileImage, setProfileImage] = useState('');
    console.log("profileimage", profileImage)
    const { register, handleSubmit, formState: { errors } } = useForm()
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

        const imgUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imgUrl, formData)
        setProfileImage(res.data.data.url)

    }
    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold">Create An Account</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-600'>name is required</p>
                        }

                        <label className="label">Your Photo</label>
                        <input type="file" onChange={handleImage} className="input" placeholder="Your Profile Picture" />

                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} autoComplete="off" className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-600'>email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 8 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-600'>password must be 8 character or longer</p>
                        }

                        <button className="py-2 font-semibold rounded-md btn-neutral bg-[#CAEB66] text-black border-none mt-4">Register</button>
                    </fieldset>
                </form>
                <p>Already have an account? please <Link className='underline text-[#8FA748] font-bold' to='/login'>Login</Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default Register;