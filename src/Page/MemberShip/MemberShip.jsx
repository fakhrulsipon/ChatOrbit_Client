import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useEffect } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)
const MemberShip = () => {

     useEffect(() => {
            document.title = 'MemberShip | ChatOrbit';
        }, []);
        
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default MemberShip;