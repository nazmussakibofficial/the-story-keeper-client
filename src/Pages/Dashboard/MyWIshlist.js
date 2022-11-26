import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MyWIshlist = () => {

    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/wishlist?email=${user?.email}`

    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
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
        return <button className="btn loading">loading</button>;
    }

    return (
        <div>
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
                            wishlist.map((wishlistItem, i) => <tr key={wishlistItem._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={wishlistItem.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{wishlistItem.productName}</td>
                                <td>{wishlistItem.category}</td>
                                <td>{wishlistItem.price} Taka</td>
                                <td>
                                    {
                                        wishlistItem.price && !wishlistItem.paid &&
                                        <Link to={`/dashboard/payment/${wishlistItem._id}?type=wishlist`}><button className='btn btn-sm btn-secondary'>Pay</button></Link>
                                    }
                                    {
                                        wishlistItem.price && wishlistItem.paid && <span className='btn btn-sm btn-primary hover:bg-primary'>Paid</span>
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

export default MyWIshlist;