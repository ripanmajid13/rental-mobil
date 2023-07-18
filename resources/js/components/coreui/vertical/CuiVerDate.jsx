import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Box, Button, Skeleton } from '@mui/material';
import { CFormFeedback, CFormLabel } from '@coreui/react';

import color from '@configs/color';

import { stringToDateTime } from '@hooks/string';
import { typeIsNull } from '@hooks/type';

import 'react-datepicker/dist/react-datepicker.css';

const CuiVerDate = ({
    name,
    register,
    resetField,
    formState,
    getValues,
    setValue,
    loading,
    label,
    labelRequired,
    placeholder,
    note,
}) => {
    let years = [];
    const months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' },
    ];

    for (var i = 0; i <= new Date().getFullYear() - (new Date().getFullYear() - 43); i++) {
        years.push({
            value: i + (new Date().getFullYear() - 43),
            label: i + (new Date().getFullYear() - 43),
        });
    }

    return (
        <Box
            sx={{
                '& .react-datepicker-wrapper': {
                    '& .react-datepicker__input-container': {
                        input: {
                            width: '100%',
                            height: '31px',
                            border: `solid 1px ${
                                formState.errors[name]?.message ? '#e55353' : '#b1b7c1'
                            }`,
                            borderRadius: '0.25rem',
                            padding: '0.25rem 0.5rem',
                            fontSize: '.875rem',
                            '&:hover': {
                                borderColor: color.primary100,
                            },
                            ':focus': {
                                borderColor: color.primary100,
                            },
                            '&:focus-visible': {
                                outline: 'none',
                            },
                        },
                    },
                },
                '& .react-datepicker__tab-loop': {
                    '& .react-datepicker-popper': {
                        '& .react-datepicker': {
                            '& .react-datepicker__month-container': {
                                '& .react-datepicker__header': {
                                    '& .react-datepicker__day-names': {
                                        mt: 1,
                                        borderTop: '1px solid #aeaeae',
                                    },
                                },
                                '& .react-datepicker__month': {
                                    '& .react-datepicker__week': {
                                        '& .react-datepicker-0': {
                                            color: 'red',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }}>
            {loading === true ? (
                <>
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={label.length * 10 ?? 100}
                        height={22}
                        sx={{ mb: '2px' }}
                    />
                    <Skeleton animation="wave" variant="rounded" height={31} />
                    {note && (
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ mt: '2.91px' }}
                            height={17}
                        />
                    )}
                </>
            ) : (
                <>
                    <CFormLabel htmlFor={name} className="mb-0">
                        {i18next.t(label)}
                        {labelRequired && <span className="text-danger">*</span>} :
                    </CFormLabel>

                    <DatePicker
                        id={name}
                        placeholderText={i18next.t(placeholder ?? label)}
                        dateFormat="dd/MM/yyyy"
                        formatWeekDay={(nameOfDay) => i18next.t(nameOfDay).substring(0, 3)}
                        calendarStartDay={1}
                        closeOnScroll={true}
                        isClearable={getValues(name) ? true : false}
                        selected={getValues(name) ? new Date(getValues(name)) : ''}
                        dayClassName={(date) => `react-datepicker-${new Date(date).getDay()}`}
                        wrapperClassName={formState.errors[name]?.message ? 'is-invalid' : ''}
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <Box
                                sx={{
                                    px: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                    sx={{
                                        minWidth: 'auto',
                                        py: '3px',
                                        px: '3px',
                                        '& .MuiSvgIcon-root': { fontSize: '1rem' },
                                    }}>
                                    <ArrowBackIcon fontSize="small" />
                                </Button>

                                <Box sx={{ display: 'flex' }}>
                                    <Select
                                        maxMenuHeight={150}
                                        components={{
                                            IndicatorSeparator: () => null,
                                        }}
                                        value={
                                            months
                                                .map((mm) => ({
                                                    value: mm.value,
                                                    label: i18next.t(mm.label),
                                                }))
                                                .filter(
                                                    (of) => of.value === new Date(date).getMonth()
                                                )[0]
                                        }
                                        isSearchable={false}
                                        options={months.map((mm) => ({
                                            value: mm.value,
                                            label: i18next.t(mm.label),
                                        }))}
                                        onChange={({ value }) => changeMonth(value)}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                minHeight: '22px',
                                                width: '95px',
                                                boxShadow: null,
                                            }),
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                padding: 0,
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                textAlign: 'left',
                                                marginLeft: '4px',
                                                marginRight: 0,
                                            }),
                                            dropdownIndicator: (provided) => ({
                                                ...provided,
                                                width: '22px',
                                                padding: '0 0.2rem',
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                margin: 0,
                                                backgroundColor: '#F5F5F5',
                                            }),
                                            menuList: (provided) => ({
                                                ...provided,
                                                margin: '0 0.25rem',
                                            }),
                                            option: (provided) => ({
                                                ...provided,
                                                textAlign: 'left',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '12px',
                                            }),
                                        }}
                                    />
                                    &nbsp;
                                    <Select
                                        maxMenuHeight={200}
                                        components={{
                                            IndicatorSeparator: () => null,
                                        }}
                                        value={
                                            years.filter(
                                                (of) => of.value === new Date(date).getFullYear()
                                            )[0]
                                        }
                                        options={years}
                                        onChange={({ value }) => changeYear(value)}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                minHeight: '22px',
                                                width: '60px',
                                                boxShadow: null,
                                            }),
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                padding: 0,
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                textAlign: 'left',
                                                marginLeft: '4px',
                                                marginRight: 0,
                                            }),
                                            dropdownIndicator: (provided) => ({
                                                ...provided,
                                                width: '22px',
                                                padding: '0 0.2rem',
                                            }),
                                            input: (provided) => {
                                                return {
                                                    ...provided,
                                                    margin: 0,
                                                    padding: '0 0 0 4px',
                                                };
                                            },
                                            menu: (provided) => ({
                                                ...provided,
                                                margin: 0,
                                                backgroundColor: '#F5F5F5',
                                            }),
                                            menuList: (provided) => ({
                                                ...provided,
                                                margin: '0 0.25rem',
                                            }),
                                            option: (provided) => ({
                                                ...provided,
                                                textAlign: 'left',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '12px',
                                            }),
                                        }}
                                    />
                                </Box>

                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                    sx={{
                                        minWidth: 'auto',
                                        py: '3px',
                                        px: '3px',
                                        '& .MuiSvgIcon-root': { fontSize: '1rem' },
                                    }}>
                                    <ArrowForwardIcon fontSize="small" />
                                </Button>
                            </Box>
                        )}
                        {...register(name)}
                        onChange={(date) => {
                            if (typeIsNull(date) === true) {
                                resetField(name);
                            } else {
                                setValue(name, stringToDateTime(date, 'Y-m-d'), {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            }
                        }}
                    />

                    <CFormFeedback invalid>
                        {i18next.t(formState.errors[name]?.message)}
                    </CFormFeedback>
                </>
            )}
        </Box>
    );
};

CuiVerDate.defaultProps = {
    loading: false,
    label: 'Label',
    labelRequired: true,
};

CuiVerDate.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    resetField: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    label: PropTypes.string,
    labelRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    note: PropTypes.string,
};

export default CuiVerDate;
