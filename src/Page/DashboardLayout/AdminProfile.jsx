import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../../Provider/Provider';

const AdminProfile = () => {
    const {user} = use(AuthContext)
    const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/admin-stats");
      return res.data;
    },
  });
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 bg-white shadow p-4 rounded-lg">
        <img src={user.photoURL} alt="Admin" className="w-20 h-20 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p>📦 Posts: {stats.totalPosts}</p>
          <p>💬 Comments: {stats.totalComments}</p>
          <p>👥 Users: {stats.totalUsers}</p>
        </div>
      </div>
      </div>

    );
};

export default AdminProfile;