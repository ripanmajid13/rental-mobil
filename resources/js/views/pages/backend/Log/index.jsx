import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { TableDataQuery } from '@helpers/table';

import column from './column';

const Log = ({ uri }) => {
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
    });

    return (
        <Box>
            <TableDataQuery {...table} setTable={setTable} />
        </Box>
    );
};

Log.propTypes = {
    uri: PropTypes.string,
};

export default Log;
