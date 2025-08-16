
import { Outlet } from 'react-router';
import Navbar from '../Page/Home/Navbar';

const MainLayout = () => {

    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;