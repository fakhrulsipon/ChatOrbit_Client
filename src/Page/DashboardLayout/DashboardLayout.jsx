import { Link, NavLink, Outlet } from 'react-router';
import useUserRole from '../../hook/useUserRole';
import Logo from '../../components/Logo';
import { FaBullhorn, FaChartBar, FaList, FaPlus, FaUser, FaUsers, FaUserShield } from 'react-icons/fa';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 text-white bg-blue-400 px-4 py-2 rounded-md font-semibold"
      : "flex items-center gap-2 text-gray-700 hover:text-blue-500 px-4 py-2 rounded-md";


  return (
    <div className="drawer lg:drawer-open bg-gradient-to-r from-blue-50 to-blue-100">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
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
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        {/* Page content here */}
        <div className="min-h-screen">
          <Outlet />
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side">

        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-gradient-to-t from-blue-200 via-blue-100 to-white text-base-content min-h-full w-80 p-4 gap-4 
              shadow-xl border-r border-blue-300">

          <Link className='flex justify-center items-center' to={'/'}>
            <img className='w-12 h-12' src={'/Chatorbit.png'} alt="Logo" />
            <span className=" text-2xl text-black font-bold tracking-wider">Chatorbit</span>
          </Link>

          {/* Sidebar content here */}


          {/* user and member route link */}
          {
            !roleLoading && (role === 'user' || role === 'member') && (
              <>
                <li><NavLink className={linkClass} to={'/dashboard/myProfile'}><FaUser></FaUser> My Profile</NavLink></li>
                <li><NavLink className={linkClass} to={'/dashboard/addPost'}><FaPlus></FaPlus> Add Post</NavLink></li>
                <li><NavLink className={linkClass} to={'/dashboard/myPost'}><FaList></FaList> My Post</NavLink></li>
              </>
            )
          }

          {/* admin route Link */}
          {
            !roleLoading && role === 'admin' && <>

              <li><NavLink className={linkClass} to={'/dashboard/adminProfile'}><FaUserShield></FaUserShield> Admin Profile</NavLink></li>
              <li><NavLink className={linkClass} to={'/dashboard/manageUsers'}><FaUsers></FaUsers> Manage Users</NavLink></li>
              <li><NavLink className={linkClass} to={'/dashboard/activities'}><FaChartBar></FaChartBar> Activities</NavLink></li>
              <li><NavLink className={linkClass} to={'/dashboard/announcement'}><FaBullhorn></FaBullhorn> Make Announcement</NavLink></li>
            </>
          }

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;