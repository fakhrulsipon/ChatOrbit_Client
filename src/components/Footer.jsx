import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Footer = () => {
    const ActiveLinks = ({ isActive }) =>
        isActive
            ? "text-[#FF8A00] font-bold transition-all duration-200"
            : "text-slate-400 hover:text-[#FF8A00] transition-all duration-200";

    return (
        <footer className="w-full bg-[#0B1120] border-t border-slate-900 py-12 mt-16 px-4 md:px-12 lg:px-8 xl:px-16">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
                {/* Logo & copyright */}
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span className="text-xl text-white font-extrabold heading-display tracking-tight">Chatorbit</span>
                    <p className="text-xs text-slate-500">
                        Copyright © {new Date().getFullYear()} - All rights reserved by Fakhrul Islam Sipon
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
                    <NavLink to="/" className={ActiveLinks}>Home</NavLink>
                    <NavLink to="/membership" className={ActiveLinks}>Membership</NavLink>
                    <NavLink to="/about" className={ActiveLinks}>About</NavLink>
                    <NavLink to="/blogs" className={ActiveLinks}>Blogs</NavLink>
                    <NavLink to="/privacy" className={ActiveLinks}>Privacy Policy</NavLink>
                </nav>

                {/* Social Links */}
                <div className="flex items-center gap-5 text-xl">
                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/profile.php?id=100064008810904"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-[#FF8A00] transition-colors"
                        title="Facebook"
                    >
                        <FaFacebook />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="text-slate-600 cursor-not-allowed hover:text-slate-500 transition-colors"
                        title="LinkedIn account not available"
                        onClick={(e) => e.preventDefault()}
                    >
                        <FaLinkedin />
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/fakhrulsipon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-505 hover:text-white transition-colors"
                        title="GitHub"
                    >
                        <FaGithub />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;