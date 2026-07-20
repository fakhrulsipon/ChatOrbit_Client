import React from 'react';

const Features = () => {
    return (
        <div className="mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16">
            {/* Section Title */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
                    🌟 Our Key Features
                </h2>
                <p className="text-lg text-slate-450 max-w-2xl mx-auto">
                    Discover what makes our community unique. Engage, share, and grow
                    with features built to connect you with like-minded people.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {/* Card 1 */}
                <div className="group bg-slate-900/30 backdrop-blur-md border border-slate-850/80 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">📢</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-405 transition-colors duration-200">Share Your Thoughts</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Post your ideas, stories, and experiences to spark meaningful discussions with others.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="group bg-slate-900/30 backdrop-blur-md border border-slate-855/80 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">👍</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-405 transition-colors duration-200">Vote & Comment</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Engage with posts by upvoting, downvoting, and leaving constructive feedback.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="group bg-slate-900/30 backdrop-blur-md border border-slate-850/80 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🏆</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-405 transition-colors duration-200">Earn Badges</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Gain recognition and rewards as you contribute and grow within the community.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="group bg-slate-900/30 backdrop-blur-md border border-slate-850/80 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🔒</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-rose-405 transition-colors duration-200">Secure & Private</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Your data and interactions are protected, ensuring a safe and trusted environment for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;
