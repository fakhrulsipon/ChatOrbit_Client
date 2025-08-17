import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import Swal from 'sweetalert2';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext)
    const [tagName, setTagName] = useState('')

    useEffect(() => {
           document.title = 'AdminProfile | ChatOrbit';
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
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }


    const handleAddTag = async (e) => {
        e.preventDefault()
        if (!tagName.trim()) return;

        try {
            const res = await axiosSecure.post("/tag", { tag: tagName });
            if (res.data.insertedId) {
                Swal.fire("Success", "Tag added successfully!", "success");
                setTagName('');
            }
        } catch (error) {
            if (error.response?.status === 409) {
                Swal.fire("⚠️ Duplicate", "This tag already exists!", "warning");
            } else {
                Swal.fire("❌ Error", "Failed to add tag", "error");
            }
        }
    };

    const pieData = [
        { name: 'Posts', value: stats.totalPosts || 0 },
        { name: 'Comments', value: stats.totalComments || 0 },
        { name: 'Users', value: stats.totalUsers || 0 },
    ];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* profile Fn */}
            <div className="flex items-center gap-4 bg-white shadow p-4 rounded-lg">
                <img src={user.photoURL} alt="Admin" className="w-20 h-20 rounded-full" />
                <div className='text-black'>
                    <h2 className="text-xl font-bold">{user.displayName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p>📦 Posts: {stats.totalPosts}</p>
                    <p>💬 Comments: {stats.totalComments}</p>
                    <p>👥 Users: {stats.totalUsers}</p>
                </div>
            </div>

            {/* pieChart */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-black">📊 Overall Site Statistics</h3>
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
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>


            {/* tag Fn */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 text-black">➕ Add New Tag</h3>
                <form onSubmit={handleAddTag} className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter tag name..."
                        className="input input-bordered w-full bg-white text-gray-400 border-gray-400 focus:outline-none"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn bg-blue-400 border-none hover:bg-blue-500 text-white">Add Tag</button>
                </form>
            </div>


        </div>

    );
};

export default AdminProfile;