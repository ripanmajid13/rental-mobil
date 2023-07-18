import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { CCol, CRow } from '@coreui/react';
import { CuiVerInput, CuiVerSelect } from '@components/coreui/vertical';

import { DialogAuth, DialogDownload, DialogPrint } from '@helpers/dialog';
import { FormDialog } from '@helpers/form';
import { TableDataQuery } from '@helpers/table';
import { stringToDateTime } from '@hooks/string';
import { typeIsUndefined } from '@hooks/type';

import column from './column';
import schema from './schema';
import Show from './Show';

const Role = ({ uri }) => {
    const [dialogForm, setDialogForm] = useState({});
    const [dialogDetail, setDialogDetail] = useState({});
    const [dialogDelete, setDialogDelete] = useState({});
    const [dialogDownload, setDialogDownload] = useState({});
    const [dialogPrint, setDialogPrint] = useState({});
    const [table, setTable] = useState({
        uri,
        column,
        selection: true,
        actions: {
            store: {
                display: 'Add',
                dialog: true,
                dialogRepeat: true,
                dialogDataServer: 'create',
                fn: (dataTable) => setDialogForm(dataTable),
            },
            update: {
                params: ['id'],
                display: 'Edit',
                data: true,
                dialog: true,
                dialogEdit: true,
                dialogDataServer: 'edit',
                fn: (dataTable) => setDialogForm(dataTable),
            },
            destroy: {
                params: ['id'],
                display: 'Delete',
                disabled: ({ users, permissions }) =>
                    typeIsUndefined(users) || typeIsUndefined(permissions)
                        ? true
                        : users || permissions
                        ? true
                        : false,
                data: true,
                dialog: true,
                dialogDestroy: true,
                dialogText: 'Are you sure you want to delete this data',
                fn: (dataTable) => setDialogDelete(dataTable),
            },
            download_excel: {
                display: 'Excel',
                dialog: true,
                dialogTitle: 'Download Excel',
                dialogDownload: true,
                dialogDownloadFile: stringToDateTime('', 'YmdHms') + 'Role',
                dialogDownloadTitleFile: 'Role',
                fn: (dataTable) => setDialogDownload(dataTable),
            },
            download_pdf: {
                display: 'PDF',
                dialog: true,
                dialogTitle: 'Download PDF',
                dialogDownload: true,
                dialogDownloadFile: stringToDateTime('', 'YmdHms') + 'Role',
                dialogDownloadTitleFile: 'Role',
                fn: (dataTable) => setDialogDownload(dataTable),
            },
            print: {
                display: 'Print',
                dialog: true,
                dialogTitle: 'Print PDF',
                dialogPrint: true,
                dialogPrintFile: stringToDateTime('', 'YmdHms') + 'Role',
                dialogPrintTitleFile: 'Role',
                fn: (dataTable) => setDialogPrint(dataTable),
            },
            trash: true,
        },
        actionsRow: {
            show: {
                params: ['id'],
                display: 'View',
                dialog: true,
                dialogEdit: true,
                fn: (dataTable) => setDialogDetail(dataTable),
            },
            update: {
                params: ['id'],
                display: 'Edit',
                dialog: true,
                dialogEdit: true,
                dialogDataServer: 'edit',
                fn: (dataTable) => setDialogForm(dataTable),
            },
            destroy: {
                params: ['id'],
                display: 'Delete',
                disabled: ({ users, permissions }) =>
                    typeIsUndefined(users) || typeIsUndefined(permissions)
                        ? true
                        : users || permissions
                        ? true
                        : false,
                dialog: true,
                dialogDestroy: true,
                dialogText: 'Are you sure you want to delete this data',
                fn: (dataTable) => setDialogDelete(dataTable),
            },
        },
    });

    return (
        <Box>
            <Show dialog={dialogDetail} setDialog={setDialogDetail} />
            <DialogAuth {...dialogDelete} setDialog={setDialogDelete} />
            <DialogDownload {...dialogDownload} setDialog={setDialogDownload} />
            <DialogPrint {...dialogPrint} setDialog={setDialogPrint} />
            <FormDialog
                {...dialogForm}
                schema={schema}
                setDialog={setDialogForm}
                children={(props) => (
                    <CRow>
                        <CCol xs={12}>
                            <div className="mb-2">
                                <CuiVerSelect
                                    {...props}
                                    name="type"
                                    label="Type"
                                    options={[
                                        { value: 1, label: 'A' },
                                        { value: 2, label: 'B' },
                                    ]}
                                />
                            </div>
                        </CCol>

                        <CCol xs={12}>
                            <div className="mb-2">
                                <CuiVerInput {...props} name="display" label="Display" />
                            </div>
                        </CCol>

                        <CCol xs={12}>
                            <div className="mb-2">
                                <CuiVerSelect
                                    {...props}
                                    name="permissions"
                                    label="Permissions"
                                    labelRequired={false}
                                    isMulti={true}
                                />
                            </div>
                        </CCol>

                        <CCol xs={12}>
                            <div className="mb-2">
                                <CuiVerSelect
                                    {...props}
                                    name="users"
                                    label="Users"
                                    labelRequired={false}
                                    isMulti={true}
                                    isSearchable={true}
                                />
                            </div>
                        </CCol>
                    </CRow>
                )}
            />
            <TableDataQuery {...table} setTable={setTable} />
        </Box>
    );
};

Role.propTypes = {
    uri: PropTypes.string,
};

export default Role;
