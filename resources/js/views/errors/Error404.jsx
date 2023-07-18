import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Box, Paper, Typography } from '@mui/material';

const Error404 = ({ status, message }) => {
    return (
        <Paper elevation={0} sx={{ p: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '10vh',
                }}>
                <Typography variant="h1">{status}</Typography>
                <Typography variant="h6">{i18next.t(message)}</Typography>
            </Box>
        </Paper>
    );
};

Error404.defaultProps = {
    status: 404,
    message: 'The page you’re looking for doesn’t exist.',
};

Error404.propTypes = {
    status: PropTypes.number,
    message: PropTypes.string,
};

export default Error404;
