import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '@mui/material';

const BreadcrumbLink = ({ href, navigate, children }) => (
    <Link
        href={href}
        onClick={(e) => {
            e.preventDefault();

            navigate(href, {
                replace: true,
            });
        }}
        variant="body2"
        gutterBottom
        underline="hover"
        sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
        // eslint-disable-next-line prettier/prettier
        children={children}
    />
);

BreadcrumbLink.propTypes = {
    href: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default BreadcrumbLink;
