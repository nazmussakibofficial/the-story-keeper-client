import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import ConfimrationModal from '../Shared/ConfimrationModal';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://the-story-keeper-server.vercel.app/products?email=${user?.email}`, {
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

    const handleDeleteProduct = product => {
        fetch(`https://the-story-keeper-server.vercel.app/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.name} deleted successfully`)
                }
            })
    }

    const handleUpdate = product => {
        const isAd = !product.isAd;

        fetch(`https://the-story-keeper-server.vercel.app/products/${product._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ isAd })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Changed Successfully!');
                    refetch();
                }
            })

    }


    if (isLoading) {
        return <button className="btn loading">loading</button>;
    }

    return (
        <div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={product.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.resale} Taka</td>
                                <td>{product.resale && product.paid ? <span className='btn btn-sm btn-primary hover:bg-primary'>Sold</span> : <span className='btn btn-sm btn-primary hover:bg-primary'>Available</span>}</td>
                                <td>{!product.paid ? <button onClick={() => handleUpdate(product)} className="btn btn-sm btn-secondary">{!product.isAd ? 'Advertise' : 'Undo'}</button> : <span className='btn btn-sm btn-primary hover:bg-primary'>Not Available</span>}</td>
                                <td><label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfimrationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.name}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                >
                </ConfimrationModal>
            }
        </div>
    );
};

export default MyProducts;