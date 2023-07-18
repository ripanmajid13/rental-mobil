import React from 'react';

// icon
import DashboardIcon from '@mui/icons-material/Dashboard';

import ManajemenMobil from '@views/pages/mainmenu/ManajemenMobil';
import PeminjamanMobil from '@views/pages/mainmenu/PeminjamanMobil';
import PengembalianMobil from '@views/pages/mainmenu/PengembalianMobil';

const routeMainMenu = [
    {
        name: 'Main Menu',
        path: '/main-menu',
        icon: <DashboardIcon />,
        items: [
            {
                name: 'Manajemen Mobil',
                path: 'manajemen-mobil',
                icon: <DashboardIcon />,
                component: ManajemenMobil,
                public: true,
            },
            {
                name: 'Peminjaman Mobil',
                path: 'peminjaman-mobil',
                icon: <DashboardIcon />,
                component: PeminjamanMobil,
                public: true,
            },
            {
                name: 'Pengembalian Mobil',
                path: 'pengembalian-mobil',
                icon: <DashboardIcon />,
                component: PengembalianMobil,
                public: true,
            },
        ],
    },
];

export default routeMainMenu;
