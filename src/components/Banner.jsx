import React, { useState } from 'react';

const Banner = ({onSearch}) => {
     const [tagInput, setTagInput] = useState('');
    return (
       <div className="p-6 text-center bg-gradient-to-r from-green-100 to-white mb-6">
            <h2 className="text-xl font-bold mb-2">Search Posts by Tag</h2>
            <div className="flex justify-center gap-2">
                <input
                    type="text"
                    placeholder="Enter a tag to filter posts"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="input input-bordered w-64"
                />
                <button
                    onClick={() => onSearch(tagInput)}
                    className="btn btn-success"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Banner;