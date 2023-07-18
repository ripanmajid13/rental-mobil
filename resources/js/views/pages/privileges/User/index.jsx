import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { DialogAuth } from '@helpers/dialog';
import { TableDataQuery } from '@helpers/table';
import { typeIsUndefined } from '@hooks/type';

import column from './column';

const User = ({ uri }) => {
    const [dialog, setDialog] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
        sx: ({ original }) =>
            original.active !== 'true' && {
                color: 'white !important',
                backgroundColor: 'error.light',
            },
        actions: {
            create: {
                display: 'Add',
                pageRepeat: true,
                pageAction: 'store',
                pageDataServer: true,
            },
            show: {
                data: true,
                params: ['id'],
                display: 'View',
            },
            edit: {
                data: true,
                params: ['id'],
                display: 'Edit',
                pageEdit: true,
                pageAction: 'update',
                pageDataServer: true,
            },
            destroy: {
                params: ['id'],
                display: 'Delete',
                data: true,
                // eslint-disable-next-line prettier/prettier
                disabled: ({ roles, permissions }) => ((typeIsUndefined(roles) || typeIsUndefined(permissions)) ? true : roles ? true : false),
                dialog: true,
                dialogDestroy: true,
                dialogText: 'Are you sure you want to delete this data',
                fn: (dataTable) => setDialog(dataTable),
            },
            trash: true,
        },
        actionsRow: {
            show: {
                params: ['id'],
                display: 'View',
            },
            edit: {
                params: ['id'],
                display: 'Edit',
                pageEdit: true,
                pageAction: 'update',
                pageDataServer: true,
            },
            destroy: {
                params: ['id'],
                display: 'Delete',
                // eslint-disable-next-line prettier/prettier
                disabled: ({ roles, permissions }) => ((typeIsUndefined(roles) || typeIsUndefined(permissions)) ? true : roles ? true : false),
                dialog: true,
                dialogDestroy: true,
                dialogText: 'Are you sure you want to delete this data',
                fn: (dataTable) => setDialog(dataTable),
            },
        },
    });

    return (
        <Box>
            <TableDataQuery {...table} setTable={setTable} />
            <DialogAuth {...dialog} setDialog={setDialog} />
        </Box>
    );
};

User.propTypes = {
    uri: PropTypes.string,
};

export default User;
