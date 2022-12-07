import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import BookingModal from './BookingModal';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import ConfimrationModal from '../../Shared/ConfimrationModal';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const CategoryItems = () => {
    const { user } = useContext(AuthContext);
    const [reportedProduct, setReportedProduct] = useState(null);
    const [item, setItem] = useState({});
    const { id } = useParams();
    const { data: items, isLoading, refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://the-story-keeper-server.vercel.app/category/${id}`, {
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

    const handleWishlist = (item) => {
        const wishlistItem = {
            productID: item._id,
            productName: item.name,
            price: item.resale,
            userName: user?.displayName,
            userEmail: user?.email,
            category: item.category,
            image: item.image
        }
        fetch('https://the-story-keeper-server.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishlistItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Added to wishlist');
                }
                else {
                    toast.error(data.message);
                }
            })


    }

    const handleReport = (item) => {
        const reportedItem = {
            productID: item._id,
            productName: item.name,
            price: item.resale,
            userName: user?.displayName,
            userEmail: user?.email,
            category: item.category,
            image: item.image
        }
        fetch('https://the-story-keeper-server.vercel.app/reporteditems', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reportedItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Item Reported');
                }
                else {
                    toast.error(data.message);
                }
            })


    }

    if (isLoading) {
        return <div className='flex justify-center my-6'>
            <button className="btn loading">loading</button>
        </div>;
    }
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>{id} Books - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <h2 className='text-3xl text-center font-bold my-12'>All {id} Books</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
                {
                    items.map(item => <CategoryItem
                        key={item._id}
                        item={item}
                        setItem={setItem}
                        handleWishlist={handleWishlist}
                        handleReport={handleReport}
                        setReportedProduct={setReportedProduct}
                    ></CategoryItem>)
                }
            </div>
            <BookingModal
                item={item}
                isLoading={isLoading}
                refetch={refetch}
            ></BookingModal>
            <ConfimrationModal
                title={`Are you sure you want to report?`}
                message={`If you are sure ${reportedProduct?.name} is inappropriate, you can click the report button`}
                successAction={handleReport}
                successButtonName="Report"
                modalData={reportedProduct}
            >
            </ConfimrationModal>

        </div>
    );
};

export default CategoryItems;