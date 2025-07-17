import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShowAnnouncements = () => {
  // announcements query
  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/announcements");
      return res.data;
    },
  });

  // count query
  const { data: announcementCount = 0, isLoading: loadingCount, isError } = useQuery({
    queryKey: ['announcementCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/announcement-count');
      return res.data.count;
    }
  });

  if (loadingAnnouncements || loadingCount) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (isError) return <p>Something went wrong!</p>;

  if (announcementCount === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">📢 All Announcements</h2>
      <div className="space-y-6">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-lg shadow p-5 bg-white"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={item.authorImage}
                alt={item.authorName}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.authorName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-700">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAnnouncements;
