import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AllTags = ({ setSearchTag, setPage }) => {
    const { data: tags, isError, isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/tags');
            return res.data
        }
    })
    if (isLoading) return <p className="text-center mt-4">Loading tags...</p>;
    if (isError) return <p className="text-center text-red-500 mt-4">Failed to load tags</p>;

    return (
        <div className="">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => {setSearchTag(tag.tag);
                setPage(1);
            }}
            className="btn btn-sm border border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm"
          >
            {tag.tag}
          </button>
        ))}
      </div>
    </div>
    );
};

export default AllTags;