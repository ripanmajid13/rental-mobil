import React from 'react';

import { Box, Divider, Paper, Typography } from '@mui/material';

import Coreui from './Coreui';
import Materialui from './MaterialUi';

const Component = () => {
    return (
        <Box>
            <Paper sx={{ mb: 3, pb: 2 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ pt: 1, px: 2, mb: 0 }}
                    children="Core UI"
                />

                <Divider />

                <Coreui />
            </Paper>

            <Paper>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ pt: 1, px: 2, mb: 0 }}
                    children="Material UI"
                />

                <Divider />

                <Materialui />
            </Paper>
        </Box>
    );
};

export default Component;
