
import { IoNotificationsOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/Provider';
import { use } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { logoutUser, user } = use(AuthContext)

  const ActiveLinks = ({ isActive }) =>
    isActive
      ? "text-blue-400 border-b-2 border-blue-400  font-medium transition-all duration-200"
      : "hover:text-blue-400 font-medium transition-all duration-200";


  const handleLogout = async () => {
    try {
      await logoutUser();
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'You have been logged out successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: error.message || 'Something went wrong.',
      });
    }
  };



  const { data: announcementCount = 0, isLoading, isError } = useQuery({
    queryKey: ['announcementCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/announcement-count');
      return res.data.count;
    }
  });


  if (isError) return <p>Something went wrong!</p>;


  return (
    <div className="navbar px-4 md:px-12 lg:px-8 xl:px-16 bg-white w-full sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow-xl border border-white/10 gap-2">
            <li><NavLink to='/' className={ActiveLinks}>Home</NavLink></li>
            <li><NavLink to='/membership' className={ActiveLinks}>Membership</NavLink></li>

            <div className="relative group">
              <li className="hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-200 hover:scale-105">
                <NavLink>
                  <IoNotificationsOutline size={27} className="text-black group-hover:text-purple-200" />
                </NavLink>
              </li>
              {
                isLoading ? (
                  <span className="absolute left-7 bottom-3 loading loading-spinner loading-xs text-white"></span>
                ) : (
                  <span className="absolute left-8 bottom-5 text-xs bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
                    {announcementCount}
                  </span>
                )
              }
            </div>

          </ul>
        </div>
        <div className="flex items-center gap-2">
          <span className=" text-3xl text-black font-bold tracking-wider">Chatorbit</span>
          <img className='w-12 h-12' src={'/Chatorbit.png'} alt="Logo" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 items-center">
          <li><NavLink to='/' className={ActiveLinks}>Home</NavLink></li>
          <li><NavLink to='/membership' className={ActiveLinks}>Membership</NavLink></li>
          <div className="relative group">
            <li className="hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-200 hover:scale-105">
              <NavLink>
                <IoNotificationsOutline size={27} className="text-black" />
              </NavLink>
            </li>
            {
              isLoading ? (
                <span className="absolute left-7 bottom-3 loading loading-spinner loading-xs text-white"></span>
              ) : (
                <span className="absolute left-8 bottom-6 text-xs bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
                  {announcementCount}
                </span>
              )
            }
          </div>
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 ring-white/50 transition-all">
                <div className="w-10 rounded-full ring-2 ring-white/50 hover:ring-purple-300 transition-all">
                  <img src={user?.photoURL || '/unknown.jpg'} alt="user" className="hover:scale-110 transition-transform" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white text-black rounded-box w-52"
              >
                <li className="hover:bg-blue-400 rounded-lg"><span className="font-medium hover:text-white text- cursor-default">{user.displayName}</span></li>
                <li className="hover:bg-blue-400 rounded-lg"><Link to="/dashboard" className=" hover:text-white">Dashboard</Link></li>
                <li className="hover:bg-blue-400 rounded-lg"><button onClick={handleLogout} className=" hover:text-white">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to={'/login'} className="btn bg-white text-purple-900 hover:bg-purple-200 hover:scale-105 transform transition-all font-bold border-none shadow-lg">
              Join Us
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;


