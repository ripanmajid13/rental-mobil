import React from 'react';

import { Grid } from '@mui/material';

import color from '@configs/color';

import registerImage from '@assets/images/studying.svg';

const Cover = () => {
    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                p: 1,
                bgcolor: color.bg200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <img
                src={registerImage}
                alt="Logo"
                style={{ objectFit: 'fill', width: '750px', height: '500px' }}
            />
        </Grid>
    );
};

export default Cover;
