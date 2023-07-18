import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { SnackbarUtilsConfigurator } from '@configs/notistack';
import theme from '@configs/theme';

import store from '@store';

import App from './App';

import '@configs/i18next';

// import '@configs/websockets';
import '@coreui/coreui/dist/css/coreui.min.css';
import './index.css';

// add action to all snackbars
const notistackRef = createRef();
const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
};

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            networkMode: 'always',
        },
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            staleTime: 5 * 1000,
            networkMode: 'always',
            keepPreviousData: true,
        },
    },
});

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    autoHideDuration={5000}
                    ref={notistackRef}
                    action={(key) => (
                        <IconButton aria-label="close" size="small" onClick={onClickDismiss(key)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    TransitionComponent={Slide}
                    maxSnack={3}>
                    <SnackbarUtilsConfigurator />
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </QueryClientProvider>
);
