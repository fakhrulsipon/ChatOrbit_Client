import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    quote:
      "ChatOrbit helped me share my ideas easily and connect with like-minded people.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Michael Smith",
    quote:
      "I love how intuitive and interactive ChatOrbit is. A great community for discussions!",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Sara Lee",
    quote:
      "Thanks to ChatOrbit, I can engage in meaningful conversations and learn from others.",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    name: "David Wilson",
    quote:
      "An amazing platform to grow, learn, and network with passionate people around the world.",
    avatar: "https://i.pravatar.cc/150?img=22",
  },
];

const Testimonials = () => {
  return (
    <div className="mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
          What Our Users Say
        </h2>
        <p className="text-slate-450 mb-8 max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
          Hear from our community members about their experience with ChatOrbit.
        </p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/60 border border-slate-850/80 rounded-3xl p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="absolute top-4 right-6 text-4xl text-indigo-805/30 font-serif leading-none select-none opacity-60">“</div>
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 border-2 border-slate-800 shadow-md ring-4 ring-indigo-950/40 group-hover:ring-indigo-900/40 transition-all duration-300 object-cover"
              />
              <p className="text-slate-400 text-center mb-5 italic text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>
              <h3 className="text-base font-bold text-white mt-auto">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
