import React from 'react';
import i18next from 'i18next';

import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const ButtonBack = (onBack) => ({
    startIcon: <ArrowBackIcon />,
    invisible: true,
    onClick: () => onBack(),
    children: i18next.t('Back'),
});

export default ButtonBack;
