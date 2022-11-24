import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ data }) => {
    const { img, name, link } = data;
    return (
        <div className="card h-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <div className="card-actions">
                    <Link to={link}><button className="btn btn-primary">Browse Category</button></Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;