import { Link } from 'react-router';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#FDE68A] via-[#FCA5A5] to-[#C4B5FD] px-4">
            <div className="text-center bg-white bg-opacity-80 p-10 rounded-3xl shadow-2xl max-w-xl w-full border border-purple-300">
                <div className="mb-4">
                    <FaExclamationTriangle className="text-6xl text-red-500 mx-auto animate-bounce drop-shadow-md" />
                </div>

                <h1 className="text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 leading-none drop-shadow-lg">
                    404
                </h1>

                <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">Page Not Found</h2>
                <p className="text-gray-600 text-lg mb-6">
                    Sorry, we couldn't find the page you're looking for. It might have been removed or the URL is incorrect.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
                >
                    ⬅ Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
