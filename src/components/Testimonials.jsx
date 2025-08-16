import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    quote: "ChatOrbit helped me share my ideas easily and connect with like-minded people.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Michael Smith",
    quote: "I love how intuitive and interactive ChatOrbit is. A great community for discussions!",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Sara Lee",
    quote: "Thanks to ChatOrbit, I can engage in meaningful conversations and learn from others.",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
];

const Testimonials = () => {
  return (
    <div className="mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Hear from our community members about their experience with ChatOrbit.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
                "{testimonial.quote}"
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
