import { useParams } from "react-router";
import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const PostComments = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
  const [reported, setReported] = useState({});
  const [modalComment, setModalComment] = useState("");
  const modalRef = useRef()

   useEffect(() => {
            document.title = 'Feedback | ChatOrbit';
        }, []);


  const { id } = useParams();
  const { user } = use(AuthContext)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5;

  // akta single post er je comment gulate report kora hoyse
  const {
    data: reportedComments = [],
    isLoading: reportedLoading,
    isError: reportedError,
  } = useQuery({
    queryKey: ["reported-comments", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/comment/reports/${id}/${user.email}`);
      return res.data;
    }
  });

  // console.log(reportedComments)

  //কমেন্টগুলো লোড হওয়ার পর রিপোর্ট করা কমেন্টগুলো সেট করুন
  useEffect(() => {
    if (reportedComments.length > 0) {
      const reportedMap = {};
      reportedComments.forEach(commentId => {
        reportedMap[commentId] = true;
      });
      setReported(reportedMap);
    }
  }, [reportedComments]);

  // akta sigle post er sobgula comment pawar get api
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", id, currentPage, limit],
    queryFn: async () => {
      const res = await axios.get(`https://chatorbit-server.vercel.app
/comments/${id}?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
  });

  if (isLoading || reportedLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Loading comments...</p>
      </div>
    );
  }

  if (isError || !data || !data.comments || reportedError) {
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

    await axiosSecure.post("/comment/reports", {
      commentId,
      postId: id,
      commentText,
      reportedBy: user.email,
      feedback,
    });
    setReported((prev) => ({ ...prev, [commentId]: true }));
    Swal.fire("Reported!", "Your feedback has been sent.", "success");
  };

  const openModal = (commentText) => {
    setModalComment(commentText);
    modalRef.current?.showModal();
  };



  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Comments for Post: {id}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback / Report</th>
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


                  <td colSpan={2}>
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">

                      {/* feedback */}
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

                      {/* report btn */}

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


                    </div>
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

export default PostComments;
