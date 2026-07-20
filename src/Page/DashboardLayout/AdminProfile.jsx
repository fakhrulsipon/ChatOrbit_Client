import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import Swal from 'sweetalert2';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { HiSparkles, HiTag } from 'react-icons/hi';

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext);
    const [tagName, setTagName] = useState('');

    useEffect(() => {
        document.title = 'Admin Profile | ChatOrbit';
    }, []);

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading admin profile...</p>
            </div>
        );
    }

    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tagName.trim()) return;

        try {
            const res = await axiosSecure.post("/tag", { tag: tagName });
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success! 🎉",
                    text: "Tag added successfully!",
                    icon: "success",
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
                setTagName('');
            }
        } catch (error) {
            if (error.response?.status === 409) {
                Swal.fire({
                    title: "Duplicate Tag ⚠️",
                    text: "This tag already exists in ChatOrbit!",
                    icon: "warning",
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
            } else {
                Swal.fire({
                    title: "Error ❌",
                    text: "Failed to create tag. Please try again.",
                    icon: "error",
                    background: '#1B2435',
                    color: '#FFFFFF',
                    confirmButtonColor: '#FF8A00'
                });
            }
        }
    };

    const pieData = [
        { name: 'Users', value: stats.totalUsers || 0 },
        { name: 'Posts', value: stats.totalPosts || 0 },
        { name: 'Comments', value: stats.totalComments || 0 },
    ];

    const COLORS = ['#FF8A00', '#FF5C5C', '#FF4D79'];

    return (
        <div className="max-w-4xl mx-auto space-y-8 font-sans">
            <h2 className="text-3xl font-bold text-white tracking-tight heading-display">🛡️ Admin Profile</h2>

            {/* Profile Info Container */}
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF4D79]/5 to-transparent rounded-full filter blur-2xl"></div>
                
                <img 
                    src={user?.photoURL} 
                    alt="Admin Avatar" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-850 ring-4 ring-[#FF5C5C]/50 shadow-lg shrink-0" 
                />
                
                <div className="text-center md:text-left space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white heading-display tracking-tight flex items-center justify-center md:justify-start gap-2">
                            {user?.displayName}
                            <span className="bg-[#FF5C5C]/10 text-[#FF5C5C] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#FF5C5C]/25 heading-display">
                                System Admin
                            </span>
                        </h2>
                        <p className="text-xs font-semibold text-slate-450 font-sans mt-1">{user?.email}</p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold uppercase heading-display text-slate-300">
                        <span className="bg-[#0B1120] border border-slate-800 px-3.5 py-1.5 rounded-xl">
                            📦 Posts: {stats.totalPosts}
                        </span>
                        <span className="bg-[#0B1120] border border-slate-800 px-3.5 py-1.5 rounded-xl">
                            💬 Comments: {stats.totalComments}
                        </span>
                        <span className="bg-[#0B1120] border border-slate-800 px-3.5 py-1.5 rounded-xl">
                            👥 Users: {stats.totalUsers}
                        </span>
                    </div>
                </div>
            </div>

            {/* Overall Statistics Chart */}
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl">
                <h3 className="text-lg font-bold mb-6 text-white heading-display">📊 Overall Site Statistics</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 105).toFixed(0) / 100}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#131C2E', borderColor: '#1E293B', borderRadius: '12px' }}
                                itemStyle={{ color: '#FFFFFF' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tag Creation Form */}
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] shadow-2xl space-y-6">
                <h3 className="text-lg font-bold text-white heading-display flex items-center gap-2">
                    <HiTag className="text-[#FF8A00] w-5 h-5" />
                    Add New Tag
                </h3>
                <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Enter tag name (e.g. Next.js)..."
                        className="bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8A00] flex-1 font-medium transition-colors"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        style={{
                            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                            boxShadow: '0 0 20px rgba(255,138,0,0.15)'
                        }}
                        className="px-6 py-3 rounded-xl text-white font-extrabold text-sm hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer shrink-0"
                    >
                        Create Tag
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;