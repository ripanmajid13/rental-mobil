import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { DialogAuth } from '@helpers/dialog';
import { TableDataQuery } from '@helpers/table';

import column from './column';

const Api = ({ uri }) => {
    const [dialog, setDialog] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        actions: {
            update: {
                color: 'warning',
                dialog: true,
                dialogTitle: 'Update Api',
                dialogEdit: true,
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

Api.propTypes = {
    uri: PropTypes.string,
};

export default Api;
