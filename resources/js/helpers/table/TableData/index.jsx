import React, { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useRowSelect, useSortBy, useTable } from 'react-table';

import { Box, Checkbox } from '@mui/material';

import { typeIsFunction, typeIsObject, typeIsString, typeIsUndefined } from '@hooks/type';

import Content from './Content';
import Filter from './Filter';
import Footer from './Footer';
import Header from './Header';

const CheckboxRow = forwardRef(function CheckboxRow({ indeterminate, ...rest }, ref) {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <Checkbox
            ref={resolvedRef}
            {...rest}
            indeterminate={indeterminate}
            sx={{ ...rest.sx, p: 0 }}
        />
    );
});

CheckboxRow.propTypes = {
    indeterminate: PropTypes.bool.isRequired,
};

CheckboxRow.displayName = 'CheckboxRow';

const TableData = ({ children, column, setService, ...service }) => {
    let location = useLocation();

    const hiddenColumns = [];
    const data = useMemo(() => children.data ?? [], [children]);
    const columns = useMemo(() => column, [column]);

    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line prettier/prettier
    const [paginate, setPaginate] = useState({ ...service.payloadDefault, ...service.payload }.paginate ?? 10);

    const paginateOptions = [
        { value: 10, label: 10 },
        { value: 25, label: 25 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
        { value: 200, label: 200 },
    ];

    if (service.no !== true) {
        hiddenColumns.push('#');
    }

    if (service.selection !== true) {
        hiddenColumns.push('selection');
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        setSortBy,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                hiddenColumns: hiddenColumns.concat(
                    columns.map((column) => {
                        if (column.show === false) return column.accessor || column.id;
                    })
                ),
                sortBy: [],
                paginate: {
                    from: children.from ?? 0, // from backend
                },
            },
            stateReducer: (newState, action) => {
                if (!service.multiple === true && action.type === 'toggleRowSelected') {
                    newState.selectedRowIds = {
                        [action.id]: action.value,
                    };
                }

                return newState;
            },
            sortTypes: {
                alphanumeric: (row1, row2, columnName) => {
                    const rowOneColumn = row1.values[columnName];
                    const rowTwoColumn = row2.values[columnName];

                    if (isNaN(rowOneColumn) && rowOneColumn !== null) {
                        if (rowTwoColumn !== null) {
                            return rowOneColumn.toUpperCase() > rowTwoColumn.toUpperCase() ? 1 : -1;
                        }
                    }

                    return Number(rowOneColumn) > Number(rowTwoColumn) ? -1 : 1;
                },
            },
        },
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header:
                        service.multiple === true
                            ? ({ getToggleAllRowsSelectedProps }) => (
                                  <CheckboxRow
                                      {...getToggleAllRowsSelectedProps()}
                                      id="0"
                                      sx={{
                                          color: '#FFFFFF',
                                          '&.Mui-checked': {
                                              color: '#FFFFFF',
                                          },
                                          '&.MuiCheckbox-indeterminate': {
                                              color: '#FFFFFF',
                                          },
                                      }}
                                  />
                              )
                            : '',
                    // eslint-disable-next-line react/prop-types
                    Cell: ({ row, rows }) => (
                        <CheckboxRow
                            // eslint-disable-next-line react/prop-types
                            {...row.getToggleRowSelectedProps()}
                            // eslint-disable-next-line react/prop-types
                            id={(rows.indexOf(row) + 1).toString()}
                            sx={{
                                color: 'inherit',
                                '&.Mui-checked': {
                                    color: 'inherit',
                                },
                                '&.MuiCheckbox-indeterminate': {
                                    color: 'inherit',
                                },
                            }}
                        />
                    ),
                    sorted: false,
                },
                {
                    id: '#',
                    Header: '#',
                    sticky: 'left',
                    // eslint-disable-next-line prettier/prettier
                    Cell: ({ row, rows, initialState: { paginate } }) => rows.indexOf(row) + paginate.from,
                    sorted: false,
                },
                ...columns,
            ]);
        }
    );

    useEffect(() => {
        if (loading === true) {
            setLoading(false);
            if (service.payload?.datatable_sorting) {
                setSortBy(JSON.parse(service.payload?.datatable_sorting));
            } else {
                setSortBy([]);
            }
        }
    }, [data]);

    return (
        <Box>
            {(service.custom || columns.filter((cf) => cf.filter === true).length > 0) && (
                <Filter
                    data_filter={children.data_filter ?? {}}
                    data={filter}
                    columns={columns.filter((cf) => cf.filter === true)}
                    setFilter={setFilter}
                    custom={service.custom}
                />
            )}

            <Header
                uri={service.uri.length < 1 ? location.pathname : service.uri}
                back={service.back}
                actions={service.actions}
                columns={columns}
                filter={() => {
                    let newFilter = [];
                    for (let [key, val] of Object.entries(filter)) {
                        if (val.value.length > 0) {
                            // eslint-disable-next-line prettier/prettier
                            if ((column.filter((cf) => cf.accessor === key.replace('filter_', ''))[0].filterType ?? 'text') === 'daterange') {
                                if (val.value.split(' - ').some((vss) => vss === 'null')) {
                                    newFilter.push({
                                        key: key.replace('filter_', ''),
                                        value: val.value.split(' - ')[0],
                                        type: 'date',
                                    });
                                } else {
                                    newFilter.push({
                                        key: key.replace('filter_', ''),
                                        value: val.value,
                                        type: 'daterange',
                                    });
                                }
                            } else {
                                newFilter.push({
                                    key: key.replace('filter_', ''),
                                    value: val.value,
                                    // eslint-disable-next-line prettier/prettier
                                    type: column.filter((cf) => cf.accessor === key.replace('filter_', ''))[0].filterType ?? 'text',
                                });
                            }
                        }
                    }
                    return JSON.stringify(newFilter);
                }}
                selectedRow={selectedFlatRows.map((d) => d.original)}
                searchRow={() => {
                    let newFilter = [];
                    for (let [key, val] of Object.entries(filter)) {
                        if (val.value.length > 0) {
                            // eslint-disable-next-line prettier/prettier
                            if ((column.filter((cf) => cf.accessor === key.replace('filter_', ''))[0].filterType ?? 'text') === 'daterange') {
                                if (val.value.split(' - ').some((vss) => vss === 'null')) {
                                    newFilter.push({
                                        key: key.replace('filter_', ''),
                                        value: val.value.split(' - ')[0],
                                        type: 'date',
                                    });
                                } else {
                                    newFilter.push({
                                        key: key.replace('filter_', ''),
                                        value: val.value,
                                        type: 'daterange',
                                    });
                                }
                            } else {
                                newFilter.push({
                                    key: key.replace('filter_', ''),
                                    value: val.value,
                                    // eslint-disable-next-line prettier/prettier
                                    type: column.filter((cf) => cf.accessor === key.replace('filter_', ''))[0].filterType ?? 'text',
                                });
                            }
                        }
                    }
                    setLoading(true);
                    setService({
                        ...service,
                        column,
                        params: service.paramsDefault,
                        payload: {
                            ...service.payload,
                            datatable_filter: JSON.stringify(newFilter),
                        },
                    });
                }}
                reloadRow={() => {
                    setLoading(true);
                    setFilter({});
                    setPaginate(service.payloadDefault.paginate ?? 10);
                    setService({
                        ...service,
                        column,
                        params: service.paramsDefault,
                        payload: {
                            ...service.payload,
                            ...service.payloadDefault,
                            // eslint-disable-next-line prettier/prettier
                            paginate: service.payloadDefault.paginate ?? 10,
                            datatable_filter: JSON.stringify(
                                column
                                    .filter(
                                        (cf) =>
                                            cf.filter === true &&
                                            typeIsUndefined(cf.filterValue) !== true &&
                                            typeIsString(cf.filterValue) === true &&
                                            cf.filterValue.length > 0
                                    )
                                    .map((valFil) => {
                                        return {
                                            key: valFil.accessor,
                                            value: valFil.filterValue,
                                            type: valFil.filterType ?? 'text',
                                        };
                                    })
                            ),
                            datatable_sorting: JSON.stringify([]),
                        },
                    });
                }}
            />

            <Content
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                prepareRow={prepareRow}
                rows={rows}
                columns={columns}
                loading={loading}
                selection={service.selection}
                no={service.no}
                sx={
                    typeIsFunction(service.sx) &&
                    typeIsObject(
                        service.sx({
                            original: {},
                        })
                    )
                        ? ({ original }) => service.sx({ original })
                        : () => ({ original: {} })
                }
                reloadRow={(resReloadRow) => {
                    setLoading(true);
                    setService({
                        ...service,
                        column,
                        ...resReloadRow,
                    });
                }}
            />

            <Footer
                current_page={children.current_page ?? 1}
                from={children.from ?? 0}
                last_page={children.last_page ?? 0}
                to={children.to ?? 0}
                total={children.total ?? 0}
                params={service.params}
                paramsDefault={service.paramsDefault}
                paginate={paginate}
                paginateOptions={paginateOptions}
                filterRow={(value) => {
                    setLoading(true);
                    setPaginate(value);
                    setService({
                        ...service,
                        column,
                        params: service.paramsDefault,
                        payload: {
                            ...service.payload,
                            paginate: value,
                        },
                    });
                }}
                reloadRow={(resReloadRow) => {
                    setLoading(true);
                    setService({
                        ...service,
                        column,
                        ...resReloadRow,
                    });
                }}
            />
        </Box>
    );
};

TableData.defaultProps = {
    no: true,
    uri: '',
    back: '',
    multiple: false,
    selection: false,
    payload: {},
    payloadDefault: {},
    params: {},
    paramsDefault: {},
    actions: {},
};

TableData.propTypes = {
    children: PropTypes.shape({
        data: PropTypes.array,
        data_filter: PropTypes.object,
        current_page: PropTypes.number,
        from: PropTypes.number,
        last_page: PropTypes.number,
        to: PropTypes.number,
        total: PropTypes.number,
    }),
    column: PropTypes.array.isRequired,
    no: PropTypes.bool,
    uri: PropTypes.string,
    back: PropTypes.string,
    params: PropTypes.object,
    paramsDefault: PropTypes.object,
    payload: PropTypes.object,
    payloadDefault: PropTypes.object,
    multiple: PropTypes.bool,
    selection: PropTypes.bool,
    setService: PropTypes.func.isRequired,
    actions: PropTypes.object,
    sx: PropTypes.func,
    custom: PropTypes.node,
};

export default memo(TableData);
