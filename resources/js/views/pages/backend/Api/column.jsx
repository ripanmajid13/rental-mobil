/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import i18next from 'i18next';

import { Box, Typography } from '@mui/material';

const column = [
    {
        Header: 'Method',
        accessor: 'methods',
        filter: true,
        Cell: ({ cell: { value } }) => {
            return value ? JSON.parse(value).join(', ') : '';
        },
        sx: ({ value }) => ({
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: JSON.parse(value).some((post) => post === 'POST')
                ? 'success.main'
                : JSON.parse(value).some((put) => put === 'PUT')
                ? 'warning.main'
                : JSON.parse(value).some((del) => del === 'DELETE')
                ? 'error.main'
                : '',
        }),
    },
    {
        Header: 'Controller',
        accessor: 'controller',
        filter: true,
        Cell: ({ cell: { value }, row: { original } }) => {
            return `${value.replace(/\\App\\Http\\Controllers\\/, '')}${
                original.action === '__invoke' ? '' : '@' + original.action
            }`;
        },
    },
    {
        Header: 'Path',
        accessor: 'path',
        filter: true,
        Cell: ({ cell: { value }, row: { original } }) => (
            <Box>
                <Typography
                    color={original.middleware === true ? 'red' : 'green'}
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                    children={
                        original.middleware === true
                            ? i18next.t('Authentication')
                            : i18next.t('Public')
                    }
                />
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ mb: '2px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                    children={'Frontend : ' + window.location.origin + value}
                />
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ my: '2px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                    children={`Backend : ${window.location.origin}/api${original.uri}`}
                />
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ mt: '2px', mb: 0 }}
                    children={'Permission : ' + original.permission}
                />
            </Box>
        ),
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
];

export default column;
