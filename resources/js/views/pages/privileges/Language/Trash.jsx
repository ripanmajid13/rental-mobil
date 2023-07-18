import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { DialogConfirmation } from '@helpers/dialog';
import { TableDataQuery } from '@helpers/table';

import column from './column';

const Trash = ({ uri }) => {
    const [dialog, setDialog] = useState({});
    const [table, setTable] = useState({
        uri,
        back: uri.replace('/trash', ''),
        column,
        selection: true,
        selectionMultiple: true,
        actions: {
            restore: {
                uri: uri.replace('/trash', ''),
                display: 'Restore',
                data: true,
                dataMultiple: true,
                dialog: true,
                dialogData: true,
                dialogEdit: true,
                dialogTitle: 'Restore Data',
                dialogText: 'Are you sure you want to restore this data',
                fn: (dataTable) => setDialog(dataTable),
            },
            destroy_permanent: {
                uri: uri.replace('/trash', ''),
                display: 'Permanent Delete',
                data: true,
                dataMultiple: true,
                dialog: true,
                dialogData: true,
                dialogWidth: 'sm',
                dialogDestroy: true,
                dialogTitle: 'Permanent Delete Data',
                dialogText: 'Are you sure you want to delete this data permanently',
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

Trash.propTypes = {
    uri: PropTypes.string,
};

export default Trash;
