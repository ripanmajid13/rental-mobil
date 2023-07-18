import React from 'react';
import i18next from 'i18next';

import { Sync as SyncIcon } from '@mui/icons-material';

const ButtonReload = (reloadRow) => ({
    color: 'success',
    startIcon: <SyncIcon />,
    invisible: true,
    onClick: () => reloadRow(),
    children: i18next.t('Reload'),
});

export default ButtonReload;
