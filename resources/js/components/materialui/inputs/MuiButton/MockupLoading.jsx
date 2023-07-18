import React from 'react';

import { LoadingButton } from '@mui/lab';

const MockupLoading = ({ ...props }) => {
    return <LoadingButton {...props} disableTouchRipple />;
};

export default MockupLoading;
