import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 items-center gap-10">
        
        {/* Text Content */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-snug">
            Welcome to <span className="text-blue-500">ChatOrbit</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Connect, Share, and Explore the community with meaningful conversations.
          </p>

          <Link to="/login">
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>

        {/* Banner Image / Illustration */}
        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/ZKF6tpHj/Top-5-Best-Word-Press-Forum-Plugins-To-Build-Your-Community-1.jpg" 
            alt="Chat Community"
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
