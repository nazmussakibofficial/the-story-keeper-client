import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import toast from 'react-hot-toast';
import ConfimrationModal from '../Shared/ConfimrationModal';

const ReportedItems = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: reports, isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://the-story-keeper-server.vercel.app/reporteditems`, {
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
        fetch(`https://the-story-keeper-server.vercel.app/products/${product.productID}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    fetch(`https://the-story-keeper-server.vercel.app/reporteditems/${product._id}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                refetch();
                                toast.success(`${product.productName} deleted successfully`)
                            }
                        })
                }
            })
    }

    if (isLoading) {
        return <button className="btn loading">loading</button>;
    }

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Reported Items - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <div className="overflow-x-auto mt-10">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map((report, i) => <tr key={report._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={report.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{report.productName}</td>
                                <td>{report.category}</td>
                                <td>{report.price} Taka</td>
                                <td><label onClick={() => setDeletingProduct(report)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfimrationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.productName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                >
                </ConfimrationModal>
            }
        </div>
    );
};

export default ReportedItems;