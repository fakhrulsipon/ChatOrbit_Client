import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { HiExclamation, HiEye, HiTrash } from 'react-icons/hi';

const Activities = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedComment, setSelectedComment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        document.title = 'Activities | ChatOrbit';
    }, []);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["reported-comments", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reported-comments?page=${currentPage}&limit=${limit}`);
            return res.data;
        },
    });

    const handleDelete = (reportId, commentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This comment will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF5C5C",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "Yes, delete it!",
            background: '#1B2435',
            color: '#FFFFFF'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/admin/delete-reported-comment/${reportId}/${commentId}`);
                    const { deletedComment, deletedReport } = res.data;
                    if (deletedComment === 1 || deletedReport === 1) {
                        Swal.fire({
                            title: "Deleted! 🚀",
                            text: "Comment has been deleted successfully.",
                            icon: "success",
                            background: '#1B2435',
                            color: '#FFFFFF'
                        });
                        refetch();
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                        background: '#1B2435',
                        color: '#FFFFFF'
                    });
                }
            }
        });
    };

    const modalRef = useRef();

    const handleReadMore = (comment) => {
        setSelectedComment(comment);
        modalRef.current?.showModal();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-80 gap-4">
                <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading reported content...</p>
            </div>
        );
    }

    if (isError) {
        return <p className="text-center mt-10 text-red-500 font-bold heading-display">Failed to load reports feed.</p>;
    }

    const reports = data?.reports || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-sans">
            <h2 className="text-3xl font-bold text-white tracking-tight heading-display flex items-center gap-2">
                <HiExclamation className="text-[#FF5C5C]" /> Reported Comments
            </h2>

            {reports.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/10 border border-dashed border-slate-855 rounded-3xl">
                    <span className="text-4xl mb-3">✅</span>
                    <p className="text-center text-slate-400 font-medium font-display">Clean Inbox! No reports filed yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Table Container */}
                    <div className="bg-[#1B2435] border border-slate-800 rounded-[20px] overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-[#131C2E] border-b border-slate-850 text-slate-355 text-sm heading-display">
                                        <th className="py-4 pl-6">#</th>
                                        <th className="py-4">Reported By</th>
                                        <th className="py-4">Comment</th>
                                        <th className="py-4">Feedback Reason</th>
                                        <th className="py-4 hidden md:table-cell">Reported At</th>
                                        <th className="py-4 pr-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((report, index) => (
                                        <tr key={report._id} className="border-b border-slate-850/50 hover:bg-[#131C2E]/40 transition-colors text-xs font-medium">
                                            <td className="py-4 pl-6 font-bold text-slate-500">{(currentPage - 1) * limit + index + 1}</td>
                                            <td className="py-4 text-white font-semibold">{report.reportedBy}</td>
                                            <td className="py-4 text-slate-300 max-w-xs truncate">
                                                {report.commentText.length > 25 ? (
                                                    <span className="flex items-center gap-1.5">
                                                        {report.commentText.slice(0, 25)}...
                                                        <button
                                                            onClick={() => handleReadMore(report.commentText)}
                                                            className="text-[#FF8A00] font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                                                        >
                                                            <HiEye className="w-3.5 h-3.5" /> Read
                                                        </button>
                                                    </span>
                                                ) : (
                                                    report.commentText
                                                )}
                                            </td>
                                            <td className="py-4 text-[#CBD5E1]">{report.feedback}</td>
                                            <td className="py-4 hidden md:table-cell text-slate-450">
                                                {new Date(report.reportedAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                                            </td>
                                            <td className="py-4 pr-6 text-center">
                                                <button
                                                    onClick={() => handleDelete(report._id, report.commentId)}
                                                    className="btn btn-xs bg-rose-950/20 hover:bg-rose-900/30 text-rose-500 border border-rose-900/20 rounded-xl flex items-center gap-1 cursor-pointer"
                                                >
                                                    <HiTrash className="w-3.5 h-3.5" /> Delete
                                                </button>
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
                            <button
                                className="btn btn-sm bg-[#1B2435] hover:bg-[#131C2E] text-slate-455 border border-slate-800 rounded-xl cursor-pointer disabled:opacity-40"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>

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

            {/* Read More Modal */}
            <dialog ref={modalRef} id="my_modal_1" className="modal bg-[#0B1120]/80 backdrop-blur-sm">
                <div className="modal-box bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-2xl p-8 text-[#CBD5E1] space-y-4">
                    <h3 className="text-lg font-bold text-white heading-display border-b border-slate-800/80 pb-3">Reported Comment Text</h3>
                    <p className="text-sm leading-relaxed">{selectedComment}</p>
                    <div className="modal-action pt-2">
                        <form method="dialog">
                            <button className="btn bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-850 rounded-xl cursor-pointer">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Activities;
