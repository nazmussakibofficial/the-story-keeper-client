import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';

const RecentlyAdded = () => {
    const { data: recentItems, isLoading } = useQuery({
        queryKey: ['recentItems'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/recentlyadded`, {
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
        return <button className="btn loading">loading</button>;
    }

    return (
        <div className='py-5'>
            <h2 className='text-3xl text-center font-bold my-12'>Recently Added Books</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    recentItems.map(recentItem => <CategoryCard key={recentItem._id} data={recentItem}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default RecentlyAdded;