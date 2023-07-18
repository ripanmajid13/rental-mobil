import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { DialogAuth } from '@helpers/dialog';
import { TableDataQuery } from '@helpers/table';

import column from './column';

const Language = ({ uri }) => {
    const [dialog, setDialog] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
        actions: {
            create: {
                display: 'Add',
                pageRepeat: true,
            },
            edit: {
                data: true,
                params: ['id'],
                // params: ['id', { status: 'true' }], // sample
                display: 'Edit',
                pageEdit: true,
            },
            destroy: {
                params: ['id'],
                display: 'Delete',
                data: true,
                dialog: true,
                dialogDestroy: true,
                dialogText: 'Are you sure you want to delete this data',
                fn: (dataTable) => setDialog(dataTable),
            },
            trash: true,
            helper: {
                color: 'warning',
                dialog: true,
                dialogTitle: 'Helper',
                fn: (dataTable) => setDialog(dataTable),
            },
        },
        actionsRow: {
            edit: {
                params: ['id'],
                display: 'Edit',
                pageEdit: true,
            },
            destroy: {
                params: ['id'],
                display: 'Delete',
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

Language.propTypes = {
    uri: PropTypes.string,
};

export default Language;
