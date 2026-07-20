import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShowAnnouncements = () => {
  //get all announcements
  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("https://chatorbit-server.vercel.app/announcements");
      return res.data;
    },
  });

  //get announcements count
  const { data: announcementCount = 0, isLoading: loadingCount, isError } = useQuery({
    queryKey: ['announcementCount'],
    queryFn: async () => {
      const res = await axios.get('https://chatorbit-server.vercel.app/announcement-count');
      return res.data.count;
    }
  });

  if (loadingAnnouncements || loadingCount) {
    return (
      <div className="flex flex-col justify-center items-center h-80 gap-4">
        <span className="loading loading-ring loading-lg text-indigo-500 scale-150"></span>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading announcements...</p>
      </div>
    );
  }

  if (isError) return <p className="text-center text-rose-455 font-semibold my-8">Something went wrong!</p>;

  if (announcementCount === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8 lg:mt-12 xl:mt-16">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight flex items-center justify-center gap-2">
        📢 Community Announcements
      </h2>

      <div className="space-y-6">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="relative border border-slate-850/80 rounded-3xl overflow-hidden bg-slate-900/30 hover:shadow-xl shadow-sm transition-all duration-300"
          >
            {/* Ribbon for important announcements */}
            {item.isImportant && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-[10px] font-black rounded-full shadow-sm tracking-wider uppercase">
                Important
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={item.authorImage}
                  alt={item.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-850 shadow-md ring-2 ring-indigo-950/40"
                />
                <div>
                  <p className="font-bold text-slate-200 flex items-center gap-2 text-sm">
                    {item.authorName}
                    {item.isAdmin && (
                      <span className="bg-indigo-950/40 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-900/30">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
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

              <h3 className="text-xl font-extrabold mb-3 text-slate-100 tracking-tight leading-snug">
                {item.title.includes('!') ? '🚀 ' : '📌 '}
                {item.title}
              </h3>

              <div className="prose max-w-none text-slate-400 text-sm mb-6 leading-relaxed">
                {item.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-3">{paragraph}</p>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-850">
                {item.actionLink ? (
                  <a
                    href={item.actionLink}
                    className="inline-flex items-center px-4 py-2 bg-indigo-650 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all duration-300 shadow-md shadow-indigo-650/10 cursor-pointer"
                  >
                    Learn More →
                  </a>
                ) : <div />}
                <button className="text-xs text-indigo-400 hover:text-indigo-350 font-bold transition-colors cursor-pointer">
                  Share Announcement
                </button>
              </div>
            </div>

            {/* Footer with tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="px-8 py-4 bg-slate-950/30 border-t border-slate-850">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold px-2.5 py-1 bg-slate-900/50 text-slate-400 border border-slate-800 rounded-full shadow-sm"
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
