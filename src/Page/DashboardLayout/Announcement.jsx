import { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useNavigate } from "react-router";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  useEffect(() => {
    document.title = 'Make Announcement | ChatOrbit';
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/announcements", {
        ...data,
        authorName: user.displayName,
        authorImage: user.photoURL,
        createdAt: new Date(),
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Announcement Posted! 🚀",
          text: "Your announcement has been successfully published.",
          background: '#1B2435',
          color: '#FFFFFF',
          confirmButtonColor: '#FF8A00'
        });
        reset();
        navigate('/');
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to post the announcement. Please try again.",
        background: '#1B2435',
        color: '#FFFFFF',
        confirmButtonColor: '#FF8A00'
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto my-6 p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white heading-display tracking-tight flex items-center justify-center gap-2">
        📢 Make Announcement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Author Image URL */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">Author Image URL</label>
          <input
            type="text"
            defaultValue={user?.photoURL}
            readOnly
            className="w-full px-4 py-3 rounded-xl text-slate-400 border border-slate-800 bg-[#0B1120] focus:outline-none text-sm font-semibold select-none"
          />
        </div>

        {/* Author Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">Author Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="w-full px-4 py-3 rounded-xl text-slate-400 border border-slate-800 bg-[#0B1120] focus:outline-none text-sm font-semibold select-none"
          />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold tracking-wider text-slate-350 uppercase">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
            placeholder="New Feature Announcement..."
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold tracking-wider text-slate-350 uppercase">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-4 py-3 rounded-xl text-white border border-slate-800 bg-[#0B1120] focus:outline-none focus:border-[#FF8A00] text-sm font-medium transition-colors"
            rows="4"
            placeholder="Write the announcement details here..."
            required
          ></textarea>
        </div>

        {/* Action button */}
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
            boxShadow: '0 0 25px rgba(255,138,0,0.25)'
          }}
          className="w-full text-white font-extrabold text-sm py-4 rounded-xl border-none shadow-lg active:scale-98 transition-all duration-300 cursor-pointer"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
