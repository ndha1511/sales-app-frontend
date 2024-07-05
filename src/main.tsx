import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from "./theme.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminLayout from "./layouts/admin/AdminLayout.tsx";
import Product from "./pages/admin/products/Product.tsx";
import CreateProduct from "./pages/admin/products/CreateProduct.tsx";
import UpdateProduct from "./pages/admin/products/UpdateProduct.tsx";
import Category from "./pages/admin/categories/Category.tsx";
import Provider from './pages/admin/providers/Provider.tsx';
import UserLayout from './layouts/user/UserLayout.tsx';
import Home from './pages/user/home/Home.tsx';
import ProductDetail from './pages/user/product/ProductDetail.tsx';
import { Provider as ProviderRedux } from 'react-redux'
import { store } from './redux/store/store.ts';
import Cart from './pages/user/cart/Cart.tsx';
import Login from './pages/user/auth/Login.tsx';
import LoginSuccess from './pages/user/auth/LoginSucess.tsx';
import Register from './pages/user/auth/Register.tsx';
import VerifyEmail from './pages/user/auth/VerifyEmail.tsx';


const router = createBrowserRouter([
    {
        path: '/admin/dashboard',
        element: <AdminLayout><Dashboard /></AdminLayout>
    },
    {
        path: '/admin/product',
        element: <AdminLayout><Product /></AdminLayout>
    },
    {
        path: '/admin/product/create',
        element: <AdminLayout><CreateProduct /></AdminLayout>
    },
    {
        path: '/admin/product/update/:id',
        element: <AdminLayout><UpdateProduct /></AdminLayout>
    },
    {
        path: '/admin/product/category',
        element: <AdminLayout><Category /></AdminLayout>
    },
    {
        path: '/admin/product/provider',
        element: <AdminLayout><Provider /></AdminLayout>
    },
    {
        path: '/home',
        element: <UserLayout><Home /></UserLayout>
    },
    {
        path: '/products/:id',
        element: <UserLayout><ProductDetail /></UserLayout>
    },
    {
        path: '/cart',
        element: <UserLayout><Cart /></UserLayout>
    },
    {
        path: '/',
        element: <Navigate to={"/home"}></Navigate>
    
    },
    {
        path: '/auth/login',
        element: <Login></Login>
    
    },
    {
        path: '/auth/login-success',
        element: <LoginSuccess></LoginSuccess>
    
    },
    {
        path: '/auth/register',
        element: <Register></Register>
    
    },
    {
        path: '/auth/verify',
        element: <VerifyEmail></VerifyEmail>
    
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ProviderRedux store={store}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </CssVarsProvider>
        </ProviderRedux>
    </React.StrictMode>,
)
