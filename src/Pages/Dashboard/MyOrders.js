import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const url = `https://the-story-keeper-server.vercel.app/bookings?email=${user?.email}`

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <div className='flex justify-center my-6'>
            <button className="btn loading">loading</button>
        </div>;
    }

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>My Orders - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <div className="overflow-x-auto mt-10">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={booking.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{booking.productName}</td>
                                <td>{booking.category}</td>
                                <td>{booking.price} Taka</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}?type=bookings`}><button className='btn btn-sm btn-secondary'>Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='btn btn-sm btn-primary hover:bg-primary'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;