import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ConfimrationModal from '../Shared/ConfimrationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AllSellers = () => {
    const [deletingUser, setDeletinguser] = useState(null);
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://the-story-keeper-server.vercel.app/users?role=seller`, {
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

    const handleUpdate = user => {
        const isVerified = !user.isVerified;
        fetch(`https://the-story-keeper-server.vercel.app/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ isVerified })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Changed Successfully!');
                    refetch();
                }
            })

    }

    const handleDelete = (user) => {
        fetch(`https://the-story-keeper-server.vercel.app/users/${user._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('User deleted successfully')
                }

            })
    }

    if (isLoading) {
        return <div className='flex justify-center my-6'>
            <button className="btn loading">loading</button>
        </div>;
    }

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Sellers - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <div className="overflow-x-auto mt-10">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Change Seller Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name} {user.isVerified && <FontAwesomeIcon className='text-blue-500' icon={faCircleCheck} />}</td>
                                <td>{user.email}</td>
                                <td><button onClick={() => handleUpdate(user)} className="btn btn-sm btn-secondary">{!user.isVerified ? 'Verify' : 'Unverify'}</button></td>
                                <td><label onClick={() => setDeletinguser(user)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser && <ConfimrationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingUser.name}. It cannot be undone.`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingUser}
                >
                </ConfimrationModal>
            }
        </div>
    );
};

export default AllSellers;