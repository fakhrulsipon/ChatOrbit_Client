import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/users');
      return res.data;
    }
  });

  const handleRoleChange = async (userId, role) => {
    const url = role === 'admin'
      ? `http://localhost:5000/users/admin/${userId}`
      : `http://localhost:5000/users/remove-admin/${userId}`;

    try {
      const response = await axios.patch(url);
      if (response.data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to change role.',
        icon: 'error'
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Membership</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleRoleChange(user._id, user.role)}
                    className={`px-3 py-1 rounded text-white ${user.role === 'admin' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                  >
                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  {user.badges[0] || 'free'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
