const column = [
    {
        Header: 'Name',
        accessor: 'name',
        filter: true,
    },
    {
        Header: 'Roles',
        accessor: 'roles',
        sorted: false,
        Cell: ({ cell: { value } }) => {
            if (value !== null && value !== undefined) {
                return JSON.parse(value)
                    .map((vm) => vm.label)
                    .join(', ');
            } else {
                return '-';
            }
        },
    },
];

export default column;
