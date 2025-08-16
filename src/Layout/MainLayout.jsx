
import { Outlet } from 'react-router';
import Navbar from '../Page/Home/Navbar';

const MainLayout = () => {

    return (
        <div className='bg-gradient-to-r from-blue-50 to-blue-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;