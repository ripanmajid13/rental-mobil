import React from 'react';

import { Avatar, Typography } from '@mui/material';

import { APP_NAME } from '@configs/app';
import color from '@configs/color';

import logoImage from '@assets/images/vite.svg';

const HeaderLeft = () => {
    return (
        <>
            <Avatar
                variant="rounded"
                alt={APP_NAME}
                src={logoImage}
                sx={{ width: 35, height: 35, mr: '1rem' }}>
                Logo
            </Avatar>

            <Typography
                variant="h6"
                noWrap
                children={APP_NAME}
                sx={{
                    margin: 0,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    letterSpacing: '.1rem',
                    color: color.bg300,
                }}
            />
        </>
    );
};

export default HeaderLeft;
