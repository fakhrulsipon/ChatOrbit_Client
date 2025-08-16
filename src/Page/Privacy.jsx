// src/pages/PrivacyPolicy.jsx
import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen my-8 lg:my-12 xl:my-16 px-4 md:px-12 lg:px-8 xl:px-16">
            <div className="max-w-4xl mx-auto p-10 rounded-3xl">
                <h1 className="text-4xl font-semibold text-blue-600 mb-8 text-center">
                    Privacy Policy
                </h1>

                <p className="text-gray-700 mb-6">
                    At <strong>Chatorbit</strong>, your privacy is our top priority. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-6">
                    We may collect personal information such as your name, email address, and any data you provide while using our services. We also collect non-personal information like browser type, pages visited, and website usage patterns.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-6">
                    The information we collect is used to improve our services, personalize your experience, communicate updates, and provide customer support. We do not sell your personal information to third parties.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Cookies and Tracking</h2>
                <p className="text-gray-700 mb-6">
                    Chatorbit may use cookies and similar technologies to enhance user experience, analyze site traffic, and understand user behavior.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-6">
                    We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Third-Party Services</h2>
                <p className="text-gray-700 mb-6">
                    Our website may contain links to third-party services. We are not responsible for the privacy practices of these external sites.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Changes to This Policy</h2>
                <p className="text-gray-700 mb-6">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with the date of the latest revision.
                </p>

                <p className="text-gray-700 mt-10">
                    If you have any questions about this Privacy Policy, please contact us at <strong>support@chatorbit.com</strong>.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
