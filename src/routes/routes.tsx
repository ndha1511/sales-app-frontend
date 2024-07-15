import { createBrowserRouter, Navigate } from "react-router-dom"
import AdminLayout from "../layouts/admin/AdminLayout";
import Product from "../pages/admin/products/Product";
import CreateProduct from "../pages/admin/products/CreateProduct";
import UpdateProduct from "../pages/admin/products/UpdateProduct";
import UserLayout from "../layouts/user/UserLayout";
import ProductDetail from "../pages/user/products/ProductDetail";
import Provider from "../pages/admin/providers/Provider";
import Cart from "../pages/user/cart/Cart";
import LoginSuccess from "../pages/user/auth/LoginSucess";
import Register from "../pages/user/auth/Register";
import VerifyEmail from "../pages/user/auth/VerifyEmail";
import ProtectRoutes from "./ProtectRoutes";
import { Role } from "../models/user.model";
import Login from "../pages/user/auth/Login";
import Home from "../pages/user/home/Home";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/categories/Category";
import ProductUser from "../pages/user/products/Product";
import ForgotPassword from "../pages/user/auth/ForgotPassword";
import AuthLayout from "../layouts/common/AuthLayout";


const adminRoutes = [
    {
        path: '/admin/dashboard',
        element: <ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout><Dashboard /></AdminLayout></ProtectRoutes>
    },
    {
        path: '/admin/product',
        element: <ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout><Product /></AdminLayout></ProtectRoutes>
    },
    {
        path: '/admin/product/create',
        element: <ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout><CreateProduct /></AdminLayout></ProtectRoutes>
    },
    {
        path: '/admin/product/update/:id',
        element: <ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout><UpdateProduct /></AdminLayout></ProtectRoutes>
    },
    {
        path: '/admin/product/category',
        element: <ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout><Category/></AdminLayout></ProtectRoutes>
    },
    {
        path: '/admin/product/provider',
        element: <ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout><Provider/></AdminLayout></ProtectRoutes>
    },
]

const userRoutes = [{}]

const publicRoutes = [
    {
        path: '/home',
        element: <UserLayout><Home/></UserLayout>
    },
    {
        path: '/products/:id',
        element: <UserLayout><ProductDetail/></UserLayout>
    },
    {
        path: '/cart',
        element: <UserLayout><Cart/></UserLayout>
    },
    {
        path: '/',
        element: <Navigate to={"/home"}></Navigate>
    
    },
    {
        path: '/auth/login',
        element: <AuthLayout><Login/></AuthLayout>
    
    },
    {
        path: '/auth/login-success',
        element: <LoginSuccess/>
    
    },
    {
        path: '/auth/register',
        element: <AuthLayout><Register/></AuthLayout>
    
    },
    {
        path: '/auth/verify',
        element:<AuthLayout><VerifyEmail/></AuthLayout>
    
    },
    {
        path: '/auth/forgot-password',
        element: <AuthLayout><ForgotPassword/></AuthLayout>
    
    },
    {
        path: '/products',
        element: <UserLayout><ProductUser/></UserLayout>
    
    }
]


export const router = createBrowserRouter([
    ...adminRoutes,
    ...publicRoutes,
    ...userRoutes
    
]);