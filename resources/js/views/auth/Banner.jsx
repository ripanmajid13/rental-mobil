import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Typography } from '@mui/material';
import { APP_NAME } from '@src/configs/app';
import color from '@configs/color';
import LaravelIcon from '@assets/images/laravel.svg';

const Banner = ({ title = '', description = '' }) => {
    return (
        <Box sx={{ mb: 4, width: '100%' }}>
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                    alt="Logo"
                    src={LaravelIcon}
                    variant="rounded"
                    sx={{ width: 'auto', height: '125px' }}
                />

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ ml: 2, fontSize: '3rem', color: color.bg300 }}
                    children={APP_NAME}
                />
            </Box>

            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    mb: 0,
                    alignSelf: 'start',
                    color: color.bg300,
                }}
                children={title}
            />

            <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                    mb: 0,
                    alignSelf: 'start',
                    color: color.bg300,
                }}
                children={description}
            />
        </Box>
    );
};

Banner.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default Banner;
