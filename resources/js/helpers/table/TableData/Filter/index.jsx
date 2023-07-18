import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Box, Divider, Grid, Typography } from '@mui/material';
import { CuiDate, CuiDateRange, CuiInput, CuiSelect } from '@components/coreui/forms';

import { RenderMap } from '@helpers/render';
import { typeIsArray, typeIsString } from '@hooks/type';

const Filter = ({ data_filter, data, columns, setFilter, custom }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mb: 2, fontWeight: 'bold' }}
                children={i18next.t('Search Filters')}
            />

            <Grid container spacing={1}>
                <RenderMap
                    data={columns}
                    render={(val, key) => {
                        const idFilter = `filter_${val.accessor}`;
                        // eslint-disable-next-line prettier/prettier
                        const valueFilter = data[`filter_${val.accessor}`]?.value ?? (typeIsString(val.filterValue) === true ? val.filterValue : '');
                        const labelFilter = val.Header;
                        switch (val.filterType) {
                            case 'date':
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        sx={{ pt: '0 !important', mb: 1 }}
                                        key={key}>
                                        <CuiDate
                                            id={idFilter}
                                            value={valueFilter}
                                            label={labelFilter}
                                            required={false}
                                            setInput={setFilter}
                                        />
                                    </Grid>
                                );
                            case 'daterange':
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        sx={{ pt: '0 !important', mb: 1 }}
                                        key={key}>
                                        <CuiDateRange
                                            id={idFilter}
                                            value={valueFilter}
                                            label={labelFilter}
                                            required={false}
                                            setInput={setFilter}
                                        />
                                    </Grid>
                                );
                            case 'select':
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        sx={{ pt: '0 !important', mb: 1 }}
                                        key={key}>
                                        <CuiSelect
                                            id={idFilter}
                                            value={valueFilter}
                                            label={labelFilter}
                                            required={false}
                                            // eslint-disable-next-line prettier/prettier
                                            options={data_filter[val.accessor] ?? (typeIsArray(val.filterOptions) ? val.filterOptions : [])}
                                            setInput={setFilter}
                                        />
                                    </Grid>
                                );
                            default:
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        sx={{ pt: '0 !important', mb: 1 }}
                                        key={key}>
                                        <CuiInput
                                            id={idFilter}
                                            value={valueFilter}
                                            label={labelFilter}
                                            required={false}
                                            setInput={setFilter}
                                        />
                                    </Grid>
                                );
                        }
                    }}
                />
            </Grid>

            {custom}

            <Divider sx={{ mb: 1, backgroundColor: 'rgba(224, 224, 224, 1)' }} />
        </Box>
    );
};

Filter.propTypes = {
    data: PropTypes.object,
    data_filter: PropTypes.object,
    columns: PropTypes.array.isRequired,
    setFilter: PropTypes.func,
    custom: PropTypes.node,
};

export default Filter;
