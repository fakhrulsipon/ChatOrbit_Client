import React from 'react';
import { Link } from 'react-router';
import { HiSparkles, HiCheckCircle } from 'react-icons/hi';

const MembershipPreview = () => {
    return (
        <section className="bg-[#131C2E] py-20 lg:py-28 border-y border-slate-900 w-full mt-16 lg:mt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16">
                {/* Main Premium Card Wrapper */}
                <div className="relative overflow-hidden rounded-[20px] bg-[#1B2435] border border-slate-800 p-8 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Decorative glowing gradient blobs */}
                    <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF8A00]/5 rounded-full filter blur-[100px] -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FF4D79]/5 rounded-full filter blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                    {/* Left Side: Content & Features list */}
                    <div className="flex-1 space-y-6 lg:max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FF8A00] text-xs font-bold tracking-wider uppercase heading-display">
                            <HiSparkles className="w-4 h-4 text-[#FF5C5C]" />
                            Premium Membership
                        </div>
                        
                        <h2 className="text-3xl lg:text-[48px] font-bold text-white heading-display tracking-tight leading-none">
                            Unlock the Full Power of <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF5C5C] to-[#FF4D79] bg-clip-text text-transparent">ChatOrbit Gold</span>
                        </h2>
                        
                        <p className="text-[#CBD5E1] text-sm lg:text-base leading-relaxed font-medium">
                            Elevate your community experience. Free members are capped at 5 posts. Upgrade to Gold to enjoy unrestricted sharing, special recognition, and premium perks.
                        </p>

                        <ul className="space-y-4 pt-2">
                            <li className="flex items-start gap-3">
                                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                                <div className="text-sm font-semibold text-white">
                                    Unlimited Discussion Posts <span className="text-[#94A3B8] font-normal">(Never worry about the 5-post limit)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                                <div className="text-sm font-semibold text-white">
                                    Gold Badge Recognition <span className="text-[#94A3B8] font-normal">(Stand out with a special verified badge on all posts)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                                <div className="text-sm font-semibold text-white">
                                    Priority Thread Visibility <span className="text-[#94A3B8] font-normal">(Your posts get indexed and displayed with priority ranking)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <HiCheckCircle className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                                <div className="text-sm font-semibold text-white">
                                    Exclusive Tags Access <span className="text-[#94A3B8] font-normal">(Access unique discussion categories and premium tags)</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side: High-converting pricing card */}
                    <div className="w-full lg:w-[360px] shrink-0">
                        <div className="group relative bg-[#0B1120] border border-slate-800 p-8 rounded-[20px] shadow-2xl flex flex-col justify-between text-center transition-all duration-300 hover:border-[#FF5C5C]/50 hover:-translate-y-1.5">
                            {/* Glow corner flag */}
                            <div className="absolute top-0 right-0 bg-[#FF8A00] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl rounded-tr-[18px]">
                                Best Value
                            </div>

                            <div className="mb-8">
                                <h4 className="text-[#94A3B8] text-xs font-bold tracking-widest uppercase mb-1">Lifetime Membership</h4>
                                <div className="flex items-baseline justify-center gap-1 my-3">
                                    <span className="text-[#94A3B8] text-2xl font-bold font-sans">$</span>
                                    <span className="text-5xl font-extrabold text-white heading-display tracking-tight">10</span>
                                    <span className="text-[#94A3B8] text-sm font-bold">/one-time</span>
                                </div>
                                <p className="text-xs text-[#94A3B8] font-medium">Gain permanent premium features instantly.</p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-900">
                                <Link to="/memberShip">
                                    <button 
                                        style={{
                                            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                                            boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                                        }}
                                        className="btn w-full text-white font-extrabold text-sm py-4 rounded-xl border-none shadow-lg active:scale-98 transition-all duration-300 cursor-pointer"
                                    >
                                        Become a Gold Member
                                    </button>
                                </Link>
                                <p className="text-[11px] text-[#94A3B8] font-medium">Secure credit card payment processed by Stripe.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MembershipPreview;
