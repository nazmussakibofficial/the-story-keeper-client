import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ data, disableButton }) => {
    const { image, name, category } = data;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="" className="rounded-xl  h-96" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                {
                    disableButton &&
                    <div className="card-actions">
                        <Link to={`/category/${category}`}><button className="btn btn-primary">Browse Category</button></Link>
                    </div>}
            </div>
        </div>
    );
};

export default CategoryCard;