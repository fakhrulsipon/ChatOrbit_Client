import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShowAnnouncements = () => {
  // Get all announcements
  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("https://chatorbit-server.vercel.app/announcements");
      return res.data;
    },
  });

  // Get announcements count
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
        <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading announcements...</p>
      </div>
    );
  }

  if (isError) return <p className="text-center text-[#FF5C5C] font-semibold my-8 heading-display">Something went wrong!</p>;

  if (announcementCount === 0) {
    return null;
  }

  return (
    <section className="py-10 lg:py-16 w-full max-w-4xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight leading-none flex items-center justify-center gap-3">
          📢 Community Announcements
        </h2>
        <p className="text-[#CBD5E1] text-sm lg:text-base leading-relaxed">
          Stay up to date with the latest guidelines, releases, and updates from the ChatOrbit admin crew.
        </p>
      </div>

      <div className="space-y-8">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="relative border border-slate-800 rounded-[20px] overflow-hidden bg-[#1B2435] shadow-lg hover:shadow-2xl hover:border-[#FF5C5C]/30 transition-all duration-300"
          >
            {/* Ribbon for important announcements */}
            {item.isImportant && (
              <div 
                style={{
                  background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)'
                }}
                className="absolute top-0 right-0 text-white px-4 py-1.5 text-[10px] font-black rounded-bl-xl shadow-md tracking-wider uppercase heading-display"
              >
                Important
              </div>
            )}

            <div className="p-8">
              {/* Author header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={item.authorImage}
                  alt={item.authorName}
                  className="w-12 h-12 rounded-full object-cover border border-slate-800 shadow-md"
                />
                <div>
                  <p className="font-bold text-slate-200 flex items-center gap-2 text-sm">
                    {item.authorName}
                    {item.isAdmin && (
                      <span className="bg-[#FF8A00]/10 text-[#FF8A00] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#FF8A00]/25 heading-display">
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

              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white tracking-tight leading-snug heading-display">
                {item.title.includes('!') ? '🚀 ' : '📌 '}
                {item.title}
              </h3>

              <div className="prose max-w-none text-[#CBD5E1] text-sm mb-6 leading-relaxed">
                {item.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-3">{paragraph}</p>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                {item.actionLink ? (
                  <a
                    href={item.actionLink}
                    style={{
                      background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                      boxShadow: '0 0 20px rgba(255,138,0,0.15)'
                    }}
                    className="inline-flex items-center px-5 py-2.5 text-white text-xs font-bold rounded-xl hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
                  >
                    Learn More →
                  </a>
                ) : <div />}
                <button className="text-xs text-[#FF8A00] hover:text-[#FF5C5C] font-bold transition-colors cursor-pointer">
                  Share Announcement
                </button>
              </div>
            </div>

            {/* Footer with tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="px-8 py-4 bg-[#0B1120]/40 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold px-3 py-1 bg-[#1B2435] text-slate-400 border border-slate-800 rounded-full shadow-sm"
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
    </section>
  );
};

export default ShowAnnouncements;
