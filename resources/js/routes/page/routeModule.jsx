import React from 'react';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EngineeringIcon from '@mui/icons-material/Engineering';

import { MODULE_BACKEND, MODULE_PRIVILEGES } from '@configs/module';

const routeModule = [
    {
        key: MODULE_BACKEND,
        icon: <AdminPanelSettingsIcon />,
        display: 'Backend',
    },
    {
        key: MODULE_PRIVILEGES,
        icon: <EngineeringIcon />,
        display: 'Privileges',
    },
    {
        key: 'a',
        display: 'a',
    },
    {
        key: 'b',
        display: 'b',
    },
    {
        key: 'c',
        display: 'c',
    },
    {
        key: 'd',
        display: 'd',
    },
    {
        key: 'e',
        display: 'e',
    },
    {
        key: 'f',
        display: 'f',
    },
    {
        key: 'g',
        display: 'g',
    },
    {
        key: 'h',
        display: 'h',
    },
    {
        key: 'i',
        display: 'i',
    },
    {
        key: 'j',
        display: 'j',
    },
];

export default routeModule;
