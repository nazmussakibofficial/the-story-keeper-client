import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import Blog from "../Pages/Blog/Blog";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers";
import MyOrders from "../Pages/Dashboard/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts";
import MyWIshlist from "../Pages/Dashboard/MyWIshlist";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ReportedItems from "../Pages/Dashboard/ReportedItems";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import CategoryItems from "../Pages/Home/CategoryItems/CategoryItems";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><CategoryItems></CategoryItems></PrivateRoute>
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <PrivateRoute><MyWIshlist></MyWIshlist></PrivateRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            }
        ]
    }
])