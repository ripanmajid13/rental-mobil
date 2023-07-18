import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography } from '@mui/material';
import { APP_NAME } from '@src/configs/app';

const Copyright = ({ sx }) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5, ...sx }}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                {APP_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

Copyright.propTypes = {
    sx: PropTypes.object,
};

export default Copyright;
