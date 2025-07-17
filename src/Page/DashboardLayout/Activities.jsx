import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const Activities = () => {
    const { data: reports = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["reported-comments"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/reported-comments");
            return res.data;
        },
    });

    if (isLoading) return <span className="loading loading-bars loading-lg"></span>;
    if (isError) return <p className="text-red-500">Failed to load reported comments.</p>;

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
                    const res = await axios.delete(`http://localhost:5000/admin/delete-reported-comment/${reportId}/${commentId}`)
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

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🚨 Reported Comments</h2>

            {reports.length === 0 ? (
                <p className="text-center text-gray-600">No reports found.</p>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div
                            key={report._id}
                            className="border border-gray-300 rounded-lg p-4 shadow bg-white"
                        >
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-black">Reported By:</span> {report.reportedBy}
                            </p>
                            <p className="mt-1 text-gray-800">
                                <span className="font-medium">Comment:</span> {report.commentText}
                            </p>
                            <p className="mt-1 text-gray-800">
                                <span className="font-medium">Feedback:</span> {report.feedback}
                            </p>
                            <p className="mt-1 text-gray-500 text-sm">
                                <span className="font-medium">Reported At:</span>{" "}
                                {new Date(report.reportedAt).toLocaleString()}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button onClick={() => handleDelete(report._id, report.commentId)} className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                                    Delete Comment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Activities;


