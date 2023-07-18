const stringToCurrency = (value = '') => {
    let newValue = '';
    const string = value.replace(/[^\d]/g, '').toString(),
        left = string.length % 3,
        rupiah = string.substring(0, left),
        ribuan = string.substring(left).match(/\d{3}/gi);

    newValue = rupiah;

    if (ribuan) {
        newValue += (left ? '.' : '') + ribuan.join('.');
    }

    return newValue;
};

const column = [
    {
        Header: 'Merk',
        accessor: 'merk',
        filter: true,
    },
    {
        Header: 'Model',
        accessor: 'model',
        filter: true,
    },
    {
        Header: 'Nomor Plat',
        accessor: 'plat',
        filter: true,
    },
    {
        Header: 'Tarif/hari',
        accessor: 'tarif',
        Cell: ({ cell: { value } }) => 'Rp. ' + stringToCurrency(value.toString()),
        filter: true,
    },
    {
        Header: 'Pemilik',
        accessor: 'owner',
    },
];

export default column;
