import React from 'react';

// icon
import DashboardIcon from '@mui/icons-material/Dashboard';

import {
    MODULE_NAVIGATION_INFORMATION,
    MODULE_NAVIGATION_MAIN_MENU,
    MODULE_NAVIGATION_MASTER,
    MODULE_NAVIGATION_REPORT,
    MODULE_NAVIGATION_TRANSACTION,
} from '@configs/moduleNavigation';

const routeModuleNavigation = [
    {
        key: MODULE_NAVIGATION_MAIN_MENU,
        icon: <DashboardIcon />,
        display: 'Main Menu',
    },
    {
        key: MODULE_NAVIGATION_INFORMATION,
        icon: <DashboardIcon />,
        display: 'Information',
    },
    {
        key: MODULE_NAVIGATION_TRANSACTION,
        icon: <DashboardIcon />,
        display: 'Transaction',
    },
    {
        key: MODULE_NAVIGATION_REPORT,
        icon: <DashboardIcon />,
        display: 'Report',
    },
    {
        key: MODULE_NAVIGATION_MASTER,
        icon: <DashboardIcon />,
        display: 'Master',
    },
];

export default routeModuleNavigation;
