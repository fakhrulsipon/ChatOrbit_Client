
import { Outlet } from 'react-router';
import Navbar from '../Page/Home/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {

    return (
        <div className='bg-gradient-to-br from-[#080c14] via-[#0b0f19] to-[#080c14] min-h-screen flex flex-col justify-between text-slate-100'>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;