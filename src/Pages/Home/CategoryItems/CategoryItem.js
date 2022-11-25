import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


const CategoryItem = ({ item, setItem }) => {
    const [verified, setVerified] = useState(false);
    const { image, name, location, resale, original, usedtime, condition, sellerName, date, sellerEmail } = item;
    useEffect(() => {
        axios.get(`http://localhost:5000/users/sellerVerified/${sellerEmail}`)
            .then(data => setVerified(data.data.isVerified))
    }, [sellerEmail])
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="" className="rounded-xl h-96" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Location: {location}</p>
                <p>Resale Price: {resale} Taka</p>
                <p>Original Price: {original} Taka</p>
                <p>Years of use: {usedtime}</p>
                <p>Condition: {condition}</p>
                <p>Seller: {sellerName} {verified && <FontAwesomeIcon className='text-blue-500' icon={faCircleCheck} />}</p>
                <p>Posted on: {date}</p>
                <div className="card-actions justify-center">
                    <label onClick={() => setItem(item)} htmlFor="booking-modal" className="btn btn-primary mt-5">Book Now</label>
                </div>
            </div>

        </div>
    );
};

export default CategoryItem;