// src/pages/About.jsx
import React from "react";
import { FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center py-24 px-5 space-y-20">
      {/* Page Title */}
      <h1 className="text-6xl font-bold text-gray-800 text-center mb-10">
        About Our Community
      </h1>

      {/* Section 1: Mission */}
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-12 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Our mission is to create a supportive environment where members can share knowledge, collaborate on projects, and grow together. We aim to empower every member, from beginners to experts, to contribute and learn.
        </p>
      </section>

      {/* Section 2: Vision */}
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-12 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We envision a community where everyone feels empowered to connect, collaborate, and make meaningful contributions. Knowledge sharing and personal growth are at the heart of everything we do.
        </p>
      </section>

      {/* Section 3: Team */}
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-12 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">Our Team</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Our team is made up of passionate individuals committed to supporting our members. From organizing events to sharing insights, we work hard to build an engaging, friendly, and collaborative environment.
        </p>
      </section>

      {/* Section 4: Why Join Our Community */}
      <section className="w-full max-w-6xl flex flex-col items-center space-y-12">
        <h2 className="text-5xl font-bold text-blue-600 mb-8 text-center">Why Join Our Community?</h2>
        <div className="grid md:grid-cols-3 gap-10 w-full">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-8 bg-gradient-to-tr from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center">
            <FaUsers className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Collaborate</h3>
            <p className="text-gray-700">
              Work with like-minded members on projects, share ideas, and learn together.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center p-8 bg-gradient-to-tr from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center">
            <FaLightbulb className="text-5xl text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Learn</h3>
            <p className="text-gray-700">
              Gain knowledge from tutorials, guides, and community experiences.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center p-8 bg-gradient-to-tr from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center">
            <FaHandshake className="text-5xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-700">
              Build relationships with other members, share tips, and get support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
