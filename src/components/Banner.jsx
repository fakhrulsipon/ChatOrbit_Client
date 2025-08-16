import React, { useState } from 'react';

const Banner = ({onSearch}) => {
     const [tagInput, setTagInput] = useState('');
    return (
       <div className="lg:p-16 p-8 rounded-xl mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-white shadow-md lg:w-9/12 mx-auto">
            <h2 className="text-2xl font-extrabold text-blue-400 mb-4 tracking-wide text-center">Search Posts by Tag</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <input
                    type="text"
                    placeholder="Enter a tag to filter posts"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="input border-2 border-blue-400 w-full sm:w-72 rounded-full px-5 focus:outline-none focus:ring-0"
                />
                <button
                    onClick={() => onSearch(tagInput)}
                    className="btn bg-blue-400 hover:bg-blue-500 text-white px-6 rounded-full"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Banner;