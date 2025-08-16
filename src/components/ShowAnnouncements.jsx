import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShowAnnouncements = () => {
  //get all announcements
  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/announcements");
      return res.data;
    },
  });

  //get annoucements count
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
    <div className="max-w-4xl mx-auto p-4 mt-8 lg:mt-12 xl:mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
        📢 Community Announcements
      </h2>

      <div className="space-y-6">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="relative border-l-4 border-blue-500 rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-shadow duration-300"
          >
            {/* Ribbon for important announcements */}
            {item.isImportant && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold transform rotate-12 translate-x-2 -translate-y-1">
                IMPORTANT
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={item.authorImage}
                  alt={item.authorName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <p className="font-bold text-gray-800 flex items-center gap-2">
                    {item.authorName}
                    {item.isAdmin && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        ADMIN
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    Posted on {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold mb-3 text-gray-800">
                {item.title.includes('!') ? '🚀 ' : '📌 '}
                {item.title}
              </h3>

              <div className="prose max-w-none text-gray-700 mb-4">
                {item.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-3">{paragraph}</p>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                {item.actionLink && (
                  <a
                    href={item.actionLink}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Learn More →
                  </a>
                )}
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Share Announcement
                </button>
              </div>
            </div>

            {/* Footer with tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAnnouncements;
