
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/announcements", {
        ...data,
        createdAt: new Date(),
      }, {withCredentials: true});

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Announcement Posted!",
          text: "Your announcement has been successfully published.",
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Failed to post the announcement.",
      });
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">📢 Make Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Author Image URL</label>
          <input
            type="text"
            {...register("authorImage", { required: true })}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="https://i.ibb.co/..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Author Name</label>
          <input
            type="text"
            {...register("authorName", { required: true })}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Admin Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="New Feature Announcement"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-4 py-2 rounded-lg"
            rows="4"
            placeholder="Write the announcement details..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg w-full"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
