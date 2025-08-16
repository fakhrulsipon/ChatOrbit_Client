import React from 'react';

const Join = () => {
    return (
        <div className="relative mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16 text-center text-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl"></div>

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                    Ready to Join? 🚀
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
                    Become part of an <span className="font-semibold text-yellow-300">active community</span>
                    and start contributing today. Your voice matters here!
                </p>

                <button className="px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-gray-100 transition duration-300 ease-in-out">
                    Sign Up Now
                </button>
            </div>

            {/* Decorative gradient circles */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-400/20 rounded-full blur-3xl"></div>
        </div>

    );
};

export default Join;