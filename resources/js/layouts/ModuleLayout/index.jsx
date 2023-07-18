import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Box, Container } from '@mui/material';

import Footer from '@layouts/assets/Footer';
import { STORE_TYPE_APP_STATE } from '@store/type/app';

import Content from './Content';
import Header from './Header';

const Layout = ({ dispatch, app_token }) => {
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
            <Header dispatch={dispatch} token={app_token} />

            <Container
                maxWidth="xl"
                component="main"
                sx={{
                    pt: '.75rem',
                    pb: '24px',
                    pc: 5,
                    maxWidth: '100% !important',
                    minHeight: 'calc(100vh - 99.7px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Content dispatch={dispatch} token={app_token} />
            </Container>

            <Footer />
        </Box>
    );
};

const mapStateToProps = ({ app }) => {
    return {
        app_lang: app.app_lang,
        app_token: app.app_token,
    };
};

Layout.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app_token: PropTypes.string,
};

export default connect(mapStateToProps, null)(Layout);
