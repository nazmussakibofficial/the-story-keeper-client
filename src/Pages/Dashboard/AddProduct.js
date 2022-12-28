import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key

    const handleAddProduct = data => {
        const image = data.photo[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        name: data.name,
                        image: imgData.data.url,
                        category: data.category,
                        location: data.location,
                        resale: data.resale,
                        original: data.original,
                        usedtime: data.usedtime,
                        condition: data.condition,
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        isAd: false
                    }
                    fetch('https://the-story-keeper-server.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/myproducts')
                        })
                }
            })

    }
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Add a Product - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <div className="hero mt-10 min-h-screen bg-contain bg-[url('https://images.unsplash.com/photo-1593430980369-68efc5a5eb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1185&q=80')]">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center text-white mb-5">Add A Product</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5">
                        <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product name:</span>
                                </label>
                                <input {...register("name")}
                                    type="text" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product picture:</span>
                                </label>
                                <input {...register("photo")} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Choose category:</span>
                                </label>
                                <select {...register('category')} className="select select-accent w-full max-w-xs">
                                    <option value='Text'>Text Books</option>
                                    <option value='Story'>Story Books</option>
                                    <option value='Literature'>Literature Books</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input {...register("location")}
                                    type="text" placeholder="location" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Resale price</span>
                                </label>
                                <input {...register("resale")}
                                    type="text" placeholder="price" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Original price</span>
                                </label>
                                <input {...register("original")}
                                    type="text" placeholder="price" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Years of use</span>
                                </label>
                                <input {...register("usedtime")}
                                    type="text" placeholder="years" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Choose condition:</span>
                                </label>
                                <select {...register('condition')} className="select select-accent w-full max-w-xs">
                                    <option value='Excellent'>Excellent</option>
                                    <option value='Good'>Good</option>
                                    <option value='Fair'>Fair</option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Submit & Add' type='submit'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AddProduct;