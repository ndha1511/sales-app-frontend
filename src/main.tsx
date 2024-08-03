import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "./theme.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider as ProviderRedux } from 'react-redux'
import { store } from './redux/store/store.ts';
import { router } from './routes/routes.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// change mode
//<CssVarsProvider theme={theme}>
//      <CssBaseline />
//      <RouterProvider router={router} />
//</CssVarsProvider>

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ProviderRedux store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </LocalizationProvider>
        </ProviderRedux>
    </React.StrictMode>,
)
