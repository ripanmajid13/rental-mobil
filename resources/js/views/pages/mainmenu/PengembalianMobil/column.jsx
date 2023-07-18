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
        Header: 'Biaya Sewa',
        accessor: 'tarif',
        Cell: ({ cell: { value }, row: { original } }) => {
            const dt1 = new Date(original.tanggal_mulai);
            const dt2 = new Date(original.tanggal_selesai);

            const pay = Math.floor(
                (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                    Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
                    (1000 * 60 * 60 * 24)
            );
            return 'Rp. ' + stringToCurrency((parseInt(value) * (pay + 1)).toString());
        },
    },
    {
        Header: 'Pemilik',
        accessor: 'owner',
    },
];

export default column;
