const column = [
    {
        Header: 'Key',
        accessor: 'key',
        filter: true,
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'EN',
        accessor: 'lang_en',
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'ID',
        accessor: 'lang_id',
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Updated',
        accessor: 'updated',
    },
];

export default column;
