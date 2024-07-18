import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from "./theme.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider as ProviderRedux } from 'react-redux'
import { store } from './redux/store/store.ts';
import { router } from './routes/routes.tsx';




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
