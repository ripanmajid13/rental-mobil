const column = [
    {
        Header: 'Mobil',
        accessor: 'mobil',
        filter: true,
    },
    {
        Header: 'Tanggal Mulai',
        accessor: 'tanggal_mulai',
        filter: true,
    },
    {
        Header: 'Tanggal Selesai',
        accessor: 'tanggal_selesai',
        filter: true,
    },
    {
        Header: 'Pemilik',
        accessor: 'owner',
    },
    {
        Header: 'Status',
        accessor: 'pengembalian',
        sx: ({ value }) => ({
            fontWeight: 'bold',
            color: value === 'null' ? 'error.main' : 'success.main',
        }),
        Cell: ({ cell: { value } }) => (value ? 'Dikembalikan' : 'Digunakan'),
    },
];

export default column;
