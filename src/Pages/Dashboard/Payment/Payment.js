import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);


const Payment = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const { data: booking, isLoading } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://the-story-keeper-server.vercel.app/${type}/${id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    if (isLoading) {
        return <div className='flex justify-center my-6'>
            <button className="btn loading">loading</button>
        </div>;
    }

    const { price, productName, image } = booking;
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Payment for {productName} - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={image} className="max-w-xs rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Payment for {productName}</h1>
                        <p className="py-6">Please pay <strong>${price}</strong> before proceeding further</p>
                        <div className='my-12 w-96'>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    booking={booking}
                                />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Payment;