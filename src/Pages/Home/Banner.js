import React from 'react';
import './Banner.css'
import img1 from '../../Images/banner-1.jpg';
import img2 from '../../Images/banner-2.jpg';
import img3 from '../../Images/banner-3.jpg';

const Banner = () => {
    return (
        <div className='mt-12'>
            <div className="container carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className='carousel-item-img'>
                        <img src={img1} className="w-full" alt='' />
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                        <h1 className='text-5xl text-secondary font-bold hidden lg:block'>Every book has its <br /> own story to tell</h1>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/2">
                        <a href='#categories'><button className="btn btn-secondary hidden lg:block">Get Started</button></a>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 bottom-0">
                        <a href="#slide3" className="btn btn-circle btn-secondary mr-5">❮</a>
                        <a href="#slide2" className="btn btn-circle btn-secondary">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div className='carousel-item-img'>
                        <img src={img2} className="w-full" alt='' />
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                        <h1 className='text-5xl text-secondary font-bold hidden lg:block'>Instead of throwing <br /> them away</h1>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/2">
                        <a href='#categories'><button className="btn btn-secondary hidden lg:block">Get Started</button></a>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 bottom-0">
                        <a href="#slide1" className="btn btn-circle btn-secondary mr-5">❮</a>
                        <a href="#slide3" className="btn btn-circle btn-secondary">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <div className='carousel-item-img'>
                        <img src={img3} className="w-full" alt='' />
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                        <h1 className='text-5xl text-secondary font-bold hidden lg:block'>Resell these books to <br /> others in cheap and help <br /> them in education</h1>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/2">
                        <a href='#categories'><button className="btn btn-secondary hidden lg:block">Get Started</button></a>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 bottom-0">
                        <a href="#slide2" className="btn btn-circle btn-secondary mr-5">❮</a>
                        <a href="#slide1" className="btn btn-circle btn-secondary">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;