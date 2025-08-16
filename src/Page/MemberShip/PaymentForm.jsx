import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message)
        }
        else {
            setError('')
            console.log('payment method', paymentMethod)

            // step-2: create payment intent
            const res = await axios.post('http://localhost:5000/create-payment-intent', {
                amountInCents,

            })
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
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    // Member update API call
                    axios.patch(` http://localhost:5000/users/member/${user?.email}`)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                Swal.fire({
                                    title: 'Payment Successful!',
                                    text: 'You are now a Gold Member.',
                                    icon: 'success',
                                    confirmButtonText: 'Go to Dashboard'
                                })
                                    .then(() => {
                                        navigate('/dashboard/addPost');
                                    });
                            }

                        })
                        .catch(err => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Membership Update Failed',
                                text: err.message || 'Something went wrong. Please try again later.'
                            });
                        });

                }
            }
        }
    };
    return (
        <div className="h-[calc(100vh-295px)] flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 bg-white rounded shadow-lg">
                {/* Static Text Above Form */}
                <p className="text-gray-700 mb-4 text-center">
                    Please enter your payment details below to complete the transaction.
                </p>

                {/* Payment Form */}
                <form onSubmit={handleSubmit}>
                    <CardElement className='border p-2 rounded mb-4' />
                    <button
                        className='btn bg-blue-400 hover:bg-blue-500 w-full text-white'
                        type="submit"
                        disabled={!stripe}
                    >
                        Pay {amount}
                    </button>
                    {error && <p className='text-red-600 mt-2'>{error}</p>}
                </form>

                {/* Static Text Below Form */}
                <p className="text-gray-500 mt-4 text-sm text-center">
                    Your payment is secure and encrypted. We do not store your card details.
                </p>
            </div>
        </div>

    );
};

export default PaymentForm;