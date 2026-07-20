import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AllTags = ({ setSearchTag, setCurrentPage }) => {
  const { data: tags, isError, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get('https://chatorbit-server.vercel.app/tags');
      return res.data
    }
  })
  if (isLoading) return (
    <div className="flex justify-center mt-4">
      <span className="loading loading-spinner text-indigo-500"></span>
    </div>
  );

  if (isError) return <p className="text-center text-rose-450 mt-4 font-semibold text-sm">Failed to load tags</p>;

  return (
    <div className="py-2">
      <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl mx-auto">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => {
              setSearchTag(tag.tag);
              setCurrentPage(1);
            }}
            className="btn btn-sm px-4 py-1.5 text-xs font-semibold text-slate-400 bg-slate-900/60 hover:text-indigo-400 hover:bg-slate-800/80 hover:border-slate-700 border border-slate-800/80 rounded-full shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
          >
            #{tag.tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTags;