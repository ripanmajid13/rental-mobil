import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

const BreadcrumbText = ({ children }) => (
    <Typography
        variant="body2"
        gutterBottom
        color="text.primary"
        children={children}
        sx={{
            mb: 0,
            display: 'flex',
            alignItems: 'center',
            cursor: 'default',
        }}
    />
);

BreadcrumbText.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BreadcrumbText;
