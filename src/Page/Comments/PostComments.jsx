import { useParams } from "react-router";
import { use, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/Provider";

const PostComments = () => {
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
  const [reported, setReported] = useState({});
  const [modalComment, setModalComment] = useState("");
  const modalRef = useRef()


  const { id } = useParams();
  const { user } = use(AuthContext)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", id, currentPage, limit],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/comments/${id}?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
  });


  if (isLoading)
    return <div className="text-center py-10">Loading comments...</div>;

  if (isError || !data || !data.comments) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load comments.
      </div>
    );
  }

  const { totalPages, comments } = data;

  const feedbackOptions = [
    "Inappropriate language",
    "Spam or irrelevant",
    "Offensive content",
  ];

  

  const handleFeedbackChange = (commentId, value) => {
    setSelectedFeedbacks((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReport = async (commentId, commentText) => {
    const feedback = selectedFeedbacks[commentId];
    if (!feedback) return;

    await axios.post("http://localhost:5000/comment/reports", {
      commentId,
      commentText,
      reportedBy: user.email,
      feedback,
    }, {withCredentials: true});
    setReported((prev) => ({ ...prev, [commentId]: true }));
    alert("Reported successfully!");
  };

  

  const openModal = (commentText) => {
    setModalComment(commentText);
    modalRef.current?.showModal();
  };

  if (isLoading)
    return <div className="text-center py-10">Loading comments...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Failed to load comments.</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Comments for Post: {id}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => {
              const isLong = comment.commentText.length > 20;
              const truncated = isLong
                ? comment.commentText.slice(0, 20) + "..."
                : comment.commentText;

              return (
                <tr key={comment._id} className="hover">
                  <td>{comment.userEmail}</td>

                  {/* comment */}
                  <td>
                    {truncated}
                    {isLong && (
                      <button
                        className="text-blue-600 ml-2 underline"
                        onClick={() => openModal(comment.commentText)}
                      >
                        Read More
                      </button>
                    )}
                  </td>

                  {/* feedback */}
                  <td>
                    <select
                      className="select select-sm select-bordered"
                      defaultValue=""
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                      disabled={reported[comment._id]} // রিপোর্ট হলে disable করে দাও
                    >
                      <option disabled value="">
                        Select feedback
                      </option>
                      {feedbackOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* report btn */}
                  <td>
                    <button
                      className={`btn btn-sm ${reported[comment._id]
                        ? "btn-disabled"
                        : selectedFeedbacks[comment._id]
                          ? "btn-error"
                          : "btn-disabled"
                        }`}
                      onClick={() => handleReport(comment._id, comment.commentText)}
                      disabled={
                        !selectedFeedbacks[comment._id] || reported[comment._id]
                      }
                    >
                      {reported[comment._id] ? "Reported" : "Report"}
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h1>{modalComment}</h1>
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

export default PostComments;
