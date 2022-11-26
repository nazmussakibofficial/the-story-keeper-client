import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthProvider';
import Navbar from '../Pages/Shared/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);


    const url = `https://the-story-keeper-server.vercel.app/userData?email=${user?.email}`;

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
        <div className='container mx-auto'>
            < Navbar ></Navbar >
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard" end>My orders</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/wishlist" end>My wishlist</NavLink></li>
                        {
                            userData.role === 'seller' && <>
                                <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/addproduct" end>Add A Product</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/myproducts" end>My products</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/mybuyers" end>My buyers</NavLink></li>
                            </>
                        }
                        {
                            userData.role === 'admin' && <>
                                <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/allbuyers" end>All buyers</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/allsellers" end>All sellers</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? 'bg-secondary' : undefined} to="/dashboard/reporteditems" end>Reported Items</NavLink></li></>
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;