import React from 'react';


const CategoryItem = ({ item }) => {
    const { image, name, location, resale, original, usedtime, condition, sellerName, date } = item;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="" className="rounded-xl h-96" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Location: {location}</p>
                <p>Resale Price: {resale}</p>
                <p>Original Price: {original}</p>
                <p>Years of use: {usedtime}</p>
                <p>Condition: {condition}</p>
                <p>Seller: {sellerName}</p>
                <p>Posted on: {date}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary mt-5">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;