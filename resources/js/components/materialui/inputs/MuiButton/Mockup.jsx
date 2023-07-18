import React from 'react';

import { Button } from '@mui/material';

const Mockup = ({ ...props }) => {
    return <Button {...props} disableTouchRipple />;
};

export default Mockup;
