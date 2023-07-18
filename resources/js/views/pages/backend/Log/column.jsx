import { stringToDateTime } from '@hooks/string';

const column = [
    {
        Header: 'Date',
        accessor: 'date',
        filter: true,
        filterType: 'daterange',
        Cell: ({ cell: { value } }) => stringToDateTime(value, 'd/m/Y'),
    },
    {
        Header: 'Controller',
        accessor: 'controller',
        filter: true,
        Cell: ({ cell: { value }, row: { original } }) => {
            return !value
                ? ''
                : `${value.replace(/\\App\\Http\\Controllers\\/, '')}${
                      original.action === '__invoke' ? '' : '@' + original.action
                  }`;
        },
    },
    {
        Header: 'Level',
        accessor: 'level',
    },
    {
        Header: 'Message',
        accessor: 'message',
    },
    {
        Header: 'read',
        accessor: 'read',
    },
    {
        Header: 'User',
        accessor: 'user',
    },
];

export default column;
