const column = [
    {
        Header: 'Code',
        accessor: 'code',
        filter: true,
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Name',
        accessor: 'name',
        filter: true,
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Type',
        accessor: 'type_name',
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Display',
        accessor: 'display',
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Permissions',
        accessor: 'permissions',
        Cell: ({ cell: { value }, row: { original } }) =>
            value ? JSON.parse(value).length : original.code === 'default-super-admin' ? 'All' : 0,
        sx: () => ({
            textAlign: 'right',
        }),
    },
    {
        Header: 'Users',
        accessor: 'users',
        Cell: ({ cell: { value } }) => (value ? JSON.parse(value).length : 0),
        sx: () => ({
            textAlign: 'right',
        }),
    },
];

export default column;
