import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import BookingModal from './BookingModal';

const CategoryItems = () => {
    const [item, setItem] = useState({});
    const selectedCategory = useLoaderData()[0]?.category;
    const { data: items, isLoading, refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/category/${selectedCategory}`, {
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
        <div>
            <h2 className='text-3xl text-center font-bold my-12'>All {selectedCategory} books</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
                {
                    items.map(item => <CategoryItem key={item._id} item={item} setItem={setItem}></CategoryItem>)
                }
            </div>
            <BookingModal
                item={item}
                isLoading={isLoading}
                refetch={refetch}
            ></BookingModal>

        </div>
    );
};

export default CategoryItems;