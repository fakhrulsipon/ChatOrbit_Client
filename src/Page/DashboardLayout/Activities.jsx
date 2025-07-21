
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const Activities = () => {
    const [selectedComment, setSelectedComment] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5;

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["reported-comments"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/reported-comments?page=${currentPage}&limit=${limit}`, {withCredentials: true});
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
                    const res = await axios.delete(`http://localhost:5000/admin/delete-reported-comment/${reportId}/${commentId}`, {withCredentials: true})
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


    if (isLoading) return <span className="loading loading-bars loading-lg"></span>;
    if (isError) return <p className="text-red-500">Failed to load reported comments.</p>;

     const {reports, totalPages} = data;
     
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
            <div className="flex justify-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                    className="btn btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {idx + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    className="btn btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

        </div>



    );
};

export default Activities;


