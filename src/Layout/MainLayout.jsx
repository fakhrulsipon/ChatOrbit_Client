
import { Outlet } from 'react-router';
import Navbar from '../Page/Home/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {

    return (
        <div className='bg-[#0B1120] min-h-screen flex flex-col justify-between text-[#CBD5E1]'>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;