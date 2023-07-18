import { stringToDateTime } from '@hooks/string';

const column = [
    {
        Header: 'Name',
        accessor: 'name',
        filter: true,
        filterType: 'text',
        // show: false,
    },
    {
        Header: 'Date Of Birth',
        accessor: 'date_of_birth',
        filter: true,
        filterType: 'date',
        // filterValue: stringToDateTime(new Date(), 'Y-m-d'),
        Cell: ({ cell: { value } }) => stringToDateTime(value, 'd/m/Y'),
    },
    {
        Header: 'Username',
        accessor: 'username',
        filter: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        filter: true,
        sx: ({ row: { original } }) =>
            !original.email_verified_at && {
                color: 'white',
                backgroundColor: 'warning.light',
            },
    },
    {
        Header: 'Active',
        accessor: 'active',
        filter: true,
        filterType: 'select',
        // filterValue: 'false',
        filterOptions: [
            { value: 'true', label: 'Nyala' },
            { value: 'false', label: 'Mati' },
        ],
        Cell: ({ cell: { value } }) => value.toUpperCase(),
    },
    {
        Header: 'Join',
        accessor: 'join',
        filter: true,
        filterType: 'daterange',
        // filterValue: '2023-05-24 - 2023-05-25',
        Cell: ({ cell: { value } }) => stringToDateTime(value, 'd/m/Y'),
    },
];

export default column;
