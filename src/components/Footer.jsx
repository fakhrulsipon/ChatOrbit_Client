import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Footer = () => {
    const links = (
        <>

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-400 font-bold border-b-2 border-blue-400"
                        : "text-gray-700"
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/membership"
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-400 font-bold border-b-2 border-blue-400"
                        : "text-gray-700"
                }
            >
                Membership
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-400 font-bold border-b-2 border-blue-400"
                        : "text-gray-700"
                }
            >
                About
            </NavLink>

            <NavLink
                to="/blogs"
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-400 font-bold border-b-2 border-blue-400"
                        : "text-gray-700"
                }
            >
                Blogs
            </NavLink>

            <NavLink
                to="/privacy"
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-400 font-bold border-b-2 border-blue-400"
                        : "text-gray-700"
                }
            >
                Privacy Policy
            </NavLink>


        </>
    );
    return (
        <footer className="footer footer-horizontal footer-center bg-white text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                {links}
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-6 text-3xl">
                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/profile.php?id=100064008810904"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                    >
                        <FaFacebook />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="hover:text-blue-500 cursor-not-allowed"
                        title="LinkedIn account not available"
                    >
                        <FaLinkedin />
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/fakhrulsipon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500"
                    >
                        <FaGithub />
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Fakhrul Islam Sipon</p>
            </aside>
        </footer>
    );
};

export default Footer;