import React from 'react';

import { Grid } from '@mui/material';

import color from '@configs/color';

import forgotPasswordImage from '@assets/images/forgot_password.svg';

const Cover = () => {
    return (
        <Grid
            item
            xs={false}
            sm={5}
            md={8}
            sx={{
                p: 1,
                bgcolor: color.bg200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <img
                src={forgotPasswordImage}
                alt="Logo"
                style={{ objectFit: 'fill', width: '750px', height: '500px' }}
            />
        </Grid>
    );
};

export default Cover;
