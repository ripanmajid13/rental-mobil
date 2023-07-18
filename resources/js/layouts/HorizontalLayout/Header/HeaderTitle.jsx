import React from 'react';

import { Box, Toolbar } from '@mui/material';

import HeaderLeft from '@layouts/assets/HeaderLeft';
import HeaderRight from '@layouts/assets/HeaderRight';

const HeaderTitle = () => {
    return (
        <Box sx={{ px: 2, borderBottom: '1px solid rgba(47, 43, 61, 0.16)' }}>
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <HeaderLeft />
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <HeaderRight />
                </Box>
            </Toolbar>
        </Box>
    );
};

export default HeaderTitle;
