import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import color from '@configs/color';

const UserTitle = ({ name, email }) => {
    return (
        <Box>
            <Typography
                variant="body1"
                gutterBottom
                children={name}
                sx={{
                    margin: 0,
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    fontFamily: `"Public Sans", sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
                    color: color.text100,
                }}
            />

            <Typography
                variant="caption"
                display="block"
                gutterBottom
                children={email}
                sx={{
                    margin: 0,
                    fontSize: '0.625rem',
                    fontFamily: `"Public Sans", sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
                    color: color.text100,
                }}
            />
        </Box>
    );
};

UserTitle.defaultProps = {
    name: 'User',
    email: 'user@example.com',
};

UserTitle.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
};

export default UserTitle;
