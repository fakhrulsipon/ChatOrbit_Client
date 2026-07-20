import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { HiSparkles, HiShieldCheck } from 'react-icons/hi';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const amount = 10;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        setProcessing(true);
        setError('');

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (stripeError) {
            setError(stripeError.message);
            setProcessing(false);
            return;
        }

        try {
            // step-2: create payment intent
            const res = await axios.post('https://chatorbit-server.vercel.app/create-payment-intent', {
                amountInCents,
            });
            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Member update API call
                    const patchRes = await axios.patch(`https://chatorbit-server.vercel.app/users/member/${user?.email}`);
                    if (patchRes.data.modifiedCount) {
                        Swal.fire({
                            title: 'Upgrade Successful! 🚀',
                            text: 'Welcome to ChatOrbit Gold. You have unlocked unlimited posting!',
                            icon: 'success',
                            confirmButtonText: 'Go to Dashboard',
                            background: '#1B2435',
                            color: '#FFFFFF',
                            confirmButtonColor: '#FF8A00'
                        }).then(() => {
                            navigate('/dashboard/addPost');
                        });
                    } else {
                        // User is already a member or modifiedCount is 0, still redirect
                        Swal.fire({
                            title: 'Already Gold Member!',
                            text: 'Redirecting you to add post dashboard.',
                            icon: 'info',
                            confirmButtonText: 'Proceed',
                            background: '#1B2435',
                            color: '#FFFFFF',
                            confirmButtonColor: '#FF8A00'
                        }).then(() => {
                            navigate('/dashboard/addPost');
                        });
                    }
                }
            }
        } catch (err) {
            setError(err.message || 'Payment processing failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-250px)] flex items-center justify-center p-4 bg-[#0B1120]">
            <div className="relative max-w-md w-full p-8 bg-[#1B2435] border border-slate-800 rounded-[20px] shadow-2xl overflow-hidden">
                {/* Glow effects */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-orange-500/10 rounded-full filter blur-2xl"></div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] text-xs font-bold uppercase tracking-wider mb-4 heading-display">
                        <HiSparkles className="w-4 h-4 text-[#FF5C5C]" />
                        Secure Checkout
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white heading-display tracking-tight mb-2">
                        Get ChatOrbit Gold
                    </h2>
                    
                    <div className="my-5 flex items-baseline justify-center gap-1">
                        <span className="text-[#94A3B8] text-2xl font-bold font-sans">$</span>
                        <span className="text-5xl font-extrabold text-white heading-display tracking-tight">10</span>
                        <span className="text-[#94A3B8] text-sm font-bold">/one-time</span>
                    </div>

                    <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-xs mx-auto">
                        Please enter your credit card or debit card details below to unlock unlimited posting privileges.
                    </p>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold tracking-wider text-[#94A3B8] uppercase">Card Information</label>
                        <CardElement 
                            options={{
                                style: {
                                    base: {
                                        fontSize: '15px',
                                        color: '#FFFFFF',
                                        fontFamily: 'Inter, sans-serif',
                                        '::placeholder': {
                                            color: '#576F93',
                                        },
                                    },
                                    invalid: {
                                        color: '#FF5C5C',
                                    },
                                },
                            }}
                            className='bg-[#0B1120] border border-slate-800 p-4 rounded-xl text-white focus-within:border-[#FF8A00] transition-colors shadow-inner' 
                        />
                    </div>

                    <button
                        style={{
                            background: 'linear-gradient(135deg, #FF8A00 0%, #FF5C5C 55%, #FF4D79 100%)',
                            boxShadow: '0 0 25px rgba(255,138,0,0.25)'
                        }}
                        className='btn border-none w-full text-white font-extrabold text-sm py-4 h-12 rounded-xl transition-all duration-300 active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2'
                        type="submit"
                        disabled={!stripe || processing}
                    >
                        {processing ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Processing...
                            </>
                        ) : (
                            `Pay $${amount}.00`
                        )}
                    </button>
                    
                    {error && (
                        <p className='text-xs text-[#FF5C5C] font-semibold text-center mt-2 leading-relaxed bg-[#FF5C5C]/5 border border-[#FF5C5C]/20 p-2.5 rounded-xl'>
                            ⚠️ {error}
                        </p>
                    )}
                </form>

                {/* Footer security note */}
                <div className="mt-8 pt-6 border-t border-slate-900/60 flex items-center justify-center gap-2 text-[10px] text-[#94A3B8] font-semibold">
                    <HiShieldCheck className="text-[#FF8A00] w-4 h-4" />
                    <span>Secure SSL Encrypted Stripe Payment</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;