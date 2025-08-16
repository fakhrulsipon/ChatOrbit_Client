// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router';

const blogs = [
    {
        id: 1,
        title: "How Chatbots are Transforming Customer Support",
        excerpt: "Explore how AI chatbots are revolutionizing customer support, improving response time and customer satisfaction.",
        author: "Chatorbit Team",
        date: "2025-08-16",
        image: "https://i.postimg.cc/W4NpmmVF/Blog-Featured-Image-1576x1064-1-1.webp"
    },
    {
        id: 2,
        title: "Top AI Tools to Boost Productivity in 2025",
        excerpt: "Discover the latest AI tools that can enhance your productivity and automate everyday tasks efficiently.",
        author: "Chatorbit Team",
        date: "2025-08-15",
        image: "https://i.postimg.cc/V6PxBmn7/images-2.jpg"
    },
    {
        id: 3,
        title: "Understanding Natural Language Processing",
        excerpt: "Learn the basics of NLP and how it powers modern chatbots and virtual assistants.",
        author: "Chatorbit Team",
        date: "2025-08-14",
        image: "https://i.postimg.cc/66YPTdjb/CCS-7818-WFP285303-BLOG-Natural-Lang-Search-1-HERO-01-986805218039.jpg"
    },
];

const Blog = () => {
    return (
        <div className="min-h-screen my-8 lg:my-12 xl:my-16 px-4 md:px-12 lg:px-8 xl:px-16">
            <div className="max-w-5xl mx-auto">
                <h1 className="md:text-4xl text-3xl font-semibold text-center text-blue-600 mb-12">
                    Chatorbit Insights
                </h1>

                <div className="space-y-16">
                    {blogs.map(blog => (
                        <div key={blog.id} className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2 flex-shrink-0">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="rounded-3xl shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h2 className="md:text-2xl text-xl font-bold text-gray-800">{blog.title}</h2>
                                <p className="text-gray-600 mt-4">{blog.excerpt}</p>
                                <div className="mt-6 flex justify-between items-center text-gray-500 text-sm">
                                    <span>By {blog.author}</span>
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
