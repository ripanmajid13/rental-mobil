import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath, useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useRowSelect, useSortBy, useTable } from 'react-table';
import { useQuery } from '@tanstack/react-query';

import {
    Badge,
    Box,
    Button,
    Checkbox,
    Divider,
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import api from '@configs/api';
import configColor from '@configs/color';
import { decrypt } from '@configs/crypto';
import method from '@configs/method';
import xsrfToken from '@configs/xsrfToken';

import spinImage from '@assets/images/spin.svg';
import {
    typeIsBoolean,
    typeIsFunction,
    typeIsObject,
    typeIsString,
    typeIsUndefined,
} from '@hooks/type';
import Error404 from '@views/errors/Error404';

import color from './assets/color';
import disabled from './assets/disabled';
import display from './assets/display';
import icon from './assets/icon';
import pathname from './assets/pathname';
import title from './assets/title';
import url from './assets/url';
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

const TableDataQuery = ({
    app_token,
    uri,
    back,
    payload,
    querykey,
    no,
    selection,
    selectionMultiple,
    actions,
    actionsRow,
    column,
    setTable,
    sx,
}) => {
    const token = JSON.parse(decrypt(app_token));
    const navigate = useNavigate();

    const superadmin = token.roles.some((dtrs) => dtrs === 'default-super-admin');
    const permissions = token.permissions ?? [];

    const defaultFilter = column
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
        });

    const [filter, setFilter] = useState({});

    const { isLoading, isError, error, data, isFetching, refetch } = useQuery({
        queryKey: [uri, { table_search: defaultFilter, ...payload }, querykey],
        queryFn: async () =>
            await api.post(
                uri,
                { table_search: defaultFilter, ...payload },
                {
                    headers: {
                        Authorization: token.token,
                    },
                }
            ),
    });

    const dataTable = useMemo(() => data?.data?.data ?? [], [data]);
    const columnTable = useMemo(() => column, [column]);

    // eslint-disable-next-line prettier/prettier
    const actionsPermission = Object.keys(actions).filter((fill) => permissions.some((ups) => superadmin || matchPath(ups.uri, Object.values(url(fill, actions[fill].uri ?? uri), actions[fill].params).join('/'))));
    // eslint-disable-next-line prettier/prettier
    const actionsRowPermission = Object.keys(actionsRow).filter((fill) => permissions.some((ups) => superadmin || matchPath(ups.uri, Object.values(url(fill, actionsRow[fill].uri ?? uri), actionsRow[fill].params).join('/'))));

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
            data: dataTable,
            columns: columnTable,
            initialState: {
                hiddenColumns: [
                    ...[no !== true && '#'],
                    ...[selection !== true && 'selection'],
                    ...[actionsRowPermission.length < 1 && 'actions'],
                ].concat(
                    columnTable.map((column) => {
                        if (column.show === false) return column.accessor || column.id;
                    })
                ),
                sortBy: [],
                paginate: {
                    from: data?.data?.from ?? 0, // from backend
                },
            },
            stateReducer: (newState, action) => {
                if (!selectionMultiple === true && action.type === 'toggleRowSelected') {
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
                    width: '1%',
                    Header:
                        selectionMultiple === true
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
                                py: 0,
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
                    width: '1%',
                    // eslint-disable-next-line prettier/prettier
                    Cell: ({ row, rows, initialState: { paginate } }) => (rows.indexOf(row) + paginate.from),
                    sorted: false,
                },
                ...columns,
                {
                    id: 'actions',
                    Header: '',
                    width: '1%',
                    // eslint-disable-next-line react/prop-types
                    Cell: ({ row }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {actionsRowPermission.map((val, key) => (
                                <Badge
                                    key={key}
                                    // eslint-disable-next-line prettier/prettier
                                    invisible={permissions.some((ups) => matchPath(ups.uri, Object.values(url(val, actionsRow[val].uri ?? uri, actionsRow[val].params)).join('/')))}
                                    variant="dot"
                                    color="warning"
                                    // eslint-disable-next-line prettier/prettier
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left'  }}
                                    sx={{
                                        // eslint-disable-next-line prettier/prettier
                                        mr: Object.keys(actionsRow).length === key + 1 ? 0 : '0.25rem',
                                        '& .MuiBadge-badge': {
                                            animation: 'blinker 1s linear infinite',
                                            '@keyframes blinker': {
                                                '50%': {
                                                    opacity: 0,
                                                },
                                            },
                                        },
                                    }}>
                                    <Button
                                        disableElevation
                                        disableTouchRipple
                                        size="small"
                                        // eslint-disable-next-line prettier/prettier
                                        color={color(url(val, actionsRow[val].uri ?? uri, actionsRow[val].params).action, actionsRow[val].color)}
                                        title={i18next.t(display(val, actionsRow[val].display))}
                                        variant="contained"
                                        disabled={disabled({ ...actionsRow[val], data: true }, [
                                            // eslint-disable-next-line react/prop-types
                                            row.original,
                                        ])}
                                        onClick={() => {
                                            // eslint-disable-next-line react/prop-types
                                            const rowData = row.original;
                                            // eslint-disable-next-line prettier/prettier
                                            const urlPermission = url(val, actionsRow[val].uri ?? uri, actionsRow[val].params);

                                            if (typeIsFunction(actionsRow[val].fn)) {
                                                actionsRow[val].fn({
                                                    // eslint-disable-next-line prettier/prettier
                                                    ...(typeIsBoolean(actionsRow[val].dialog) && actionsRow[val].dialog === true
                                                        ? {
                                                              open: true,
                                                              // eslint-disable-next-line prettier/prettier
                                                              width: actionsRow[val].dialogWidth ?? 'xs',
                                                              // eslint-disable-next-line prettier/prettier
                                                              ...(actionsRow[val].dialogText && {
                                                                  // eslint-disable-next-line prettier/prettier
                                                                  text: actionsRow[val].dialogText,
                                                              }),
                                                              // eslint-disable-next-line prettier/prettier
                                                              title: typeIsString(actionsRow[val].dialogTitle) ? actionsRow[val].dialogTitle : title(val, actionsRow[val].display, Object.values(urlPermission).join('/'), permissions),
                                                              // eslint-disable-next-line prettier/prettier
                                                              type: actionsRow[val].dialogEdit === true ? 'edit' : (actionsRow[val].dialogDestroy === true ? 'destroy' : 'create'),
                                                              // eslint-disable-next-line prettier/prettier
                                                              method: actionsRow[val].dialogEdit === true ? method[1] : (actionsRow[val].dialogDestroy === true ? method[2] : method[0]),
                                                              // eslint-disable-next-line prettier/prettier
                                                              repeat: typeIsBoolean(actionsRow[val].dialogRepeat) ? actionsRow[val].dialogRepeat : false,
                                                              // eslint-disable-next-line prettier/prettier
                                                              pathname: pathname(val, actionsRow[val].uri ?? uri, actionsRow[val].params, rowData),
                                                              // eslint-disable-next-line prettier/prettier
                                                              payload: actionsRow[val].dialogPayload ?? {},
                                                              // eslint-disable-next-line prettier/prettier
                                                              ...(typeIsString(actionsRow[val].dialogDataServer) && actionsRow[val].dialogDataServer.length > 0 && {
                                                                      // eslint-disable-next-line prettier/prettier
                                                                      pathnameDataServer: pathname(actionsRow[val].dialogDataServer, actionsRow[val].uri ?? uri, actionsRow[val].params, rowData)
                                                                  }),
                                                              data: rowData,
                                                              refetch: () =>
                                                                  setTable((prevState) => ({
                                                                      ...prevState,
                                                                      // eslint-disable-next-line prettier/prettier
                                                                      querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                                                                      payload: {
                                                                          page: 1,
                                                                      },
                                                                  })),
                                                          }
                                                        : {}),
                                                });
                                            } else {
                                                // eslint-disable-next-line prettier/prettier
                                                navigate(pathname(val, actionsRow[val].uri ?? uri, actionsRow[val].params, rowData), {
                                                        replace: true,
                                                        state: {
                                                            data: rowData,
                                                            // eslint-disable-next-line prettier/prettier
                                                            type: actionsRow[val].pageEdit === true ? 'edit' : (actionsRow[val].pageDestroy === true ? 'destroy' : 'create'),
                                                            // eslint-disable-next-line prettier/prettier
                                                            method: actionsRow[val].pageEdit === true ? method[1] : (actionsRow[val].pageDestroy === true ? method[2] : method[0]),
                                                            // eslint-disable-next-line prettier/prettier
                                                            repeat: typeIsBoolean(actionsRow[val].pageRepeat) ? actionsRow[val].pageRepeat : false,
                                                            // eslint-disable-next-line prettier/prettier
                                                            pathname: pathname(val, actionsRow[val].uri ?? uri, actionsRow[val].params, rowData),
                                                            // eslint-disable-next-line prettier/prettier
                                                            pathnameHome: actionsRow[val].pageHome ?? (actionsRow[val].uri ?? uri),
                                                            // eslint-disable-next-line prettier/prettier
                                                            pathnameAction: pathname(actionsRow[val].pageAction ?? val, actionsRow[val].uri ?? uri, actionsRow[val].params, rowData),
                                                            payload: {
                                                                ...(actionsRow[val].pagePayload && {
                                                                    ...actionsRow[val].pagePayload,
                                                                }),
                                                            },
                                                            // eslint-disable-next-line prettier/prettier
                                                            ...(typeIsBoolean(actionsRow[val].pageDataServer) && actionsRow[val].pageDataServer === true && {
                                                                    // eslint-disable-next-line prettier/prettier
                                                                dataServer: true
                                                                }),
                                                        },
                                                    }
                                                );
                                            }
                                        }}
                                        sx={{
                                            py: '3px',
                                            px: '4px',
                                            minWidth: 'auto',
                                            '& .MuiSvgIcon-root': {
                                                width: '20px',
                                                height: '20px',
                                            },
                                        }}
                                        // eslint-disable-next-line prettier/prettier
                                        children={icon(url(val, actionsRow[val].uri ?? uri, actionsRow[val].params).action, actionsRow[val].icon)}
                                    />
                                </Badge>
                            ))}
                        </Box>
                    ),
                    sorted: false,
                },
            ]);
        }
    );

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (isLoading !== true) {
            if (payload.table_order) {
                if (Object.keys(payload.table_order).length < 1) {
                    setSortBy([]);
                } else {
                    setSortBy([
                        {
                            id: payload.table_order.name,
                            desc: payload.table_order.value === 'desc' ? true : false,
                        },
                    ]);
                }
            }
        }
    }, [data]);

    if (isError) {
        return <Error404 status={error.response.status} message={error.message} />;
    } else {
        return (
            <Paper
                elevation={0}
                // eslint-disable-next-line prettier/prettier
                sx={{ p: 1, boxShadow: 'rgb(51 48 60 / 3%) 0px 2px 7px 1px, rgb(51 48 60 / 2%) 0px 4px 7px 0px, rgb(51 48 60 / 1%) 0px 1px 4px 2px' }}>
                {isLoading ? (
                    <Box>
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={130}
                            height={28}
                            sx={{ mb: 2 }}
                        />

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3} sx={{ pt: '0 !important', mb: 1 }}>
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={22}
                                    sx={{ marginBottom: '2px' }}
                                />
                                <Skeleton animation="wave" variant="rounded" height={31} />
                            </Grid>

                            <Grid item xs={12} sm={3} sx={{ pt: '0 !important', mb: 1 }}>
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={22}
                                    sx={{ marginBottom: '2px' }}
                                />
                                <Skeleton animation="wave" variant="rounded" height={31} />
                            </Grid>

                            <Grid item xs={12} sm={3} sx={{ pt: '0 !important', mb: 1 }}>
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={22}
                                    sx={{ marginBottom: '2px' }}
                                />
                                <Skeleton animation="wave" variant="rounded" height={31} />
                            </Grid>

                            <Grid item xs={12} sm={3} sx={{ pt: '0 !important', mb: 1 }}>
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={22}
                                    sx={{ marginBottom: '2px' }}
                                />
                                <Skeleton animation="wave" variant="rounded" height={31} />
                            </Grid>
                        </Grid>

                        <Divider sx={{ mb: 1, backgroundColor: 'rgba(224, 224, 224, 1)' }} />

                        <Box sx={{ display: 'flex' }}>
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={100}
                                height={31}
                                sx={{ marginBottom: '8px' }}
                            />{' '}
                            &nbsp;&nbsp;
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={100}
                                height={31}
                                sx={{ marginBottom: '8px' }}
                            />
                        </Box>

                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width="100%"
                            height={300}
                        />

                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={200}
                                        height={31}
                                    />
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={40}
                                        height={31}
                                        sx={{ mr: 1 }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={40}
                                        height={31}
                                        sx={{ mr: 1 }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={40}
                                        height={31}
                                        sx={{ mr: 1 }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={40}
                                        height={31}
                                        sx={{ mr: 1 }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={40}
                                        height={31}
                                        sx={{ mr: 1 }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        {column.filter((col) => col.filter === true).length > 0 && (
                            <Filter
                                column={column.filter((col) => col.filter === true)}
                                dataFilter={filter}
                                setFilter={setFilter}
                                additional={data?.data?.additional}
                            />
                        )}

                        <Header
                            uri={uri}
                            back={back}
                            actions={Object.keys(actions)}
                            actionsData={actions}
                            rowData={selectedFlatRows.map((d) => d.original)}
                            permissions={permissions}
                            setTable={setTable}
                            column={column.filter((col) => col.filter === true)}
                            filter={filter}
                            setFilter={setFilter}
                        />

                        <TableContainer>
                            <Table
                                {...getTableProps()}
                                sx={{ minWidth: '100%' }}
                                size="small"
                                aria-label="a dense table">
                                <TableHead>
                                    {headerGroups.map((headerGroup, headerGroupKey) => (
                                        <TableRow
                                            key={headerGroupKey}
                                            {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(
                                                ({ sorted = true, ...column }, columnKey) => {
                                                    // console.log(sorted);
                                                    return (
                                                        <TableCell
                                                            {...column.getHeaderProps()}
                                                            key={columnKey}
                                                            padding="none"
                                                            onClick={() => {
                                                                // eslint-disable-next-line prettier/prettier
                                                                if (!['selection', '#', 'actions'].some((ids) => ids === column.id)) {
                                                                    if (column.isSorted === true) {
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        if (column.isSortedDesc === false) {
                                                                            setTable(
                                                                                (prevState) => ({
                                                                                    ...prevState,
                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                    querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                                                                                    payload: {
                                                                                        ...prevState.payload,
                                                                                        table_order:
                                                                                            {
                                                                                                name: column.id,
                                                                                                value: 'desc',
                                                                                            },
                                                                                    },
                                                                                })
                                                                            );
                                                                        } else {
                                                                            setTable(
                                                                                (prevState) => ({
                                                                                    ...prevState,
                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                    querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                                                                                    payload: {
                                                                                        ...prevState.payload,
                                                                                        table_order:
                                                                                            {},
                                                                                    },
                                                                                })
                                                                            );
                                                                        }
                                                                    } else {
                                                                        setTable((prevState) => ({
                                                                            ...prevState,
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                                                                            payload: {
                                                                                ...prevState.payload,
                                                                                table_order: {
                                                                                    name: column.id,
                                                                                    value: 'asc',
                                                                                },
                                                                            },
                                                                        }));
                                                                    }
                                                                }
                                                            }}
                                                            sx={{
                                                                py: '6px',
                                                                px: '8px',
                                                                border: '1px solid rgba(224, 224, 224, 1)',
                                                                fontWeight: 'bold',
                                                                whiteSpace: 'nowrap',
                                                                userSelect: 'none',
                                                                color: configColor.bg300,
                                                                bgcolor: configColor.primary200,
                                                                // eslint-disable-next-line prettier/prettier
                                                                ...(['selection', '#', 'actions'].some((ids) => ids === column.id) && {
                                                                    width: column.width,
                                                                }),
                                                            }}>
                                                            {
                                                                // eslint-disable-next-line prettier/prettier
                                                                ['selection', '#', 'actions'].some((ids) => ids === column.id) ? (
                                                                    column.render('Header')
                                                                ) : typeIsBoolean(sorted) &&
                                                                  sorted === true ? (
                                                                    <span className="d-flex">
                                                                        <span
                                                                            className="me-auto"
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            style={{ marginRight: '0.25rem' }}
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            children= {i18next.t(column.render('Header'))}
                                                                        />
                                                                        <span>&nbsp;&nbsp;</span>
                                                                        {column.isSorted ? (
                                                                            column.isSortedDesc ? (
                                                                                <>
                                                                                    <span
                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                        style={{ opacity: '.3' }} children={'↑'}
                                                                                    />
                                                                                    <span>↓</span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <span>↑</span>
                                                                                    <span
                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                        style={{ opacity: '.3' }} children={'↓'}
                                                                                    />
                                                                                </>
                                                                            )
                                                                        ) : (
                                                                            <>
                                                                                <span
                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                    style={{ opacity: '.3' }} children={'↑'}
                                                                                />
                                                                                <span
                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                    style={{ opacity: '.3' }} children={'↓'}
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    i18next.t(
                                                                        column.render('Header')
                                                                    )
                                                                )
                                                            }
                                                        </TableCell>
                                                    );
                                                }
                                            )}
                                        </TableRow>
                                    ))}
                                </TableHead>

                                <TableBody
                                    {...getTableBodyProps()}
                                    sx={{
                                        ...(isFetching === true && {
                                            position: 'relative',
                                            '&:after': {
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                backgroundImage: 'url(' + spinImage + ')',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '35px 35px',
                                                content: '""',
                                            },
                                        }),
                                    }}>
                                    {rows.length > 0 ? (
                                        rows.map((row, rowKey) => {
                                            prepareRow(row);
                                            return (
                                                <TableRow
                                                    {...row.getRowProps()}
                                                    key={rowKey}
                                                    sx={{
                                                        ...(typeIsFunction(sx) &&
                                                            typeIsObject(sx(row)) && {
                                                                ...sx(row),
                                                            }),
                                                        ...(typeIsObject(sx) && {
                                                            ...sx,
                                                        }),
                                                        ...(row.isSelected === true && {
                                                            color: 'white',
                                                            backgroundColor: '#98585c',
                                                        }),
                                                    }}>
                                                    {row.cells.map((cell, cellKey) => {
                                                        return (
                                                            <TableCell
                                                                {...cell.getCellProps({
                                                                    sx: {
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        py: (cell.column.id !== 'actions' && cell.column.id !== 'selection') ? '7.21px' : 0,
                                                                        px: '8px',
                                                                        border: '1px solid rgba(224, 224, 224, 1)',
                                                                        fontSize: '0.813rem',
                                                                        color: 'inherit',
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        ...(typeIsFunction(cell.column.sx) === true && typeIsObject(cell.column.sx) === true &&
                                                                            cell.column.sx({
                                                                                value: cell.value,
                                                                                row: cell.row,
                                                                                column: cell.column,
                                                                            })),
                                                                    },
                                                                })}
                                                                key={cellKey}
                                                                onClick={() =>
                                                                    cell.column.id !== 'actions' &&
                                                                    selection === true &&
                                                                    row.toggleRowSelected(
                                                                        !row.isSelected
                                                                    )
                                                                }>
                                                                {cell.render('Cell')}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={
                                                    columnTable.length +
                                                    1 +
                                                    (no === true ? 1 : 0) +
                                                    (selection === true ? 1 : 0) +
                                                    (Object.keys(actionsRow).length < 1 ? 0 : 1)
                                                }
                                                sx={{
                                                    py: '8px',
                                                    px: '8px',
                                                    border: '1px solid rgba(224, 224, 224, 1)',
                                                    fontSize: '0.813rem',
                                                    color: 'inherit',
                                                    textAlign: 'center',
                                                }}>
                                                {i18next.t('Data not found.')}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Footer {...data?.data} paginate={payload.paginate} setTable={setTable} />
                    </Box>
                )}
            </Paper>
        );
    }
};

TableDataQuery.defaultProps = {
    uri: window.location.pathname,
    payload: {},
    querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
    no: true,
    selection: false,
    selectionMultiple: false,
    actions: {},
    actionsRow: {},
};

TableDataQuery.propTypes = {
    app_token: PropTypes.string,
    uri: PropTypes.string,
    back: PropTypes.string,
    paginate: PropTypes.number,
    payload: PropTypes.object,
    querykey: PropTypes.string,
    no: PropTypes.bool,
    selection: PropTypes.bool,
    selectionMultiple: PropTypes.bool,
    actions: PropTypes.object,
    actionsRow: PropTypes.object,
    column: PropTypes.array.isRequired,
    setTable: PropTypes.func.isRequired,
    sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const mapStateToProps = ({ app }) => {
    return {
        app_token: app.app_token,
    };
};

export default connect(mapStateToProps, null)(TableDataQuery);
