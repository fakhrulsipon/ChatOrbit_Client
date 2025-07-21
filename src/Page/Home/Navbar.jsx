
import { IoNotificationsOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/Provider';
import { use } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { logoutUser, user } = use(AuthContext)
  const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/'>Membership</NavLink></li>
  </>

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

  if (isLoading) return <span className="loading loading-bars loading-xl"></span>;
  if (isError) return <p>Something went wrong!</p>;


  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <span className="btn btn-ghost text-xl">Chatorbit</span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
          <div className="relative">
            <li><NavLink><IoNotificationsOutline size={25} /></NavLink></li>
            <span className="absolute left-7 bottom-3 font-bold">{announcementCount}</span>
          </div>
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><span className="font-semibold cursor-default">{user.displayName}</span></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to={'/login'} className="btn">Join Us</Link>
          )
        }
      </div>

    </div>
  );
};

export default Navbar;


