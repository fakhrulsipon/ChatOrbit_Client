import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { FiSearch } from 'react-icons/fi';
import { FaUserShield, FaUserPlus } from 'react-icons/fa';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    document.title = 'Manage Users | ChatOrbit';
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

  const { data = { result: [], totalPage: 1 }, isLoading, isError, refetch } = useQuery({
    queryKey: ['users', debouncedSearch, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?search=${debouncedSearch}&page=${currentPage}&limit=${limit}`);
      return res.data;
    }
  });

  const users = data?.result || [];
  const totalPages = data?.totalPage || 1;

  const handleRoleChange = async (userId, role) => {
    const url = role !== 'admin'
      ? `/users/admin/${userId}`
      : `/users/remove-admin/${userId}`;

    try {
      const response = await axiosSecure.patch(url);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success! 🛡️",
          text: "User permissions updated successfully.",
          icon: "success",
          background: '#1B2435',
          color: '#FFFFFF',
          confirmButtonColor: '#FF8A00'
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to change role.',
        icon: 'error',
        background: '#1B2435',
        color: '#FFFFFF'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 gap-4">
        <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading members registry...</p>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500 font-bold heading-display">Failed to load users list.</p>;
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-white tracking-tight heading-display">Manage Users</h2>
        
        {/* Search Field */}
        <div className="relative w-full max-w-xs flex items-center">
          <FiSearch className="text-slate-400 w-4 h-4 absolute left-4" />
          <input
            type="text"
            placeholder="Search by username..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B2435] text-white border border-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/10 border border-dashed border-slate-855 rounded-3xl">
          <span className="text-4xl mb-3">🔍</span>
          <p className="text-center text-slate-400 font-medium">No users match your query search.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Table Wrapper */}
          <div className="bg-[#1B2435] border border-slate-800 rounded-[20px] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-[#131C2E] border-b border-slate-850 text-slate-355 text-sm heading-display">
                    <th className="py-4 pl-6">Name</th>
                    <th className="py-4">Email</th>
                    <th className="py-4">Access Role</th>
                    <th className="py-4 pr-6">Membership Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-850/50 hover:bg-[#131C2E]/40 transition-colors">
                      <td className="py-4 pl-6 font-semibold text-white">{user.name}</td>
                      <td className="py-4 text-xs font-semibold text-slate-400">{user.email}</td>
                      <td className="py-4">
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          className={`btn btn-xs sm:btn-sm border rounded-xl flex items-center gap-1 cursor-pointer transition-all duration-300 ${
                            user.role === 'admin'
                              ? 'bg-rose-950/20 hover:bg-rose-900/30 text-rose-500 border-rose-900/20'
                              : 'bg-orange-950/20 hover:bg-orange-900/30 text-[#FF8A00] border-orange-900/20'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <>
                              <FaUserShield className="w-3.5 h-3.5" /> Remove Admin
                            </>
                          ) : (
                            <>
                              <FaUserPlus className="w-3.5 h-3.5" /> Make Admin
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 pr-6">
                        {user.badges[0] === 'gold' ? (
                          <span className="inline-block bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/25 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full heading-display">
                            🥇 Gold
                          </span>
                        ) : (
                          <span className="inline-block bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/25 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full heading-display">
                            🥉 Bronze
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-1.5">
              {/* Previous Button */}
              <button
                className="btn btn-sm bg-[#1B2435] hover:bg-[#131C2E] text-slate-455 border border-slate-800 rounded-xl cursor-pointer disabled:opacity-40"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                «
              </button>

              {/* Page Numbers */}
              {(() => {
                const pages = [];
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={`btn btn-sm rounded-xl cursor-pointer ${
                        currentPage === i
                          ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] text-white border-none shadow-md shadow-orange-500/20'
                          : 'bg-[#1B2435] hover:bg-[#131C2E] text-slate-400 border border-slate-800'
                      }`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}

              {/* Next Button */}
              <button
                className="btn btn-sm bg-[#1B2435] hover:bg-[#131C2E] text-slate-455 border border-slate-800 rounded-xl cursor-pointer disabled:opacity-40"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
