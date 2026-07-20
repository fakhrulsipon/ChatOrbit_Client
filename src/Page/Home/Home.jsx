import { useEffect, useState, useRef } from 'react';
import Posts from '../../components/Posts';
import ShowAnnouncements from '../../components/ShowAnnouncements';
import LatestPosts from '../../components/LatestPosts';
import TopVotedPosts from '../../components/TopVotedPosts';
import FAQSection from '../Comments/FAQSection';
import Testimonials from '../../components/Testimonials';
import AllTags from '../../components/AllTags';
import CommunityStats from '../../components/CommunityStats';
import MembershipPreview from '../../components/MembershipPreview';
import { HiChatAlt, HiClock, HiFire, HiSparkles, HiArrowDown } from 'react-icons/hi';
import { FiSearch, FiArrowRight, FiActivity, FiTag, FiAward, FiLock } from 'react-icons/fi';
import { Link } from 'react-router';

const Home = () => {
    const [searchTag, setSearchTag] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'latest' | 'top'
    const [tagInput, setTagInput] = useState('');
    const dashboardRef = useRef(null);

    useEffect(() => {
        document.title = 'Home | ChatOrbit';
    }, []);

    const handleSearch = (tag) => {
        setSearchTag(tag);
        setCurrentPage(1);
        setActiveTab('all');
        if (dashboardRef.current) {
            dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToDashboard = () => {
        if (dashboardRef.current) {
            dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="pb-24 overflow-hidden bg-[#0B1120] text-[#CBD5E1] font-sans">
            {/* HERO SECTION with Glowing Orbs */}
            <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 px-4 md:px-12 lg:px-8 xl:px-16 max-w-7xl mx-auto text-center">
                {/* Stripe/Linear style abstract gradients */}
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#FF8A00]/20 via-[#FF5C5C]/20 to-[#FF4D79]/20 rounded-full filter blur-[120px] -z-10"></div>
                <div className="absolute top-[200px] right-[10%] w-[300px] h-[300px] bg-orange-500/5 rounded-full filter blur-[100px] -z-10 animate-pulse"></div>

                {/* Micro badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium text-[#FF8A00] mb-6 shadow-xl backdrop-blur-md">
                    <HiSparkles className="w-4 h-4 text-[#FF5C5C]" />
                    Real-time discussions for creators
                </div>

                {/* Headline - Space Grotesk 64px */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold heading-display tracking-tight text-white max-w-4xl mx-auto leading-none mb-6">
                    Connect, Share & Expand <br className="hidden sm:inline" />
                    Your <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF5C5C] to-[#FF4D79] bg-clip-text text-transparent">Discussion Orbit</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg lg:text-xl text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
                    A premium startup community hub. Ask questions, explore relevant tags, share knowledge, and earn badges on the ultimate AI-moderated forum.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 max-w-md mx-auto">
                    <button
                        onClick={scrollToDashboard}
                        style={{
                            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                            boxShadow: '0 0 35px rgba(255,138,0,.35)'
                        }}
                        className="w-full sm:w-auto px-8 h-14 rounded-full text-white font-extrabold text-base flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                        Explore Feed <FiArrowRight className="w-5 h-5" />
                    </button>
                    <Link 
                        to="/membership" 
                        className="w-full sm:w-auto px-8 h-14 rounded-full bg-[#1B2435] border border-slate-800 text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-slate-900 active:scale-95 transition-all duration-300"
                    >
                        View Premium
                    </Link>
                </div>

                {/* Integrated Search Bar inside Hero */}
                <div className="max-w-lg mx-auto p-2 bg-[#131C2E]/60 border border-slate-800/80 rounded-full shadow-2xl backdrop-blur-md flex items-center">
                    <div className="relative flex-1 pl-4 flex items-center">
                        <FiSearch className="text-slate-400 w-5 h-5 absolute left-4" />
                        <input
                            type="text"
                            placeholder="Search tag (e.g. React, MERN)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="bg-transparent text-slate-100 placeholder-slate-500 w-full pl-7 pr-3 focus:outline-none text-sm font-medium"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(tagInput)}
                        />
                    </div>
                    <button
                        onClick={() => handleSearch(tagInput)}
                        style={{
                            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)'
                        }}
                        className="px-6 h-10 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* FEATURES SECTION (Section Background: #131C2E, Card Background: #1B2435, Rounded cards: 20px) */}
            <section className="bg-[#131C2E] py-20 lg:py-28 border-y border-slate-900">
                <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
                            Designed for Modern Teams
                        </h2>
                        <p className="text-base text-[#CBD5E1]">
                            Explore high-end features built to connect you with discussions, resources, and badges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-[#1B2435] border border-slate-800/80 p-8 rounded-[20px] shadow-lg hover:shadow-2xl hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF8A00] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FiActivity className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 heading-display">Real-Time Threads</h3>
                                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                                    Share thoughts, ask technical questions, or initiate topics instantly.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-[#1B2435] border border-slate-800/80 p-8 rounded-[20px] shadow-lg hover:shadow-2xl hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF8A00] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FiTag className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 heading-display">Smart Filtering</h3>
                                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                                    Quickly lookup posts by customized tags using the smart searching console.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-[#1B2435] border border-slate-800/80 p-8 rounded-[20px] shadow-lg hover:shadow-2xl hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF8A00] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FiAward className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 heading-display">Reputation System</h3>
                                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                                    Build karma by posting, commenting, and earning user achievements.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group bg-[#1B2435] border border-slate-800/80 p-8 rounded-[20px] shadow-lg hover:shadow-2xl hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF8A00] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FiLock className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 heading-display">VIP Membership</h3>
                                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                                    Unlock unlimited posts and premium badges with Gold membership.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-base text-[#CBD5E1]">
                        Join the community and start collaborating in three simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8 relative">
                    {/* Visual connection line */}
                    <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-slate-800 hidden md:block -z-10"></div>

                    {/* Step 1 */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-[#1B2435] border-2 border-slate-850 text-white font-extrabold heading-display flex items-center justify-center text-2xl mx-auto shadow-xl">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-white heading-display">Create Profile</h3>
                        <p className="text-sm text-[#CBD5E1] max-w-xs mx-auto">
                            Sign up in seconds, set your profile image, and get ready to launch.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-[#1B2435] border-2 border-slate-850 text-white font-extrabold heading-display flex items-center justify-center text-2xl mx-auto shadow-xl">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-white heading-display">Discover Topics</h3>
                        <p className="text-sm text-[#CBD5E1] max-w-xs mx-auto">
                            Filter the live dashboard by tag clusters, newest updates, or popularity.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-[#1B2435] border-2 border-[#FF5C5C] text-[#FF8A00] font-extrabold heading-display flex items-center justify-center text-2xl mx-auto shadow-2xl shadow-orange-500/10">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-white heading-display">Engage & Share</h3>
                        <p className="text-sm text-[#CBD5E1] max-w-xs mx-auto">
                            Post reviews, upvote threads, add responses, and secure achievement badges.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRODUCT PREVIEW / DASHBOARD MOCKUP (Mocking browser shell wrapping real Posts query switcher) */}
            <section ref={dashboardRef} className="py-12 bg-[#131C2E] border-y border-slate-900">
                <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
                            Live Feed Dashboard
                        </h2>
                        <p className="text-base text-[#CBD5E1]">
                            Experience the real-time collaboration preview below. Try searching, filtering by tags, or switching views.
                        </p>
                    </div>

                    {/* Browser Window Mockup */}
                    <div className="bg-[#0B1120] border border-slate-800 rounded-[20px] shadow-2xl overflow-hidden">
                        {/* Windows Title Bar */}
                        <div className="bg-[#131C2E] px-6 py-4 border-b border-slate-850 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 bg-rose-500 rounded-full inline-block"></span>
                                <span className="w-3.5 h-3.5 bg-amber-500 rounded-full inline-block"></span>
                                <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full inline-block"></span>
                            </div>
                            <span className="text-xs font-bold text-slate-500 select-none font-mono">chatorbit-dashboard-v1.0.0</span>
                            <div className="w-14"></div>
                        </div>

                        {/* Interactive Content inside browser shell */}
                        <div className="p-6 sm:p-8 bg-[#0B1120]">
                            {/* Centralized Tab Switcher Section */}
                            <div className="flex justify-center mb-8">
                                <div className="inline-flex bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-1.5 rounded-2xl shadow-sm gap-2">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                            activeTab === 'all'
                                                ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] text-white shadow-md shadow-orange-500/20 scale-105 cursor-pointer'
                                                : 'text-slate-400 hover:text-[#FF8A00] hover:bg-slate-800/40 cursor-pointer'
                                        }`}
                                    >
                                        <HiChatAlt className="w-5 h-5" />
                                        All Discussions
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('latest')}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                            activeTab === 'latest'
                                                ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] text-white shadow-md shadow-orange-500/20 scale-105 cursor-pointer'
                                                : 'text-slate-400 hover:text-[#FF8A00] hover:bg-slate-800/40 cursor-pointer'
                                        }`}
                                    >
                                        <HiClock className="w-5 h-5" />
                                        Latest Posts
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('top')}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                            activeTab === 'top'
                                                ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D79] text-white shadow-md shadow-orange-500/20 scale-105 cursor-pointer'
                                                : 'text-slate-400 hover:text-[#FF8A00] hover:bg-slate-800/40 cursor-pointer'
                                        }`}
                                    >
                                        <HiFire className="w-5 h-5" />
                                        Top Voted
                                    </button>
                                </div>
                            </div>

                            {/* Tab content feed */}
                            <div className="transition-opacity duration-300">
                                {activeTab === 'all' && (
                                    <div className="space-y-6">
                                        <AllTags setSearchTag={handleSearch} setCurrentPage={setCurrentPage} />
                                        <Posts 
                                            searchTag={searchTag} 
                                            setSearchTag={setSearchTag} 
                                            currentPage={currentPage} 
                                            setCurrentPage={setCurrentPage} 
                                        />
                                    </div>
                                )}

                                {activeTab === 'latest' && (
                                    <LatestPosts />
                                )}

                                {activeTab === 'top' && (
                                    <TopVotedPosts />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS, ANNOUNCEMENTS & TESTIMONIALS */}
            <ShowAnnouncements />
            <CommunityStats />
            <Testimonials />
            <MembershipPreview />
            <FAQSection />

            {/* PRE-FOOTER FINAL SIGNUP ACCENT BLOCK */}
            <div className="max-w-5xl mx-auto mt-24 px-4">
                <div 
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,138,0,0.1) 0%, rgba(255,92,92,0.1) 50%, rgba(255,77,121,0.05) 100%)'
                    }}
                    className="border border-[#FF5C5C]/20 p-8 sm:p-16 rounded-[20px] text-center space-y-6 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-orange-500/5 rounded-full filter blur-[80px] -z-10"></div>
                    <h2 className="text-3xl sm:text-4xl heading-display font-bold text-white tracking-tight">Ready to Enter the Orbit?</h2>
                    <p className="text-sm text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
                        Create an account today to publish threads, tag your code queries, upvote useful posts, and earn verified badges.
                    </p>
                    <div className="pt-4">
                        <Link to="/register">
                            <button 
                                style={{
                                    background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                    boxShadow: '0 0 35px rgba(255,138,0,.35)'
                                }}
                                className="px-10 h-14 rounded-full text-white font-extrabold text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                            >
                                Join ChatOrbit Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;