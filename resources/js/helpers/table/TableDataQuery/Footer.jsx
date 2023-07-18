import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import Select from 'react-select';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Pagination, PaginationItem, Typography } from '@mui/material';

import color from '@configs/color';

const Footer = ({ current_page, last_page, per_page, from, to, total, paginate, setTable }) => {
    return (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ pl: '3px', display: 'flex', alignItems: 'center' }}>
                <Select
                    menuPosition={'fixed'}
                    maxMenuHeight={100}
                    menuPlacement="auto"
                    value={{ value: paginate ?? per_page, label: paginate ?? per_page }}
                    isDisabled={false}
                    isClearable={false}
                    isSearchable={false}
                    options={[
                        { value: 10, label: 10 },
                        { value: 25, label: 25 },
                        { value: 50, label: 50 },
                        { value: 100, label: 100 },
                        { value: 200, label: 200 },
                    ]}
                    onChange={(e) =>
                        setTable((prevState) => ({
                            ...prevState,
                            payload: {
                                ...prevState.payload,
                                // eslint-disable-next-line prettier/prettier
                                querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                                page: 1,
                                paginate: e.value,
                            },
                        }))
                    }
                    styles={{
                        control: (provided) => {
                            return {
                                ...provided,
                                backgroundColor: 'white',
                                minHeight: '31px',
                                borderColor: '#b1b7c1',
                                boxShadow: null,
                                borderRadius: '0.25rem',
                                ':hover': {
                                    ...provided[':hover'],
                                    borderColor: color.primary100,
                                },
                            };
                        },
                        placeholder: (provided) => {
                            return {
                                ...provided,
                                color: provided.color,
                                fontSize: '0.875rem',
                                marginLeft: 0,
                                marginRight: 0,
                            };
                        },
                        valueContainer: (provided) => {
                            return {
                                ...provided,
                                fontSize: '0.875rem',
                                marginLeft: 0,
                                marginRight: 0,
                                padding: '1px 8px',
                            };
                        },
                        singleValue: (provided, { selectProps }) => {
                            return {
                                ...provided,
                                marginLeft: 0,
                                color: selectProps.isDisabled
                                    ? 'var(--cui-input-color, rgba(44, 56, 74, 0.95))'
                                    : provided.color,
                            };
                        },
                        multiValue: (provided) => {
                            return {
                                ...provided,
                                margin: 1,
                            };
                        },
                        dropdownIndicator: (provided) => {
                            return {
                                ...provided,
                                padding: '0 0.2rem',
                            };
                        },
                        clearIndicator: (provided) => {
                            return {
                                ...provided,
                                padding: '0 0.2rem',
                            };
                        },
                        input: (provided) => {
                            return {
                                ...provided,
                                margin: 0,
                            };
                        },
                        menu: (provided) => {
                            return {
                                ...provided,
                                margin: 0,
                                backgroundColor: '#F5F5F5',
                            };
                        },
                        menuList: (provided) => {
                            return {
                                ...provided,
                                margin: '0 0.25rem',
                            };
                        },
                        option: (provided, state) => {
                            const position = state.innerProps.id.split('-')[4] ?? 0;
                            const total = state.options.length - 1;

                            return {
                                ...provided,
                                padding: '0.25rem 0.5rem',
                                borderBottom: position == total ? 0 : 'solid 1px #b1b7c1',
                                fontSize: '0.75rem',
                            };
                        },
                        noOptionsMessage: (provided) => {
                            return {
                                ...provided,
                                padding: '3px 0',
                                color: '#000',
                                fontSize: '0.875rem',
                            };
                        },
                        loadingMessage: (provided) => {
                            return {
                                ...provided,
                                padding: '3px 0',
                                color: '#000',
                                fontSize: '0.875rem',
                            };
                        },
                    }}
                />

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ ml: 1, mb: 0, display: 'flex', alignItems: 'center' }}
                    children={i18next.t('Data')}
                />
                <MoreVertIcon />
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 0 }}>
                    {i18next.t(`Showing ${from} to ${to} total ${total}`)}
                </Typography>
            </Box>

            <Pagination
                count={last_page}
                color="primary"
                variant="outlined"
                shape="rounded"
                page={current_page}
                sx={{ mx: '-3px' }}
                onChange={(event, pageNumber) =>
                    setTable((prevState) => ({
                        ...prevState,
                        payload: {
                            ...prevState.payload,
                            // eslint-disable-next-line prettier/prettier
                            querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                            page: pageNumber,
                        },
                    }))
                }
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Box>
    );
};

Footer.defaultProps = {
    current_page: 0,
    last_page: 0,
    per_page: 0,
    from: 0,
    to: 0,
    total: 0,
};

Footer.propTypes = {
    current_page: PropTypes.number,
    last_page: PropTypes.number,
    per_page: PropTypes.number,
    from: PropTypes.number,
    to: PropTypes.number,
    total: PropTypes.number,
    paginate: PropTypes.number,
    setTable: PropTypes.func,
};

export default Footer;
