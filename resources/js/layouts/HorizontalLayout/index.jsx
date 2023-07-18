import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Box, Container } from '@mui/material';

import ContentBreadcrumb from '@layouts/assets/ContentBreadcrumb';
import ContentRouter from '@layouts/assets/ContentRouter';
import ContentTitle from '@layouts/assets/ContentTitle';
import Footer from '@layouts/assets/Footer';
import { STORE_TYPE_APP_STATE } from '@store/type/app';

import Header from './Header';

const Layout = ({ dispatch }) => {
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: STORE_TYPE_APP_STATE,
                app_backdrop_open: false,
            });
        }, 500);
    }, []);

    return (
        <Box>
            <Header />

            <Box sx={{ mt: 3 }}>
                <ContentTitle />

                <ContentBreadcrumb />
            </Box>

            <Container
                maxWidth="xl"
                component="main"
                sx={{
                    pt: '.75rem',
                    pb: '24px',
                    maxWidth: '100% !important',
                    minHeight: 'calc(100vh - 238.7px)',
                }}
                children={<ContentRouter />}
            />

            <Footer />
        </Box>
    );
};

Layout.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect(null, null)(Layout);
