import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const {user} = use(AuthContext);

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
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,

            })
            console.log('res from intent', res)
            
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
                // Show error to your customer
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    // Show a success message to your customer
                    console.log('payment successfull')
                }
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 border rounded shadow-lg'>
                <CardElement className='border p-2 rounded mb-4'></CardElement>
                <button className='btn btn-primary w-full' type="submit" disabled={!stripe}>
                    Pay {amount}
                </button>
                {
                    error && <p className='text-red-600'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;