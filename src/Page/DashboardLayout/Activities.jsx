
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Activities = () => {
    const axiosSecure = useAxiosSecure()
    const [selectedComment, setSelectedComment] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5;

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["reported-comments"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reported-comments?page=${currentPage}&limit=${limit}`);
            return res.data;
        },
    });


    const handleDelete = (reportId, commentId) => {
        console.log('reportId', reportId, 'commentId', commentId)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/admin/delete-reported-comment/${reportId}/${commentId}`)
                    const { deletedComment, deletedReport } = res.data;
                    if (deletedComment === 1 || deletedReport === 1) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }

                } catch (error) {
                    console.error("Error deleting:", error);
                    Swal.fire("Error", "Something went wrong. Try again.", "error");
                }
            }
        });
    }

    const modalRef = useRef();

    const handleReadMore = (comment) => {
        setSelectedComment(comment)
        modalRef.current?.showModal();
    }


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }
    
    if (isError) return <p className="text-red-500">Failed to load reported comments.</p>;

    const { reports, totalPages } = data;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🚨 Reported Comments</h2>

            {reports.length === 0 ? (
                <p className="text-center text-gray-600">No reports found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Reported By</th>
                                <th className="px-4 py-2 text-left">Comment</th>
                                <th className="px-4 py-2 text-left">Feedback</th>
                                <th className="px-4 py-2 text-left">Reported At</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={report._id} className="border-t border-gray-300">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{report.reportedBy}</td>
                                    {/* commet Text er Fn */}
                                    <td className="px-4 py-2">
                                        {report.commentText.length > 20 ? (
                                            <>
                                                {report.commentText.slice(0, 20)}...
                                                <button
                                                    onClick={() => handleReadMore(report.commentText)}
                                                    className="ml-2 text-blue-600 underline text-sm"
                                                >
                                                    Read More
                                                </button>
                                            </>
                                        ) : (
                                            report.commentText
                                        )}
                                    </td>

                                    <td className="px-4 py-2">{report.feedback}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        {new Date(report.reportedAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(report._id, report.commentId)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete Comment
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* modal */}
            <dialog ref={modalRef} id="my_modal_1" className="modal">
                <div className="modal-box">
                    {selectedComment}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


            {/* Pagination Buttons */}
            <div className="join flex flex-wrap justify-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                    className="join-item btn btn-sm"
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
                                className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(1)}
                            >
                                1
                            </button>
                        );
                        if (startPage > 2) {
                            pages.push(<span key="start-ellipsis" className="join-item btn btn-sm disabled">...</span>);
                        }
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                            <button
                                key={i}
                                className={`join-item btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(i)}
                            >
                                {i}
                            </button>
                        );
                    }

                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                            pages.push(<span key="end-ellipsis" className="join-item btn btn-sm disabled">...</span>);
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
                    className="join-item btn btn-sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>

        </div>



    );
};

export default Activities;


