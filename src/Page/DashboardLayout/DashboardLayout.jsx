import { Link, NavLink, Outlet } from 'react-router';
import useUserRole from '../../hook/useUserRole';
import { FaBullhorn, FaChartBar, FaChartPie, FaList, FaPlus, FaUser, FaUsers, FaUserShield } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 text-white bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] px-4 py-2.5 rounded-xl font-bold heading-display shadow-md shadow-orange-500/10 transition-all duration-300"
      : "flex items-center gap-3 text-slate-400 hover:text-[#FF8A00] hover:bg-slate-900/40 px-4 py-2.5 rounded-xl font-medium transition-all duration-300";

  return (
    <div className="drawer lg:drawer-open bg-[#0B1120] text-[#CBD5E1]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Mobile Navbar */}
        <div className="navbar bg-[#131C2E] border-b border-slate-800/80 w-full lg:hidden px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-[#1B2435] text-slate-350">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 text-white font-bold heading-display">ChatOrbit Dashboard</div>
        </div>

        {/* Page content here */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        
        {/* Sidebar container */}
        <div className="min-h-full w-80 bg-[#131C2E] border-r border-slate-800/80 p-8 flex flex-col justify-between">
          <div>
            {/* Branding Logo */}
            <Link className="flex items-center justify-center gap-2 mb-12 hover:scale-[1.02] transition-transform" to="/">
              <img className="w-10 h-10" src="/Chatorbit.png" alt="Logo" />
              <span className="text-xl text-white font-extrabold tracking-tight heading-display">Chatorbit</span>
            </Link>

            {/* Menu Links */}
            <ul className="menu p-0 gap-2.5">
              <li>
                <NavLink end className={linkClass} to="/dashboard">
                  <FaChartPie className="w-4 h-4" />
                  Overview
                </NavLink>
              </li>

              {/* User / Member routes */}
              {!roleLoading && (role === 'user' || role === 'member') && (
                <>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/myProfile">
                      <FaUser className="w-4 h-4" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/addPost">
                      <FaPlus className="w-4 h-4" />
                      Add Post
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/myPost">
                      <FaList className="w-4 h-4" />
                      My Posts
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin routes */}
              {!roleLoading && role === 'admin' && (
                <>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/adminProfile">
                      <FaUserShield className="w-4 h-4" />
                      Admin Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/manageUsers">
                      <FaUsers className="w-4 h-4" />
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/activities">
                      <FaChartBar className="w-4 h-4" />
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={linkClass} to="/dashboard/announcement">
                      <FaBullhorn className="w-4 h-4" />
                      Make Announcement
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Sidebar Footer info */}
          <div className="pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[10px] text-slate-550 font-bold uppercase tracking-widest">ChatOrbit Dashboard v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;