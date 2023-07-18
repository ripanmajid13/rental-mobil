import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { CCol, CRow } from '@coreui/react';
import { CuiVerSelect } from '@components/coreui/vertical';

import { FormDialog } from '@helpers/form';
import { TableDataQuery } from '@helpers/table';

import column from './column';
import schema from './schema';

const PengembalianMobil = ({ uri }) => {
    const [dialogForm, setDialogForm] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
        actions: {
            store: {
                display: 'Tambah',
                dialog: true,
                dialogWidth: 'md',
                dialogRepeat: true,
                dialogDataServer: 'create',
                fn: (dataTable) => setDialogForm(dataTable),
            },
            update: {
                params: ['id'],
                display: 'Ubah',
                data: true,
                dialog: true,
                dialogWidth: 'md',
                dialogData: true,
                dialogEdit: true,
                fn: (dataTable) => setDialogForm(dataTable),
            },
        },
    });

    return (
        <Box>
            <TableDataQuery {...table} setTable={setTable} />
            <FormDialog
                {...dialogForm}
                schema={schema}
                setDialog={setDialogForm}
                children={(props) => (
                    <CRow>
                        <CCol xs={12} className="mb-2">
                            <CuiVerSelect {...props} name="mobil_id" label="Mobil" />
                        </CCol>
                    </CRow>
                )}
            />
        </Box>
    );
};

PengembalianMobil.propTypes = {
    uri: PropTypes.string,
};

export default PengembalianMobil;
