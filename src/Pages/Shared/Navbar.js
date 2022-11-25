import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import logo from '../../Images/read.png'

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start ml-5">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menuItems
                        }
                    </ul>
                </div>
                <div className="avatar">
                    <div className="w-8 rounded">
                        <img src={logo} alt="Tailwind-CSS-Avatar-component" />
                    </div>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl hidden lg:block mt-5">The Story Keeper</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        menuItems
                    }
                </ul>
            </div>
            <div className="navbar-end mr-5">
                {user?.uid ?
                    <>
                        <div className="dropdown dropdown-end ml-5">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt='' />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><button onClick={handleLogOut}>Logout</button></li>
                            </ul>
                        </div>
                        <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </>
                    :
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register' className='ml-5'>Register</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;