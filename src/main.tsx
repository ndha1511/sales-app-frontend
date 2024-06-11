import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {CssBaseline} from "@mui/material";
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import {theme} from "./theme.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminLayout from "./layouts/admin/AdminLayout.tsx";
import Product from "./pages/admin/products/Product.tsx";
import CreateProduct from "./pages/admin/products/CreateProduct.tsx";
import UpdateProduct from "./pages/admin/products/UpdateProduct.tsx";
import Category from "./pages/admin/categories/Category.tsx";

const router = createBrowserRouter([
    {
        path: '/admin/dashboard',
        element: <AdminLayout><Dashboard/></AdminLayout>
    },
    {
        path: '/admin/product',
        element: <AdminLayout><Product/></AdminLayout>
    },
    {
        path: '/admin/product/create',
        element: <AdminLayout><CreateProduct/></AdminLayout>
    },
    {
        path: '/admin/product/update/:id',
        element: <AdminLayout><UpdateProduct/></AdminLayout>
    },
    {
        path: '/admin/product/category',
        element: <AdminLayout><Category/></AdminLayout>
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssVarsProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </CssVarsProvider>
    </React.StrictMode>,
)
