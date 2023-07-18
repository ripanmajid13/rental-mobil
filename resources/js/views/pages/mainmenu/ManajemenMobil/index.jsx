import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { CCol, CRow } from '@coreui/react';
import { CuiVerInput } from '@components/coreui/vertical';

import { DialogAuth } from '@helpers/dialog';
import { FormDialog } from '@helpers/form';
import { TableDataQuery } from '@helpers/table';
import { typeIsUndefined } from '@hooks/type';

import column from './column';
import schema from './schema';

const ManajemenMobil = ({ uri }) => {
    const [dialogForm, setDialogForm] = useState({});
    // const [dialogDelete, setDialogDelete] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
        actions: {
            store: {
                display: 'Tambah',
                dialog: true,
                dialogRepeat: true,
                fn: (dataTable) => setDialogForm(dataTable),
            },
            update: {
                params: ['id'],
                display: 'Ubah',
                data: true,
                dialog: true,
                dialogData: true,
                dialogEdit: true,
                fn: (dataTable) => setDialogForm(dataTable),
            },
            // destroy: {
            //     params: ['id'],
            //     display: 'Delete',
            //     disabled: ({ roles }) => (typeIsUndefined(roles) ? true : roles ? true : false),
            //     data: true,
            //     dialog: true,
            //     dialogDestroy: true,
            //     dialogText: 'Are you sure you want to delete this data',
            //     fn: (dataTable) => setDialogDelete(dataTable),
            // },
        },
    });

    return (
        <Box>
            <TableDataQuery {...table} setTable={setTable} />
            {/* <DialogAuth {...dialogDelete} setDialog={setDialogDelete} />
             */}
            <FormDialog
                {...dialogForm}
                schema={schema}
                setDialog={setDialogForm}
                children={(props) => (
                    <CRow>
                        <CCol xs={12} className="mb-2">
                            <CuiVerInput {...props} name="merk" label="Merk" />
                        </CCol>
                        <CCol xs={12} className="mb-2">
                            <CuiVerInput {...props} name="model" label="Model" />
                        </CCol>
                        <CCol xs={12} className="mb-2">
                            <CuiVerInput {...props} name="plat" label="Plat" />
                        </CCol>
                        <CCol xs={12}>
                            <CuiVerInput {...props} name="tarif" label="Tarif" />
                        </CCol>
                    </CRow>
                )}
            />
        </Box>
    );
};

ManajemenMobil.propTypes = {
    uri: PropTypes.string,
};

export default ManajemenMobil;
