// src/pages/About.jsx
import React from "react";
import { FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen my-8 lg:my-12 xl:my-16 px-4 md:px-12 lg:px-8 xl:px-16 flex flex-col items-center space-y-16">
      {/* Page Title */}
      <h1 className="text-3xl lg:text-5xl font-black text-white text-center tracking-tight mb-2">
        About Our Community
      </h1>
      <p className="text-slate-450 max-w-xl text-center text-sm lg:text-base leading-relaxed">
        We build spaces for collaboration, learning, and sharing insights. Learn more about our vision, mission, and the team driving ChatOrbit.
      </p>

      {/* Section 1: Mission */}
      <section className="w-full max-w-4xl bg-slate-900/30 backdrop-blur-md border border-slate-850/80 rounded-3xl shadow-sm p-8 lg:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
        <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">Our Mission</h2>
        <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
          Our mission is to create a supportive environment where members can share knowledge, collaborate on projects, and grow together. We aim to empower every member, from beginners to experts, to contribute and learn.
        </p>
      </section>

      {/* Section 2: Vision */}
      <section className="w-full max-w-4xl bg-slate-900/30 backdrop-blur-md border border-slate-850/80 rounded-3xl shadow-sm p-8 lg:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
        <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">Our Vision</h2>
        <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
          We envision a community where everyone feels empowered to connect, collaborate, and make meaningful contributions. Knowledge sharing and personal growth are at the heart of everything we do.
        </p>
      </section>

      {/* Section 3: Team */}
      <section className="w-full max-w-4xl bg-slate-900/30 backdrop-blur-md border border-slate-850/80 rounded-3xl shadow-sm p-8 lg:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
        <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">Our Team</h2>
        <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
          Our team is made up of passionate individuals committed to supporting our members. From organizing events to sharing insights, we work hard to build an engaging, friendly, and collaborative environment.
        </p>
      </section>

      {/* Section 4: Why Join Our Community */}
      <section className="w-full max-w-5xl flex flex-col items-center space-y-10 pt-4">
        <h2 className="text-3xl font-extrabold text-white tracking-tight text-center">Why Join Our Community?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-8 bg-slate-900/30 backdrop-blur-md border border-slate-850/80 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center">
            <div className="p-4 bg-blue-950/40 border border-blue-900/30 rounded-2xl mb-5">
              <FaUsers className="text-3xl text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Collaborate</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Work with like-minded members on projects, share ideas, and learn together.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center p-8 bg-slate-900/30 backdrop-blur-md border border-slate-850/80 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center">
            <div className="p-4 bg-amber-950/40 border border-amber-900/30 rounded-2xl mb-5">
              <FaLightbulb className="text-3xl text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Learn</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gain knowledge from tutorials, guides, and community experiences.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center p-8 bg-slate-900/30 backdrop-blur-md border border-slate-850/80 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center">
            <div className="p-4 bg-emerald-950/40 border border-emerald-900/30 rounded-2xl mb-5">
              <FaHandshake className="text-3xl text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Connect</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Build relationships with other members, share tips, and get support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
