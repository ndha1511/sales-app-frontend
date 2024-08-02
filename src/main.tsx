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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ProviderRedux store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssVarsProvider theme={theme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </CssVarsProvider>
            </LocalizationProvider>
        </ProviderRedux>
    </React.StrictMode>,
)
