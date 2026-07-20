import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Banner = ({ onSearch }) => {
    const [tagInput, setTagInput] = useState('');
    return (
        <div className="relative overflow-hidden lg:p-16 p-8 rounded-[2rem] mb-6 bg-slate-900/30 border border-slate-800/80 shadow-2xl lg:w-10/12 xl:w-9/12 mx-auto text-center">
            {/* Decorative background glow elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full filter blur-3xl -z-10 translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-full filter blur-3xl -z-10 -translate-x-12 translate-y-12"></div>

            {/* Welcome & Info Text */}
            <h1 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-orange-400 via-amber-400 to-rose-500 bg-clip-text text-transparent mb-4 tracking-tight">
                Welcome to Our Forum
            </h1>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed font-medium">
                Here you can easily find posts by using <span className="font-semibold text-orange-400 bg-orange-950/30 px-2 py-0.5 rounded-md border border-orange-900/20">tags</span>.
                Explore community discussions, tips, and shared knowledge by filtering posts with the tag you’re interested in.
            </p>

            <h2 className="text-xl font-bold text-slate-200 mb-5 tracking-tight">Search Posts by Tag</h2>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row justify-center items-center gap-3">
                <div className="relative w-full sm:flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-505 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Enter a tag to filter posts"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="input bg-slate-950 hover:bg-slate-900 focus:bg-slate-950 text-slate-100 border border-slate-800/80 focus:border-orange-500 w-full rounded-full pl-11 pr-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-orange-950/40 transition-all duration-300 text-sm font-medium"
                    />
                </div>
                <button
                    onClick={() => onSearch(tagInput)}
                    className="btn bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-450 hover:to-rose-450 text-white font-semibold px-8 h-12 rounded-full border-none shadow-md shadow-orange-500/10 hover:shadow-lg active:scale-95 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Banner;