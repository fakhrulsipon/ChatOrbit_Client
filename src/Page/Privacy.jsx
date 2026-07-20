import React from 'react';
import { HiSparkles, HiShieldCheck, HiEye, HiDocumentReport } from 'react-icons/hi';
import { FaCookieBite, FaUserShield, FaExclamationTriangle } from 'react-icons/fa';

const Privacy = () => {
    return (
        <div className="min-h-screen pb-6 sm:pb-8 overflow-hidden bg-[#0B1120] text-[#CBD5E1] font-sans">
            {/* HERO SECTION with Glowing Orbs */}
            <div className="relative pt-16 pb-12 lg:pt-20 px-4 md:px-12 lg:px-8 xl:px-16 max-w-7xl mx-auto text-center">
                {/* Stripe/Linear style abstract gradients */}
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#FF8A00]/10 via-[#FF5C5C]/10 to-[#FF4D79]/10 rounded-full filter blur-[120px] -z-10"></div>

                {/* Micro badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium text-[#FF8A00] mb-6 shadow-xl backdrop-blur-md">
                  <HiSparkles className="w-4 h-4 text-[#FF5C5C]" />
                  Trust & Security Center
                </div>

                {/* Headline - Space Grotesk 64px */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold heading-display tracking-tight text-white max-w-4xl mx-auto leading-none mb-6">
                  ChatOrbit <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF5C5C] to-[#FF4D79] bg-clip-text text-transparent">Privacy Policy</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg lg:text-xl text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed font-normal">
                  Your trust is our top priority. Learn how we collect, use, process, and safeguard your personal details when utilizing our discussion boards.
                </p>
            </div>

            {/* CORE POLICY CARD CONTENT */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 mb-16">
                <div className="bg-[#1B2435] border border-slate-800 p-8 sm:p-12 rounded-[20px] shadow-2xl relative overflow-hidden space-y-8">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-[#FF8A00]/5 rounded-full filter blur-[80px] -z-10"></div>
                    
                    <p className="text-sm leading-relaxed text-[#CBD5E1]">
                        At <strong>Chatorbit</strong>, your privacy is our top priority. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                    </p>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white heading-display">1. Information We Collect</h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                            We may collect personal information such as your name, email address, profile picture, and any content you post to our forums. We also collect automated logs including your browser type, IP address, page views, and navigation metrics.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white heading-display">2. How We Use Your Information</h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                            The information we collect is used to power real-time interactions, display achievements, index your questions by tag categories, analyze platform stability, and send updates. We do not rent or sell your details to marketing agencies.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white heading-display">3. Data Security</h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                            We implement TLS/SSL encryptions, firewalls, and token-based authentication protocols to keep your account safe. However, please remember that no web storage or wireless transmission is completely impenetrable.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white heading-display">4. Third-Party Connections</h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                            Our database connects securely with Vercel for routing and Stripe for payment integrations. We are not responsible for the independent practices or cookie policies of these external services.
                        </p>
                    </div>
                </div>
            </section>

            {/* STATIC SECTION 1: PRIVACY COMPLIANCE CARD GRID (NEW) */}
            <section className="bg-[#131C2E] py-20 lg:py-24 border-y border-slate-900 w-full mb-16">
                <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-[48px] heading-display font-bold text-white mb-4 tracking-tight">
                            Privacy Compliance
                        </h2>
                        <p className="text-base text-[#CBD5E1]">
                            We follow strict regulatory standards to secure and manage user data globally.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] flex flex-col items-start gap-4">
                            <div className="p-3 bg-[#FF8A00]/10 border border-[#FF8A00]/20 rounded-xl text-[#FF8A00]">
                                <HiShieldCheck className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white heading-display">GDPR Compliance</h3>
                            <p className="text-xs text-[#CBD5E1] leading-relaxed">
                                Under the European General Data Protection Regulation, EU users can request access to, edit, or completely erase their records at any time.
                            </p>
                        </div>
                        <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] flex flex-col items-start gap-4">
                            <div className="p-3 bg-[#FF5C5C]/10 border border-[#FF5C5C]/20 rounded-xl text-[#FF5C5C]">
                                <HiEye className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white heading-display">CCPA Standards</h3>
                            <p className="text-xs text-[#CBD5E1] leading-relaxed">
                                California Consumer Privacy Act guarantees state residents the right to opt-out of data collection and review what personal items are indexed.
                            </p>
                        </div>
                        <div className="bg-[#1B2435] border border-slate-800 p-8 rounded-[20px] flex flex-col items-start gap-4">
                            <div className="p-3 bg-[#FF4D79]/10 border border-[#FF4D79]/20 rounded-xl text-[#FF4D79]">
                                <HiDocumentReport className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white heading-display">COPPA Protection</h3>
                            <p className="text-xs text-[#CBD5E1] leading-relaxed">
                                In compliance with Children's Online Privacy Protection, ChatOrbit does not collect personal data from anyone under the age of 13.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATIC SECTION 2: COOKIES CONSENT MATRIX (NEW) */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 mb-16">
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl heading-display font-bold text-white mb-3">
                        Cookies & Tracking Consent
                    </h2>
                    <p className="text-xs text-[#CBD5E1]">
                        We categorize cookies transparently to allow user choice on tracking elements.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] flex gap-4">
                        <div className="text-[#FF8A00] text-xl shrink-0 mt-0.5"><FaCookieBite /></div>
                        <div>
                            <h4 className="text-sm font-bold text-white heading-display">Essential Cookies</h4>
                            <p className="text-[11px] text-[#CBD5E1] mt-1 leading-relaxed">
                                Required for logging in, routing endpoints, keeping accounts active, and security validations. Cannot be disabled.
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#1B2435] border border-slate-800 p-6 rounded-[20px] flex gap-4">
                        <div className="text-[#FF5C5C] text-xl shrink-0 mt-0.5"><FaUserShield /></div>
                        <div>
                            <h4 className="text-sm font-bold text-white heading-display">Analytics Tracking</h4>
                            <p className="text-[11px] text-[#CBD5E1] mt-1 leading-relaxed">
                                Helps us study site page-loads, visitor flow, and click patterns. Used purely to upgrade user dashboard efficiency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATIC SECTION 3: DATA SUBJECT ACCESS REQUEST (NEW) */}
            <section className="bg-[#131C2E] py-20 lg:py-24 border-y border-slate-900 w-full">
                <div className="max-w-4xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
                    <div className="bg-[#1B2435] border border-[#FF5C5C]/20 p-8 sm:p-12 rounded-[20px] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-[#FF4D79]/5 rounded-full filter blur-[80px] -z-10"></div>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[#FF4D79]/10 border border-[#FF4D79]/20 rounded-xl text-[#FF4D79]">
                                <FaExclamationTriangle className="text-xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight heading-display">Manage Your Data</h2>
                        </div>

                        <p className="text-xs text-[#CBD5E1] leading-relaxed mb-6">
                            If you would like to receive a exported copy of all forum discussions, votes, and images associated with your profile, or if you request a permanent erasure of your account details, please file a request.
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
                            <div className="text-xs font-semibold text-slate-350">
                                Email requests: <strong className="text-white">support@chatorbit.com</strong>
                            </div>
                            <a 
                                href="mailto:support@chatorbit.com?subject=Data Access Request"
                                style={{
                                    background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                    boxShadow: '0 0 20px rgba(255,138,0,0.15)'
                                }}
                                className="inline-flex items-center px-6 py-2.5 text-white text-xs font-bold rounded-xl hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
                            >
                                Send Request
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
