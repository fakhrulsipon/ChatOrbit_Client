import { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useNavigate } from "react-router";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = use(AuthContext)

 useEffect(() => {
        document.title = 'Annoucement | ChatOrbit';
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
          title: "Announcement Posted!",
          text: "Your announcement has been successfully published.",
        });
        reset();
        navigate('/')

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
    <div className="max-w-3xl p-6 bg-white shadow-xl rounded-xl my-10 mx-4 lg:mx-10 xl:mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">📢 Make Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Author Image URL</label>
          <input
            type="text"
            defaultValue={user.photoURL}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Author Image"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Author Name</label>
          <input
            type="text"
            defaultValue={user.displayName}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Author Name"
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
