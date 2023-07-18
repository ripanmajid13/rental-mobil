import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { DialogConfirmation } from '@helpers/dialog';
import { TableDataQuery } from '@helpers/table';
import { typeIsUndefined } from '@hooks/type';

import column from './column';

const Permission = ({ uri }) => {
    const [dialog, setDialog] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
        sx: ({ original }) =>
            (parseInt(original.middleware) < 1 || typeIsUndefined(original.middleware)) && {
                color: 'white',
                backgroundColor: 'error.light',
            },
        actions: {
            destroy: {
                params: ['id'],
                display: 'Delete',
                disabled: ({ middleware }) =>
                    parseInt(middleware) > 0 || typeIsUndefined(middleware),
                data: true,
                dialog: true,
                dialogDestroy: true,
                dialogText: 'Are you sure you want to delete this data',
                fn: (dataTable) => setDialog(dataTable),
            },
        },
        actionsRow: {
            destroy: {
                params: ['id'],
                display: 'Delete',
                disabled: ({ middleware }) =>
                    parseInt(middleware) > 0 || typeIsUndefined(middleware),
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
            <DialogConfirmation {...dialog} setDialog={setDialog} />
        </Box>
    );
};

Permission.propTypes = {
    uri: PropTypes.string,
};

export default Permission;
