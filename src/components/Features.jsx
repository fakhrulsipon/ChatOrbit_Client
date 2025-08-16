import React from 'react';

const Features = () => {
    return (

        <div className="mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16">
            {/* Section Title */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                    🌟 Our Key Features
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover what makes our community unique. Engage, share, and grow
                    with features built to connect you with like-minded people.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">📢 Share Your Thoughts</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Post your ideas, stories, and experiences to spark meaningful discussions with others.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                    <h3 className="text-2xl font-semibold mb-4 text-green-600">👍 Vote & Comment</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Engage with posts by upvoting, downvoting, and leaving constructive feedback.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-600">🏆 Earn Badges</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Gain recognition and rewards as you contribute and grow within the community.
                    </p>
                </div>
            </div>
        </div>


    );
};

export default Features;