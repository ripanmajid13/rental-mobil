import React from 'react';

import { AppBar } from '@mui/material';

import color from '@configs/color';

import HeaderNavigation from './HeaderNavigation';
import HeaderTitle from './HeaderTitle';

const Header = () => {
    return (
        <AppBar
            position="sticky"
            sx={{ bgcolor: color.primary100, boxShadow: 'rgba(47, 43, 61, 0.14) 0px 2px 6px 0px' }}>
            <HeaderTitle />

            <HeaderNavigation />
        </AppBar>
    );
};
export default Header;
