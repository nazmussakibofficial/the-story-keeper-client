import React from 'react';
import img1 from '../../Images/category-1.jpg';
import img2 from '../../Images/category-2.jpg';
import img3 from '../../Images/category-3.jpg';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const cardData = [
        {
            id: 1,
            name: 'Text Books',
            img: img1,
            link: '/category/textbooks'
        },
        {
            id: 2,
            name: 'Story Books',
            img: img2,
            link: '/category/storybooks'
        },
        {
            id: 3,
            name: 'Literature Books',
            img: img3,
            link: '/category/literaturebooks'
        }
    ]
    return (
        <div id='categories' className='py-5'>
            <h2 className='text-3xl text-center font-bold my-12'>Book Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    cardData.map(data => <CategoryCard key={data.id} data={data}></CategoryCard>)
                }
            </div>

        </div>
    );
};

export default Categories;