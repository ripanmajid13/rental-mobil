import Profile from '@views/settings/Profile';

const routeSetting = [
    {
        name: 'Setting',
        path: '/setting',
        items: [
            {
                name: 'Profile',
                path: 'profile',
                component: Profile,
            },
        ],
    },
];

export default routeSetting;
