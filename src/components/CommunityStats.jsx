import React from 'react';
import { HiUsers, HiChatAlt, HiFire, HiBadgeCheck } from 'react-icons/hi';

const CommunityStats = () => {
    const stats = [
        {
            id: 1,
            label: "Active Orbiters",
            value: "54K+",
            description: "A growing community of thinkers, creators, and developers sharing expertise.",
            icon: HiUsers,
            color: "from-blue-500 to-indigo-500",
            shadowColor: "rgba(59, 130, 246, 0.15)",
        },
        {
            id: 2,
            label: "Discussions Shared",
            value: "128K+",
            description: "Fascinating threads across development, design, science, and creative arts.",
            icon: HiChatAlt,
            color: "from-purple-500 to-pink-500",
            shadowColor: "rgba(168, 85, 247, 0.15)",
        },
        {
            id: 3,
            label: "Upvotes Cast",
            value: "890K+",
            description: "Rewarding valuable content and keeping our feeds loaded with high-quality posts.",
            icon: HiFire,
            color: "from-amber-500 to-rose-500",
            shadowColor: "rgba(245, 158, 11, 0.15)",
        },
        {
            id: 4,
            label: "Badges Awarded",
            value: "15K+",
            description: "Gamified reward achievements celebrating active contributions and helpful replies.",
            icon: HiBadgeCheck,
            color: "from-emerald-500 to-teal-500",
            shadowColor: "rgba(16, 185, 129, 0.15)",
        }
    ];

    return (
        <div className="mt-4 sm:mt-6 px-4 md:px-12 lg:px-8 xl:px-16">
            {/* Section Header */}
            <div className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
                    📊 ChatOrbit by the Numbers
                </h2>
                <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                    Our platform is expanding rapidly. See how our community connects, collaborates, and creates conversations every single day.
                </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            style={{ '--glow-color': stat.shadowColor }}
                            className="group relative bg-slate-900/30 backdrop-blur-md border border-slate-850/80 p-6 lg:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_var(--glow-color)] hover:border-slate-700/60 flex flex-col justify-between overflow-hidden"
                        >
                            {/* Ambient background glow inside card */}
                            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity duration-500`}></div>

                            <div>
                                {/* Icon Header */}
                                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-6 shadow-lg shadow-orange-950/20 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-6 h-6" />
                                </div>

                                {/* Value & Label */}
                                <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-bold text-slate-300 mb-3 group-hover:text-orange-400 transition-colors duration-200">
                                    {stat.label}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-xs lg:text-sm text-slate-450 leading-relaxed font-medium mt-2">
                                {stat.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommunityStats;
