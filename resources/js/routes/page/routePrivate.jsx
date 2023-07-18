import React from 'react';

// icon
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GroupIcon from '@mui/icons-material/Group';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SubtitlesIcon from '@mui/icons-material/Subtitles';

import { MODULE_BACKEND } from '@configs/module';
import { MODULE_NAVIGATION_INFORMATION } from '@configs/moduleNavigation';

// page
import BackendApi from '@views/pages/backend/Api';
import BackendLog from '@views/pages/backend/Log';
import PrivilegesBackendLanguage from '@views/pages/privileges/Language';
import PrivilegesBackendLanguageForm from '@views/pages/privileges/Language/Form';
import PrivilegesBackendLanguageTrash from '@views/pages/privileges/Language/Trash';
import PrivilegesPermisson from '@views/pages/privileges/Permission';
import PrivilegesRoleData from '@views/pages/privileges/Role/Data';
import PrivilegesRoleDataTrash from '@views/pages/privileges/Role/Data/Trash';
import PrivilegesRoleType from '@views/pages/privileges/Role/Type';
import PrivilegesRoleTypeTrash from '@views/pages/privileges/Role/Type/Trash';
import PrivilegesUser from '@views/pages/privileges/User';
import PrivilegesUserForm from '@views/pages/privileges/User/Form';
import PrivilegesUserShow from '@views/pages/privileges/User/Show';
import PrivilegesUserTrash from '@views/pages/privileges/User/Trash';

const routePrivate = [
    // {
    //     name: 'Privileges',
    //     path: '/privileges',
    //     icon: <DashboardIcon />,
    //     items: [
    //         {
    //             name: 'User',
    //             path: 'user',
    //             icon: <GroupIcon />,
    //             component: PrivilegesUser,
    //             module: [MODULE_BACKEND],
    //             navigation: MODULE_NAVIGATION_INFORMATION,
    //             actions: [
    //                 {
    //                     name: 'Create',
    //                     path: 'create',
    //                     component: PrivilegesUserForm,
    //                     module: [MODULE_BACKEND],
    //                     navigation: MODULE_NAVIGATION_INFORMATION,
    //                 },
    //                 {
    //                     name: 'Show',
    //                     path: ':id/show',
    //                     component: PrivilegesUserShow,
    //                     module: [MODULE_BACKEND],
    //                     navigation: MODULE_NAVIGATION_INFORMATION,
    //                 },
    //                 {
    //                     name: 'Edit',
    //                     path: ':id/edit',
    //                     component: PrivilegesUserForm,
    //                     module: [MODULE_BACKEND],
    //                     navigation: MODULE_NAVIGATION_INFORMATION,
    //                 },
    //                 {
    //                     name: 'Trash',
    //                     path: 'trash',
    //                     component: PrivilegesUserTrash,
    //                     module: [MODULE_BACKEND],
    //                     navigation: MODULE_NAVIGATION_INFORMATION,
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'Role',
    //             path: 'role',
    //             icon: <AccessibilityIcon />,
    //             items: [
    //                 {
    //                     name: 'Data',
    //                     path: 'data',
    //                     component: PrivilegesRoleData,
    //                     actions: [
    //                         {
    //                             name: 'Trash',
    //                             path: 'trash',
    //                             component: PrivilegesRoleDataTrash,
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     name: 'Type',
    //                     path: 'type',
    //                     component: PrivilegesRoleType,
    //                     actions: [
    //                         {
    //                             name: 'Trash',
    //                             path: 'trash',
    //                             component: PrivilegesRoleTypeTrash,
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'Permission',
    //             path: 'permission',
    //             icon: <SettingsApplicationsIcon />,
    //             component: PrivilegesPermisson,
    //         },
    //         {
    //             name: 'Language',
    //             path: 'language',
    //             icon: <SubtitlesIcon />,
    //             component: PrivilegesBackendLanguage,
    //             actions: [
    //                 {
    //                     name: 'Create',
    //                     path: 'create',
    //                     component: PrivilegesBackendLanguageForm,
    //                 },
    //                 {
    //                     name: 'Edit',
    //                     path: ':id/edit',
    //                     component: PrivilegesBackendLanguageForm,
    //                 },
    //                 {
    //                     name: 'Trash',
    //                     path: 'trash',
    //                     component: PrivilegesBackendLanguageTrash,
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     name: 'Backend',
    //     path: '/backend',
    //     icon: <DashboardIcon />,
    //     items: [
    //         {
    //             name: 'Api',
    //             path: 'api',
    //             icon: <FormatListNumberedIcon />,
    //             component: BackendApi,
    //             module: [MODULE_BACKEND],
    //             navigation: MODULE_NAVIGATION_INFORMATION,
    //             actions: [
    //                 {
    //                     name: 'Create',
    //                     path: 'create',
    //                     component: BackendApi,
    //                     module: [MODULE_BACKEND],
    //                     navigation: MODULE_NAVIGATION_INFORMATION,
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'Log',
    //             path: 'log',
    //             icon: <FormatListBulletedIcon />,
    //             component: BackendLog,
    //             module: [MODULE_BACKEND],
    //             navigation: MODULE_NAVIGATION_INFORMATION,
    //         },
    //     ],
    // },
];

export default routePrivate;
