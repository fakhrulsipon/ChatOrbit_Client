import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5;

  useEffect(() => {
    document.title = 'ManageUsers | ChatOrbit';
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
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


  const users = data?.result;
  const totalPages = data?.totalPage;

  const handleRoleChange = async (userId, role) => {
    const url = role !== 'admin'
      ? `/users/admin/${userId}`
      : `/users/remove-admin/${userId}`;



    try {
      const response = await axiosSecure.patch(url);
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

  if (isLoading) {
    return(
            <div className="flex justify-center items-center h-64">
                <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>;
            </div>
        );
  }

  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <input type="text" placeholder='type user name' className='input input-bordered bg-white text-gray-800 border-gray-400 focus:outline-none mb-4 w-full max-w-xs' value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr className='text-black'>
              <th className="px-4 py-2 border">Name</th>
              <th className=" px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Membership</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className=" px-4 py-3  border-b ">{user.email}</td>
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
                  {user.badges[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination Buttons */}
      <div className="join flex flex-wrap justify-center mt-6 gap-2">
        {/* Previous Button */}
        <button
          className="join-item btn btn-sm bg-white shadow-none text-black border-gray-300 hover:bg-gray-100"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Dynamic Page Numbers */}
        {(() => {
          const pages = [];
          const maxVisiblePages = 5;
          let startPage, endPage;

          if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
          } else {
            const half = Math.floor(maxVisiblePages / 2);
            if (currentPage <= half + 1) {
              startPage = 1;
              endPage = maxVisiblePages;
            } else if (currentPage >= totalPages - half) {
              startPage = totalPages - maxVisiblePages + 1;
              endPage = totalPages;
            } else {
              startPage = currentPage - half;
              endPage = currentPage + half;
            }
          }

          if (startPage > 1) {
            pages.push(
              <button
                key={1}
                className={`join-item btn btn-sm shadow-none ${currentPage === 1 ? 'btn-active bg-gray-200 text-black' : 'bg-white text-black border-gray-300'}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
            );
            if (startPage > 2) {
              pages.push(<span key="start-ellipsis" className="join-item btn btn-sm bg-white text-black border-gray-300 disabled">...</span>);
            }
          }

          for (let i = startPage; i <= endPage; i++) {
            pages.push(
              <button
                key={i}
                className={`join-item btn shadow-none btn-sm ${currentPage === i ? 'btn-active border-gray-300 bg-gray-200 text-black' : 'bg-white text-black border-gray-300'} hover:bg-gray-100`}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            );
          }

          if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
              pages.push(<span key="end-ellipsis" className="join-item btn btn-sm bg-white text-black border-gray-300 disabled">...</span>);
            }
            pages.push(
              <button
                key={totalPages}
                className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            );
          }

          return pages;
        })()}

        {/* Next Button */}
        <button
          className="join-item btn btn-sm bg-white text-black border-gray-300 hover:bg-gray-100 shadow-none"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>


    </div>
  );
};

export default ManageUsers;
