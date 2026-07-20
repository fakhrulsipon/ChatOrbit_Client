import React, { useState } from 'react';
import { HiSparkles, HiMail, HiCalendar, HiUser } from 'react-icons/hi';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import Swal from 'sweetalert2';

const categories = ["All Insights", "Artificial Intelligence", "Community Guides", "Software Tech", "Tutorials"];

const blogs = [
    {
        id: 1,
        title: "How Chatbots are Transforming Customer Support",
        excerpt: "Explore how AI chatbots are revolutionizing customer support, improving response times, and maximizing customer satisfaction.",
        author: "Chatorbit Team",
        date: "Aug 16, 2025",
        category: "Artificial Intelligence",
        readTime: "5 min read",
        image: "https://i.postimg.cc/W4NpmmVF/Blog-Featured-Image-1576x1064-1-1.webp",
        featured: true
    },
    {
        id: 2,
        title: "Top AI Tools to Boost Productivity in 2025",
        excerpt: "Discover the latest AI tools that can enhance your daily development workflows, automate writing, and optimize task management.",
        author: "Chatorbit Team",
        date: "Aug 15, 2025",
        category: "Artificial Intelligence",
        readTime: "4 min read",
        image: "https://i.postimg.cc/V6PxBmn7/images-2.jpg",
        featured: false
    },
    {
        id: 3,
        title: "Understanding Natural Language Processing",
        excerpt: "Learn the fundamentals of NLP and how it powers modern chatbots, intent detectors, and advanced virtual assistants.",
        author: "Chatorbit Team",
        date: "Aug 14, 2025",
        category: "Software Tech",
        readTime: "6 min read",
        image: "https://i.postimg.cc/66YPTdjb/CCS-7818-WFP285303-BLOG-Natural-Lang-Search-1-HERO-01-986805218039.jpg",
        featured: false
    },
    {
        id: 4,
        title: "Building Community-Driven Reputation Forums",
        excerpt: "Engage your audience effectively by offering custom Bronze, Silver, and Gold achievements that celebrating helpful contributions.",
        author: "Community Admin",
        date: "Aug 10, 2025",
        category: "Community Guides",
        readTime: "3 min read",
        image: "https://i.postimg.cc/W4NpmmVF/Blog-Featured-Image-1576x1064-1-1.webp",
        featured: false
    },
    {
        id: 5,
        title: "Maximizing SEO and Layout Visibility",
        excerpt: "Simple tips on structuring title headers, indexing metadata tags, and using semantic HTML layouts to get your pages discovered.",
        author: "SEO Manager",
        date: "Aug 05, 2025",
        category: "Tutorials",
        readTime: "7 min read",
        image: "https://i.postimg.cc/66YPTdjb/CCS-7818-WFP285303-BLOG-Natural-Lang-Search-1-HERO-01-986805218039.jpg",
        featured: false
    }
];

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Insights");
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        Swal.fire({
            icon: 'success',
            title: 'Subscribed Successfully!',
            text: 'You have joined our newsletter list. We will send you weekly insights!',
            timer: 2000,
            showConfirmButton: false,
            background: '#1B2435',
            color: '#FFFFFF'
        });
        setEmail("");
    };

    const filteredBlogs = selectedCategory === "All Insights"
        ? blogs
        : blogs.filter(b => b.category === selectedCategory);

    // Get the first featured blog
    const featuredBlog = blogs.find(b => b.featured);
    // Remove the featured blog from the main grid if displaying all items
    const gridBlogs = filteredBlogs.filter(b => b.id !== featuredBlog.id);

    return (
        <div className="min-h-screen pb-24 overflow-hidden bg-[#0B1120] text-[#CBD5E1] font-sans">
            {/* HERO HEADER */}
            <div className="relative pt-16 pb-12 lg:pt-20 px-4 md:px-12 lg:px-8 xl:px-16 max-w-7xl mx-auto text-center">
                {/* Glow effects */}
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#FF8A00]/10 via-[#FF5C5C]/10 to-[#FF4D79]/10 rounded-full filter blur-[120px] -z-10"></div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium text-[#FF8A00] mb-6 shadow-xl backdrop-blur-md">
                    <HiSparkles className="w-4 h-4 text-[#FF5C5C]" />
                    Weekly Tech Updates & Insights
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold heading-display tracking-tight text-white max-w-4xl mx-auto leading-none mb-6">
                    ChatOrbit <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF5C5C] to-[#FF4D79] bg-clip-text text-transparent">Insights & News</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed font-normal">
                    Explore guides, engineering analyses, and community updates to help you get the most out of your collaborative discussion forum.
                </p>
            </div>

            {/* STATIC SECTION 1: CATEGORY SELECTION TABS (NEW) */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16 mb-12 text-center">
                <div className="flex flex-wrap justify-center gap-2.5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 ${
                                selectedCategory === cat
                                    ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] text-white shadow-md shadow-orange-500/20 scale-105 cursor-pointer'
                                    : 'bg-[#1B2435] text-slate-400 border border-slate-850 hover:border-orange-500/20 hover:text-slate-200 cursor-pointer'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16 space-y-16">
                {/* STATIC SECTION 2: FEATURED ARTICLE HERO (NEW) */}
                {selectedCategory === "All Insights" && featuredBlog && (
                    <div className="group relative overflow-hidden rounded-[20px] bg-[#1B2435] border border-slate-800 p-6 sm:p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row gap-8 hover:border-[#FF5C5C]/30 transition-all duration-300">
                        {/* Featured Badge */}
                        <div 
                            style={{
                                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)'
                            }}
                            className="absolute top-0 left-0 text-white text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-br-xl shadow-md heading-display"
                        >
                            Featured
                        </div>

                        {/* Image Side */}
                        <div className="w-full lg:w-[50%] shrink-0 overflow-hidden rounded-xl relative h-[250px] sm:h-[350px]">
                            <img
                                src={featuredBlog.image}
                                alt={featuredBlog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 to-transparent"></div>
                        </div>

                        {/* Content Side */}
                        <div className="flex flex-col justify-between py-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-xs text-[#FF8A00] font-bold uppercase tracking-wider">
                                    <span className="bg-[#FF8A00]/10 border border-[#FF8A00]/20 px-3 py-1 rounded-full">{featuredBlog.category}</span>
                                    <span className="text-slate-500">•</span>
                                    <span className="text-slate-400">{featuredBlog.readTime}</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight heading-display group-hover:text-[#FF8A00] transition-colors duration-250">
                                    {featuredBlog.title}
                                </h2>

                                <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed">
                                    {featuredBlog.excerpt}
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#FF8A00]/10 border border-[#FF8A00]/20 rounded-full text-[#FF8A00]">
                                        <HiUser className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-white">{featuredBlog.author}</h5>
                                        <p className="text-[10px] text-slate-500">{featuredBlog.date}</p>
                                    </div>
                                </div>
                                <button className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#FF8A00] transition-colors cursor-pointer group/btn">
                                    Read Article <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN GRID ARTICLES */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-8 heading-display flex items-center gap-2">
                        <FiBookOpen className="text-[#FF8A00] w-5 h-5" />
                        {selectedCategory === "All Insights" ? "Recent Insights" : `${selectedCategory} Articles`}
                    </h3>

                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(selectedCategory === "All Insights" ? gridBlogs : filteredBlogs).map(blog => (
                                <div 
                                    key={blog.id} 
                                    className="group bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-lg hover:shadow-2xl hover:border-[#FF5C5C]/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Image Container */}
                                    <div className="h-48 overflow-hidden relative">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 bg-[#1B2435]/90 border border-slate-800 text-slate-350 rounded-full backdrop-blur-md">
                                            {blog.category}
                                        </span>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold mb-3">
                                                <HiCalendar className="w-3.5 h-3.5" />
                                                <span>{blog.date}</span>
                                                <span>•</span>
                                                <span>{blog.readTime}</span>
                                            </div>
                                            <h4 className="text-base font-bold text-white leading-snug group-hover:text-[#FF8A00] transition-colors duration-200 line-clamp-2 min-h-[3rem] heading-display">
                                                {blog.title}
                                            </h4>
                                            <p className="text-xs text-[#CBD5E1] mt-3 line-clamp-3 leading-relaxed">
                                                {blog.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4 mt-5 border-t border-slate-850 flex items-center justify-between">
                                            <span className="text-[10px] text-slate-450 font-bold">By {blog.author}</span>
                                            <button className="text-[10px] font-black text-white group-hover:text-[#FF8A00] transition-colors flex items-center gap-1 cursor-pointer">
                                                Read More <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/10 border border-dashed border-slate-855 rounded-3xl">
                            <span className="text-4xl mb-3">🔍</span>
                            <p className="text-center text-slate-400 font-medium">No articles found in this category.</p>
                        </div>
                    )}
                </div>

                {/* STATIC SECTION 3: NEWSLETTER FORM (NEW) */}
                <div 
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,138,0,0.1) 0%, rgba(255,92,92,0.1) 50%, rgba(255,77,121,0.05) 100%)'
                    }}
                    className="border border-[#FF5C5C]/20 p-8 sm:p-12 rounded-[20px] text-center space-y-6 relative overflow-hidden shadow-2xl mt-12"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-orange-500/5 rounded-full filter blur-[80px] -z-10"></div>
                    <div className="p-3 bg-[#FF8A00]/10 border border-[#FF8A00]/20 rounded-2xl w-fit mx-auto text-[#FF8A00] mb-2">
                        <HiMail className="text-3xl" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl heading-display font-bold text-white tracking-tight">Stay inside the Loop</h2>
                    <p className="text-sm text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
                        Join our newsletter to receive weekly technical tutorials, AI trends, customer support case studies, and platform updates.
                    </p>
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8A00] flex-1"
                        />
                        <button 
                            type="submit"
                            style={{
                                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                            }}
                            className="px-6 py-3 rounded-xl text-white font-extrabold text-sm hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Blog;
