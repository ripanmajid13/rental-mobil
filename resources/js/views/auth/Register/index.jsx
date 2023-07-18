import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@mui/material/Grid';

import { STORE_TYPE_APP_STATE } from '@store/type/app';

import Cover from './Cover';
import Form from './Form';

const Login = ({ dispatch }) => {
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: STORE_TYPE_APP_STATE,
                app_backdrop_open: false,
            });
        }, 500);
    }, []);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Form dispatch={dispatch} />
            <Cover />
        </Grid>
    );
};

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default memo(connect(null, null)(Login));
