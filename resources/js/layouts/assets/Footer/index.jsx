import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Paper, Typography } from '@mui/material';

import { APP_NAME } from '@configs/app';

const Footer = () => {
    return (
        <Paper
            square
            sx={{
                padding: '0.5rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Typography variant="caption" display="block" gutterBottom sx={{ mb: 0 }}>
                {'Copyright © '}
                <Link color="inherit" href="#">
                    {APP_NAME}
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>

            <Box>
                <Typography variant="caption" display="block" gutterBottom sx={{ mb: 0 }}>
                    Creted By Ripan
                </Typography>
            </Box>
        </Paper>
    );
};

export default Footer;
