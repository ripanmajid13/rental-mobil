import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Box } from '@mui/material';

import { STORE_TYPE_APP_STATE } from '@store/type/app';

import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ window, dispatch, app_lang, app_token }) => {
    const [drawerDesktop, setDrawerDesktop] = useState(true);
    const [drawerMobile, setDrawerMobile] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: STORE_TYPE_APP_STATE,
                app_backdrop_open: false,
            });
        }, 500);
    }, []);

    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <Header
                drawerDesktop={drawerDesktop}
                setDrawerDesktop={setDrawerDesktop}
                drawerMobile={drawerMobile}
                setDrawerMobile={setDrawerMobile}
            />

            <Sidebar
                window={window}
                drawerDesktop={drawerDesktop}
                drawerMobile={drawerMobile}
                setDrawerMobile={setDrawerMobile}
            />

            <Content drawerDesktop={drawerDesktop} />
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
    window: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    app_lang: PropTypes.string,
    app_token: PropTypes.string,
};

export default connect(mapStateToProps, null)(Layout);
