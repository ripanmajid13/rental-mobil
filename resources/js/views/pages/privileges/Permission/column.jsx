import React from 'react';

import { List, ListItem, ListItemText } from '@mui/material';

const column = [
    {
        Header: 'Name',
        accessor: 'name',
        filter: true,
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Frontend',
        accessor: 'path',
        filter: true,
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => {
            if (value !== null && value !== undefined) {
                return (
                    <List dense sx={{ p: 0 }}>
                        {JSON.parse(value).map((val, key) => (
                            <ListItem sx={{ p: 0 }} key={key}>
                                <ListItemText primary={`${key + 1}. ${val}`} sx={{ my: 0 }} />
                            </ListItem>
                        ))}
                    </List>
                );
            } else {
                return '-';
            }
        },
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Backend',
        accessor: 'uri',
        filter: true,
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => {
            if (value !== null && value !== undefined) {
                return (
                    <List dense sx={{ p: 0 }}>
                        {JSON.parse(value).map((val, key) => (
                            <ListItem sx={{ p: 0 }} key={key}>
                                <ListItemText primary={`${key + 1}. ${val}`} sx={{ my: 0 }} />
                            </ListItem>
                        ))}
                    </List>
                );
            } else {
                return '-';
            }
        },
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Controller',
        accessor: 'controller',
        filter: true,
        Cell: ({ cell: { value } }) => {
            return value
                ? value
                      .replace(/\\App\\Http\\Controllers\\/, '')
                      .split('\\')
                      .join(` / `)
                : '-';
        },
        sx: () => ({
            whiteSpace: 'nowrap',
        }),
    },
    {
        Header: 'Roles',
        accessor: 'roles',
        filter: true,
        Cell: ({ cell: { value } }) => {
            if (value !== null && value !== undefined) {
                return JSON.parse(value)
                    .map((val, key) => `${key + 1}. ${val}`)
                    .join(', ');
            } else {
                return '-';
            }
        },
        sx: () => ({
            textAlign: 'justify',
            textJustify: 'inter-word',
        }),
    },
    {
        Header: 'Users',
        accessor: 'users',
        filter: true,
        Cell: ({ cell: { value } }) => {
            if (value !== null && value !== undefined) {
                return JSON.parse(value)
                    .map((val, key) => `${key + 1}. ${val}`)
                    .join(', ');
            } else {
                return '-';
            }
        },
        sx: () => ({
            textAlign: 'justify',
            textJustify: 'inter-word',
        }),
    },
];

export default column;
