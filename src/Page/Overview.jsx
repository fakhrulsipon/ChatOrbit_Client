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

const COLORS = ["#FF8A00", "#FF5C5C", "#FF4D79"];

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

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 gap-4">
        <span className="loading loading-ring loading-lg text-[#FF8A00] scale-150"></span>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading dashboard statistics...</p>
      </div>
    );
  }

  // Pie chart data
  const pieData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Comments", value: stats.totalComments || 0 },
  ];

  // Example Bar chart (static + dynamic mix)
  const barData = [
    { name: "Users", count: stats.totalUsers || 0 },
    { name: "Posts", count: stats.totalPosts || 0 },
    { name: "Comments", count: stats.totalComments || 0 },
    { name: "Active", count: 120 },
    { name: "Today", count: 25 },
  ];

  return (
    <div className="space-y-8 font-sans">
      <h2 className="text-3xl font-bold text-white tracking-tight heading-display">📊 Website Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="relative overflow-hidden bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-lg flex flex-col justify-between hover:border-[#FF8A00]/30 transition-all duration-300">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FF8A00]"></div>
          <h3 className="text-base font-semibold text-slate-400 heading-display">Total Users</h3>
          <p className="text-4xl font-extrabold mt-3 text-white heading-display tracking-tight">{stats.totalUsers}</p>
        </div>

        {/* Total Posts */}
        <div className="relative overflow-hidden bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-lg flex flex-col justify-between hover:border-[#FF5C5C]/30 transition-all duration-300">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FF5C5C]"></div>
          <h3 className="text-base font-semibold text-slate-400 heading-display">Total Posts</h3>
          <p className="text-4xl font-extrabold mt-3 text-white heading-display tracking-tight">{stats.totalPosts}</p>
        </div>

        {/* Total Comments */}
        <div className="relative overflow-hidden bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-lg flex flex-col justify-between hover:border-[#FF4D79]/30 transition-all duration-300">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FF4D79]"></div>
          <h3 className="text-base font-semibold text-slate-400 heading-display">Total Comments</h3>
          <p className="text-4xl font-extrabold mt-3 text-white heading-display tracking-tight">{stats.totalComments}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-[#1B2435] border border-slate-800 rounded-[20px] p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 text-center text-white heading-display">Content Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#131C2E', borderColor: '#1E293B', borderRadius: '12px' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#1B2435] border border-slate-800 rounded-[20px] p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 text-center text-white heading-display">Website Stats Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#131C2E', borderColor: '#1E293B', borderRadius: '12px' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="count" fill="#FF8A00" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
