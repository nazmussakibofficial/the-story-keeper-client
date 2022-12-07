import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';

const AdvertisedProducts = () => {
    const { data: items, isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://the-story-keeper-server.vercel.app/advertisedProducts`, {
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

    return (
        <>
            {
                items.length !== 0 && <div className='py-5'>
                    <h2 className='text-3xl text-center font-bold my-12'>Advertised Books</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            items.map(item => <CategoryCard key={item._id} data={item}></CategoryCard>)
                        }
                    </div>
                </div>
            }
        </>

    );
};

export default AdvertisedProducts;