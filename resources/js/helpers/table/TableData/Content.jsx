import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import color from '@configs/color';

import spinImage from '@assets/images/spin.svg';
import { typeIsBoolean, typeIsFunction, typeIsObject } from '@hooks/type';

// eslint-disable-next-line prettier/prettier
const Content = ({ getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, columns, loading, no, sx, selection, reloadRow }) => {
    return (
        <TableContainer>
            <Table
                {...getTableProps()}
                sx={{ minWidth: '100%' }}
                size="small"
                aria-label="a dense table">
                <TableHead>
                    {headerGroups.map((headerGroup, headerGroupKey) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} key={headerGroupKey}>
                            {headerGroup.headers.map(({ sorted = true, ...column }, columnKey) => {
                                return (
                                    <TableCell
                                        {...column.getHeaderProps()}
                                        key={columnKey}
                                        padding="none"
                                        onClick={() => {
                                            // eslint-disable-next-line prettier/prettier
                                            if (!['selection', '#'].some((ids) => ids === column.id)) {
                                                if (column.isSorted === true) {
                                                    if (column.isSortedDesc === false) {
                                                        reloadRow({
                                                            payload: {
                                                                datatable_sorting: JSON.stringify([
                                                                    {
                                                                        id: column.id,
                                                                        desc: true,
                                                                    },
                                                                ]),
                                                            },
                                                        });
                                                    } else {
                                                        reloadRow({
                                                            payload: {
                                                                datatable_sorting: JSON.stringify(
                                                                    []
                                                                ),
                                                            },
                                                        });
                                                    }
                                                } else {
                                                    reloadRow({
                                                        payload: {
                                                            datatable_sorting: JSON.stringify([
                                                                {
                                                                    id: column.id,
                                                                    desc: false,
                                                                },
                                                            ]),
                                                        },
                                                    });
                                                }
                                            }
                                        }}
                                        sx={{
                                            py: '4px',
                                            px: '8px',
                                            border: '1px solid rgba(224, 224, 224, 1)',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            userSelect: 'none',
                                            color: color.bg300,
                                            backgroundColor: color.primary200,
                                        }}>
                                        {['selection', '#'].some((ids) => ids === column.id) ? (
                                            column.render('Header')
                                        ) : typeIsBoolean(sorted) && sorted === true ? (
                                            <span className="d-flex">
                                                <span
                                                    className="me-auto"
                                                    style={{ marginRight: '0.313rem' }}>
                                                    {i18next.t(column.render('Header'))}
                                                </span>
                                                <span>&nbsp;&nbsp;</span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <>
                                                            <span style={{ opacity: '.3' }}>↑</span>
                                                            <span>↓</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>↑</span>
                                                            <span style={{ opacity: '.3' }}>↓</span>
                                                        </>
                                                    )
                                                ) : (
                                                    <>
                                                        <span style={{ opacity: '.3' }}>↑</span>
                                                        <span style={{ opacity: '.3' }}>↓</span>
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            i18next.t(column.render('Header'))
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody
                    {...getTableBodyProps()}
                    sx={{
                        ...(loading === true && {
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
                                        ...(typeIsObject(sx(row)) && sx(row)),
                                        ...(row.isSelected === true && {
                                            color: 'white',
                                            backgroundColor: '#44496b',
                                        }),
                                    }}>
                                    {row.cells.map((cell, cellKey) => {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                key={cellKey}
                                                onClick={() =>
                                                    selection === true &&
                                                    row.toggleRowSelected(!row.isSelected)
                                                }
                                                sx={{
                                                    py: '2px',
                                                    px: '8px',
                                                    border: '1px solid rgba(224, 224, 224, 1)',
                                                    fontSize: '0.813rem',
                                                    color: 'inherit',
                                                    ...(typeIsFunction(cell.column.sx) === true &&
                                                        typeIsObject(cell.column.sx) === true &&
                                                        cell.column.sx({
                                                            value: cell.value,
                                                            row: cell.row,
                                                            column: cell.column,
                                                        })),
                                                }}>
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
                                    columns.length +
                                    1 +
                                    (no === true ? 1 : 0) +
                                    (selection === true ? 1 : 0)
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
    );
};

Content.defaultProps = {
    columns: [],
    loading: false,
};

Content.propTypes = {
    getTableProps: PropTypes.func.isRequired,
    getTableBodyProps: PropTypes.func.isRequired,
    headerGroups: PropTypes.array.isRequired,
    prepareRow: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array,
    loading: PropTypes.bool,
    selection: PropTypes.bool,
    no: PropTypes.bool,
    sx: PropTypes.func,
    reloadRow: PropTypes.func,
};

export default Content;
