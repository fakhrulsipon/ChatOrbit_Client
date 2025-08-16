
import { Outlet } from 'react-router';
import Navbar from '../Page/Home/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {

    return (
        <div className='bg-gradient-to-r from-blue-50 to-blue-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;