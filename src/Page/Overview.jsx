
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import useAxiosSecure from "../hook/useAxiosSecure";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6"]; // blue, green, purple

const Overview = () => {
    const axiosSecure = useAxiosSecure();
  // Fetch stats data from server
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["overView-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/overView-stats");
      return res.data;
    },
  });

//   console.log(stats)

  if (isLoading) {
    return(
            <div className="flex justify-center items-center h-64">
                <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>;
            </div>
        );
  }

  // Pie chart data
  const pieData = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Comments", value: stats.totalComments || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
  ];

  // Example Bar chart (static + dynamic mix)
  const barData = [
    { name: "Users", count: stats.totalUsers || 0 },
    { name: "Posts", count: stats.totalPosts || 0 },
    { name: "Comments", count: stats.totalComments || 0 },
    { name: "Active Members", count: 120 }, // demo static
    { name: "New Posts Today", count: 25 }, // demo static
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-black">📊 Website Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-blue-600">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-black">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-green-600">Total Posts</h3>
          <p className="text-3xl font-bold mt-2 text-black">{stats.totalPosts}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-purple-600">Total Comments</h3>
          <p className="text-3xl font-bold mt-2 text-black">{stats.totalComments}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-black">Content Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-black">Website Stats Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
