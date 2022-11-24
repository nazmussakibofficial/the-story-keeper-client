import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthProvider';
import Navbar from '../Pages/Shared/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);


    const url = `http://localhost:5000/userData?email=${user?.email}`;

    const { data: userData = [] } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })


    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to="/dashboard">My orders</Link></li>
                        {
                            userData.role === 'seller' && <>
                                <li><Link to="/dashboard/addproduct">Add A Product</Link></li>
                                <li><Link to="/dashboard/myproducts">My products</Link></li>
                                <li><Link to="/dashboard/mybuyers">My buyers</Link></li>
                            </>
                        }
                        {
                            userData.role === 'admin' && <>
                                <li><Link to="/dashboard/allbuyers">All buyers</Link></li>
                                <li><Link to="/dashboard/allsellers">All sellers</Link></li>
                                <li><Link to="/dashboard/reporteditems">Reported Items</Link></li></>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;