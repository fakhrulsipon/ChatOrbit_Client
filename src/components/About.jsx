import React from "react";
import { FaUsers, FaLightbulb, FaHandshake, FaGlobe, FaShieldAlt, FaRocket, FaFlag } from "react-icons/fa";
import { HiSparkles, HiCheckCircle } from 'react-icons/hi';

const About = () => {
  return (
    <div className="min-h-screen pb-24 overflow-hidden bg-[#0B1120] text-[#CBD5E1] font-sans">
      {/* HERO SECTION with Glowing Orbs */}
      <div className="relative pt-16 pb-12 lg:pt-20 px-4 md:px-12 lg:px-8 xl:px-16 max-w-7xl mx-auto text-center">
        {/* Stripe/Linear style abstract gradients */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#FF8A00]/10 via-[#FF5C5C]/10 to-[#FF4D79]/10 rounded-full filter blur-[120px] -z-10"></div>

        {/* Micro badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium text-[#FF8A00] mb-6 shadow-xl backdrop-blur-md">
          <HiSparkles className="w-4 h-4 text-[#FF5C5C]" />
          About ChatOrbit
        </div>

        {/* Headline - Space Grotesk 64px */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold heading-display tracking-tight text-white max-w-4xl mx-auto leading-none mb-6">
          Empowering Conversations <br className="hidden sm:inline" />
          Across the <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF5C5C] to-[#FF4D79] bg-clip-text text-transparent">Digital Orbit</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed font-normal">
          Learn about our mission, core values, and product roadmap. We are building the ultimate hub for developers, creators, and professionals.
        </p>
      </div>

      {/* SECTION: MISSION & VISION */}
      <section className="bg-[#131C2E] py-16 lg:py-24 border-y border-slate-900 w-full">
        <div className="max-w-6xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="relative overflow-hidden rounded-[20px] bg-[#1B2435] border border-slate-800 p-8 lg:p-12 shadow-lg flex flex-col justify-between hover:border-[#FF5C5C]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF8A00] to-[#FF5C5C]"></div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white tracking-tight heading-display">Our Mission</h2>
                <p className="text-[#CBD5E1] leading-relaxed text-sm lg:text-base">
                  Our mission is to create a supportive, real-time environment where members can share knowledge, collaborate on projects, and grow together. We aim to empower everyone, from beginners to experts, to contribute and learn.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative overflow-hidden rounded-[20px] bg-[#1B2435] border border-slate-800 p-8 lg:p-12 shadow-lg flex flex-col justify-between hover:border-[#FF5C5C]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF5C5C] to-[#FF4D79]"></div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white tracking-tight heading-display">Our Vision</h2>
                <p className="text-[#CBD5E1] leading-relaxed text-sm lg:text-base">
                  We envision a community where everyone feels empowered to connect, collaborate, and make meaningful contributions. Knowledge sharing, profile reputation, and personal growth are at the heart of everything we build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHY JOIN OUR COMMUNITY */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
            Why Join Our Community?
          </h2>
          <p className="text-base text-[#CBD5E1]">
            Work together, discover knowledge, and connect with professionals across the globes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 text-center">
            <div className="p-4 bg-[#FF8A00]/10 border border-[#FF8A00]/20 rounded-2xl mb-5 text-[#FF8A00]">
              <FaUsers className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white heading-display">Collaborate</h3>
            <p className="text-[#CBD5E1] text-sm leading-relaxed">
              Work with like-minded members on projects, share ideas, and build products together.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 text-center">
            <div className="p-4 bg-[#FF5C5C]/10 border border-[#FF5C5C]/20 rounded-2xl mb-5 text-[#FF5C5C]">
              <FaLightbulb className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white heading-display">Learn</h3>
            <p className="text-[#CBD5E1] text-sm leading-relaxed">
              Gain knowledge from community-driven tutorials, Q&A threads, and real-time guides.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 text-center">
            <div className="p-4 bg-[#FF4D79]/10 border border-[#FF4D79]/20 rounded-2xl mb-5 text-[#FF4D79]">
              <FaHandshake className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white heading-display">Connect</h3>
            <p className="text-[#CBD5E1] text-sm leading-relaxed">
              Build professional relationships, exchange technical tips, and secure verified badges.
            </p>
          </div>
        </div>
      </section>

      {/* STATIC SECTION 1: CORE VALUES (NEW) */}
      <section className="bg-[#131C2E] py-20 lg:py-24 border-y border-slate-900 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-base text-[#CBD5E1]">
              The driving principles that guide how we build, moderate, and scale our knowledge orbit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] flex flex-col items-start gap-4">
              <div className="text-[#FF8A00] text-2xl"><FaGlobe /></div>
              <h3 className="text-lg font-bold text-white heading-display">Open Knowledge</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                We believe software and creative knowledge should be accessible to all without gatekeeping.
              </p>
            </div>
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] flex flex-col items-start gap-4">
              <div className="text-[#FF5C5C] text-2xl"><FaShieldAlt /></div>
              <h3 className="text-lg font-bold text-white heading-display">Trust & Integrity</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Safe, respectful, and AI-assisted moderation keeps our threads constructive and secure.
              </p>
            </div>
            <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] flex flex-col items-start gap-4">
              <div className="text-[#FF4D79] text-2xl"><FaRocket /></div>
              <h3 className="text-lg font-bold text-white heading-display">Rapid Innovation</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Connecting members globally accelerates collaboration, bug-fixing, and design feedback loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATIC SECTION 2: PRODUCT ROADMAP (NEW) */}
      <section className="py-20 lg:py-24 max-w-5xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16 w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
            Product Roadmap
          </h2>
          <p className="text-base text-[#CBD5E1]">
            Our vision for the future. See what we have built and what lies ahead in the orbit lifecycle.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-800 before:-z-10">
          {/* Phase 1 */}
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-6 relative">
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF8A00] border-4 border-[#0B1120] shadow-md"></div>
            <div className="w-full sm:w-[45%] bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-md">
              <span className="text-xs font-bold text-[#FF8A00] uppercase">Phase 1 (Completed)</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2 heading-display">Platform Launch</h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Initial deployment of discussion boards, tags mapping, reputation systems, and member accounts.
              </p>
            </div>
            <div className="hidden sm:block w-[45%]" />
          </div>

          {/* Phase 2 */}
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-6 relative">
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF5C5C] border-4 border-[#0B1120] shadow-md"></div>
            <div className="hidden sm:block w-[45%]" />
            <div className="w-full sm:w-[45%] bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-md">
              <span className="text-xs font-bold text-[#FF5C5C] uppercase">Phase 2 (In Progress)</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2 heading-display">Gold VIP & Stripe</h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Rollout of payment pathways, verified gold user profile badges, and priority indexing.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-6 relative">
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-750 border-4 border-[#0B1120] shadow-md"></div>
            <div className="w-full sm:w-[45%] bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] shadow-md opacity-80">
              <span className="text-xs font-bold text-slate-500 uppercase">Phase 3 (Upcoming)</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2 heading-display">Mobile App Client</h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Developing React Native applications for Android and iOS systems to read and share on the go.
              </p>
            </div>
            <div className="hidden sm:block w-[45%]" />
          </div>
        </div>
      </section>

      {/* STATIC SECTION 3: COMMUNITY GUIDELINES (NEW) */}
      <section className="bg-[#131C2E] py-20 lg:py-24 border-y border-slate-900 w-full">
        <div className="max-w-4xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
          <div className="bg-[#1B2435] border border-slate-800 p-8 sm:p-12 rounded-[20px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-[#FF4D79]/5 rounded-full filter blur-[80px] -z-10"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FF4D79]/10 border border-[#FF4D79]/20 rounded-xl text-[#FF4D79]">
                <FaFlag className="text-xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight heading-display">Community Guidelines</h2>
            </div>

            <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6">
              To maintain a supportive, informative environment for everyone on ChatOrbit, we enforce basic standards of engagement:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-start gap-2.5">
                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-200">Respect other members and viewpoints</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-200">Avoid duplicate or spam discussion threads</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-200">Use relevant tags to index your topics</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-200">Share informative, construct feedback</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
