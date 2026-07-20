import { IoNotificationsOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/Provider';
import { use, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { logoutUser, user } = use(AuthContext)
  const [imgLoaded, setImgLoaded] = useState(false);

  const ActiveLinks = ({ isActive }) =>
    isActive
      ? "text-[#FF8A00] font-semibold heading-display pb-1.5 transition-all duration-200"
      : "text-slate-400 hover:text-[#FF8A00] font-medium pb-1.5 transition-all duration-200";

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

  const { data: announcementCount = 0, isLoading } = useQuery({
    queryKey: ['announcementCount'],
    queryFn: async () => {
      const res = await axios.get('https://chatorbit-server.vercel.app/announcement-count');
      return res.data.count;
    }
  });

  return (
    <div className="navbar px-4 md:px-12 lg:px-8 xl:px-16 bg-[#0B1120]/80 w-full sticky top-0 z-50 backdrop-blur-md border-b border-slate-900 shadow-sm transition-all duration-300">
      <div className="navbar-start flex items-center">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-slate-900 rounded-xl transition-all mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-350" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-950/95 backdrop-blur-md rounded-2xl z-50 mt-3 w-56 p-3 shadow-2xl border border-slate-900 gap-2 font-medium text-slate-200"
          >
            <li><NavLink to='/' className={ActiveLinks}>Home</NavLink></li>
            {
              user && (
                <li><NavLink to='/membership' className={ActiveLinks}>Membership</NavLink></li>
              )
            }
            <li><NavLink to='/about' className={ActiveLinks}>About</NavLink></li>
            <li><NavLink to='/blogs' className={ActiveLinks}>Blogs</NavLink></li>
            <li><NavLink to='/privacy' className={ActiveLinks}>Privacy Policy</NavLink></li>

            <div className="relative mt-2 pt-2 border-t border-slate-800 flex items-center justify-between px-3">
              <span className="text-sm font-semibold text-slate-400">Notifications</span>
              <div className="relative">
                <NavLink to="#" className="text-slate-400 hover:text-[#FF8A00] transition-colors">
                  <IoNotificationsOutline size={24} />
                </NavLink>
                {!isLoading && announcementCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold bg-[#FF5C5C] text-white w-4 h-4 flex items-center justify-center rounded-full">
                    {announcementCount}
                  </span>
                )}
              </div>
            </div>
          </ul>
        </div>

        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity">
          {/* Premium SVG Logo Icon */}
          <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8A00" />
                <stop offset="50%" stopColor="#FF5C5C" />
                <stop offset="100%" stopColor="#FF4D79" />
              </linearGradient>
            </defs>
            {/* Background planet glow */}
            <circle cx="50" cy="50" r="16" fill="url(#logoGrad)" opacity="0.25" />
            {/* Outer Orbit Ring */}
            <ellipse cx="50" cy="50" rx="36" ry="12" stroke="url(#logoGrad)" strokeWidth="3.5" transform="rotate(-30 50 50)" opacity="0.8" />
            {/* Inner Planet */}
            <circle cx="50" cy="50" r="18" fill="url(#logoGrad)" />
            {/* Little Orbiting Satellites / Chat Nodes */}
            <circle cx="22" cy="34" r="5" fill="#FFFFFF" />
            <circle cx="78" cy="66" r="4.5" fill="#FF4D79" />
          </svg>
          <span className="text-xl font-extrabold heading-display tracking-tight text-white flex items-center">
            Chat<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF5C5C]">Orbit</span>
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 items-center">
          <li><NavLink to='/' className={ActiveLinks}>Home</NavLink></li>
          {
            user && (
              <li><NavLink to='/membership' className={ActiveLinks}>Membership</NavLink></li>
            )
          }
          <li><NavLink to='/about' className={ActiveLinks}>About</NavLink></li>
          <li><NavLink to='/blogs' className={ActiveLinks}>Blogs</NavLink></li>
          <li><NavLink to='/privacy' className={ActiveLinks}>Privacy Policy</NavLink></li>
          
          <div className="relative ml-2 flex items-center">
            <NavLink to="#" className="text-slate-400 hover:text-[#FF8A00] transition-all p-1.5 hover:bg-slate-900 rounded-xl">
              <IoNotificationsOutline size={25} />
            </NavLink>
            {
              isLoading ? (
                <span className="absolute -top-1 -right-1 loading loading-spinner loading-xs text-orange-500"></span>
              ) : (
                announcementCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] font-black bg-[#FF5C5C] text-white w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-slate-950">
                    {announcementCount}
                  </span>
                )
              )
            }
          </div>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {
          user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-slate-900 transition-all relative">
                <div className="w-10 h-10 rounded-full border border-slate-800 overflow-hidden relative">
                  {!imgLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <span className="loading loading-spinner loading-xs text-orange-400"></span>
                    </div>
                  )}
                  <img
                    src={user?.photoURL || "/unknown.jpg"}
                    alt="user"
                    className="hover:scale-105 transition-transform w-full h-full object-cover"
                    onLoad={() => setImgLoaded(true)} 
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-2xl bg-slate-900 border border-slate-850 rounded-2xl w-56 font-medium text-slate-300"
              >
                <li className="px-3 py-2 border-b border-slate-800">
                  <span className="font-semibold text-white truncate cursor-default block p-0">{user.displayName}</span>
                </li>
                <li className="mt-1"><Link to="/dashboard" className="hover:bg-slate-800 rounded-xl px-3 py-2.5">Dashboard</Link></li>
                <li><button onClick={handleLogout} className="hover:bg-rose-950/40 hover:text-rose-450 rounded-xl px-3 py-2.5 text-left w-full mt-1">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to={'/login'} className="btn bg-gradient-to-r from-[#FF8A00] via-[#FF5C5C] to-[#FF4D79] text-white border-none font-bold px-6 h-10 min-h-[2.5rem] rounded-xl shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer">
              Join Us
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
