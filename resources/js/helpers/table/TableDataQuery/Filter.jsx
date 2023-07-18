import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { CFormInput, CFormLabel } from '@coreui/react';

import color from '@configs/color';

import { RenderMap } from '@helpers/render';
import { stringToDateTime } from '@hooks/string';
import { typeIsArray, typeIsNull, typeIsString } from '@hooks/type';

const Filter = ({ column, setFilter, dataFilter, additional }) => {
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
        <Box sx={{ flexGrow: 1 }}>
            <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mb: 2, fontWeight: 'bold' }}
                children={i18next.t('Search Filters')}
            />

            <Grid container spacing={1}>
                <RenderMap
                    data={column}
                    render={(val, key) => (
                        // eslint-disable-next-line prettier/prettier
                        <Grid item xs={12} sm={3} sx={{ pt: '0 !important', mb: 1 }} key={key}>
                            {(() => {
                                switch (val.filterType) {
                                    case 'date':
                                        return (
                                            <Box
                                                sx={{
                                                    '& .react-datepicker-wrapper': {
                                                        '& .react-datepicker__input-container': {
                                                            input: {
                                                                width: '100%',
                                                                height: '31px',
                                                                border: `solid 1px #b1b7c1`,
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
                                                                '& .react-datepicker__month-container':
                                                                    {
                                                                        '& .react-datepicker__header':
                                                                            {
                                                                                '& .react-datepicker__day-names':
                                                                                    {
                                                                                        mt: 1,
                                                                                        borderTop:
                                                                                            '1px solid #aeaeae',
                                                                                    },
                                                                            },
                                                                        '& .react-datepicker__month':
                                                                            {
                                                                                '& .react-datepicker__week':
                                                                                    {
                                                                                        '& .react-datepicker-0':
                                                                                            {
                                                                                                color: 'red',
                                                                                            },
                                                                                    },
                                                                            },
                                                                    },
                                                            },
                                                        },
                                                    },
                                                }}>
                                                <CFormLabel
                                                    htmlFor={`filter_${val.accessor}`}
                                                    className="mb-0"
                                                    children={`${i18next.t(val.Header)} :`}
                                                />

                                                <DatePicker
                                                    id={`filter_${val.accessor}`}
                                                    placeholderText={i18next.t(val.Header)}
                                                    dateFormat="dd/MM/yyyy"
                                                    // eslint-disable-next-line prettier/prettier
                                                    formatWeekDay={(nameOfDay) => i18next.t(nameOfDay).substring(0, 3)}
                                                    calendarStartDay={1}
                                                    closeOnScroll={true}
                                                    isClearable={
                                                        dataFilter[val.accessor]?.value ??
                                                        (typeIsString(val.filterValue) === true
                                                            ? val.filterValue
                                                            : '')
                                                            ? true
                                                            : false
                                                    }
                                                    selected={
                                                        (dataFilter[val.accessor]?.value ??
                                                            (typeIsString(val.filterValue) === true
                                                                ? val.filterValue
                                                                : '')) &&
                                                        (
                                                            dataFilter[val.accessor]?.value ??
                                                            (typeIsString(val.filterValue) === true
                                                                ? val.filterValue
                                                                : '')
                                                        ).length > 0
                                                            ? new Date(
                                                                  dataFilter[val.accessor]?.value ??
                                                                      val.filterValue
                                                              )
                                                            : ''
                                                    }
                                                    // eslint-disable-next-line prettier/prettier
                                                    dayClassName={(date) => `react-datepicker-${new Date(date).getDay()}`}
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
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: '1rem',
                                                                    },
                                                                }}>
                                                                <ArrowBackIcon fontSize="small" />
                                                            </Button>

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Select
                                                                    maxMenuHeight={150}
                                                                    components={{
                                                                        IndicatorSeparator: () =>
                                                                            null,
                                                                    }}
                                                                    value={
                                                                        months
                                                                            .map((mm) => ({
                                                                                value: mm.value,
                                                                                label: i18next.t(
                                                                                    mm.label
                                                                                ),
                                                                            }))
                                                                            .filter(
                                                                                (of) =>
                                                                                    of.value ===
                                                                                    new Date(
                                                                                        date
                                                                                    ).getMonth()
                                                                            )[0]
                                                                    }
                                                                    isSearchable={false}
                                                                    options={months.map((mm) => ({
                                                                        value: mm.value,
                                                                        label: i18next.t(mm.label),
                                                                    }))}
                                                                    onChange={({ value }) =>
                                                                        changeMonth(value)
                                                                    }
                                                                    styles={{
                                                                        control: (provided) => ({
                                                                            ...provided,
                                                                            minHeight: '22px',
                                                                            width: '95px',
                                                                            boxShadow: null,
                                                                        }),
                                                                        valueContainer: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            padding: 0,
                                                                        }),
                                                                        singleValue: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            marginLeft: '4px',
                                                                            marginRight: 0,
                                                                        }),
                                                                        dropdownIndicator: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            width: '22px',
                                                                            padding: '0 0.2rem',
                                                                        }),
                                                                        menu: (provided) => ({
                                                                            ...provided,
                                                                            margin: 0,
                                                                            backgroundColor:
                                                                                '#F5F5F5',
                                                                        }),
                                                                        menuList: (provided) => ({
                                                                            ...provided,
                                                                            margin: '0 0.25rem',
                                                                        }),
                                                                        option: (provided) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            padding:
                                                                                '0.25rem 0.5rem',
                                                                            fontSize: '12px',
                                                                        }),
                                                                    }}
                                                                />
                                                                &nbsp;
                                                                <Select
                                                                    maxMenuHeight={200}
                                                                    components={{
                                                                        IndicatorSeparator: () =>
                                                                            null,
                                                                    }}
                                                                    value={
                                                                        years.filter(
                                                                            (of) =>
                                                                                of.value ===
                                                                                new Date(
                                                                                    date
                                                                                ).getFullYear()
                                                                        )[0]
                                                                    }
                                                                    options={years}
                                                                    onChange={({ value }) =>
                                                                        changeYear(value)
                                                                    }
                                                                    styles={{
                                                                        control: (provided) => ({
                                                                            ...provided,
                                                                            minHeight: '22px',
                                                                            width: '60px',
                                                                            boxShadow: null,
                                                                        }),
                                                                        valueContainer: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            padding: 0,
                                                                        }),
                                                                        singleValue: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            marginLeft: '4px',
                                                                            marginRight: 0,
                                                                        }),
                                                                        dropdownIndicator: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            width: '22px',
                                                                            padding: '0 0.2rem',
                                                                        }),
                                                                        input: (provided) => {
                                                                            return {
                                                                                ...provided,
                                                                                margin: 0,
                                                                                padding:
                                                                                    '0 0 0 4px',
                                                                            };
                                                                        },
                                                                        menu: (provided) => ({
                                                                            ...provided,
                                                                            margin: 0,
                                                                            backgroundColor:
                                                                                '#F5F5F5',
                                                                        }),
                                                                        menuList: (provided) => ({
                                                                            ...provided,
                                                                            margin: '0 0.25rem',
                                                                        }),
                                                                        option: (provided) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            padding:
                                                                                '0.25rem 0.5rem',
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
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: '1rem',
                                                                    },
                                                                }}>
                                                                <ArrowForwardIcon fontSize="small" />
                                                            </Button>
                                                        </Box>
                                                    )}
                                                    onChange={(date) => {
                                                        if (typeIsNull(date) === true) {
                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    value: '',
                                                                    type: 'date',
                                                                },
                                                            }));
                                                        } else {
                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    value: stringToDateTime(date, 'Y-m-d'),
                                                                    type: 'date',
                                                                },
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        );
                                    // date

                                    case 'daterange':
                                        // eslint-disable-next-line prettier/prettier, no-case-declarations
                                        const valueDateRange = dataFilter[val.accessor]?.value ?? (typeIsString(val.filterValue) === true ? val.filterValue : '');
                                        // eslint-disable-next-line prettier/prettier, no-case-declarations
                                        const defaultValueStartDateRange = valueDateRange.split(' - ').length === 2 && valueDateRange.split(' - ')[0] !== 'null' ? new Date(valueDateRange.split(' - ')[0]) : null;
                                        // eslint-disable-next-line prettier/prettier, no-case-declarations
                                        const defaultValueEndDateRange = valueDateRange.split(' - ').length === 2 && valueDateRange.split(' - ')[1] !== 'null' ? new Date(valueDateRange.split(' - ')[1]) : null;
                                        // eslint-disable-next-line no-case-declarations
                                        const [startDateRange, seStartDateRange] = useState(null);
                                        // eslint-disable-next-line no-case-declarations
                                        const [endDateRange, seEndDateRange] = useState(null);

                                        return (
                                            <Box
                                                sx={{
                                                    '& .react-datepicker-wrapper': {
                                                        '& .react-datepicker__input-container': {
                                                            input: {
                                                                width: '100%',
                                                                height: '31px',
                                                                border: `solid 1px #b1b7c1`,
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
                                                                '& .react-datepicker__month-container':
                                                                    {
                                                                        '& .react-datepicker__header':
                                                                            {
                                                                                '& .react-datepicker__day-names':
                                                                                    {
                                                                                        mt: 1,
                                                                                        borderTop:
                                                                                            '1px solid #aeaeae',
                                                                                    },
                                                                            },
                                                                        '& .react-datepicker__month':
                                                                            {
                                                                                margin: 0,
                                                                                padding: '0.4rem',
                                                                                backgroundColor:
                                                                                    '#fff',
                                                                                '& .react-datepicker__week':
                                                                                    {
                                                                                        '& .react-datepicker-0':
                                                                                            {
                                                                                                color: 'red',
                                                                                            },
                                                                                    },
                                                                            },
                                                                    },
                                                            },
                                                        },
                                                    },
                                                }}>
                                                <CFormLabel
                                                    htmlFor={`filter_${val.accessor}`}
                                                    className="mb-0"
                                                    children={`${i18next.t(val.Header)} :`}
                                                />

                                                <DatePicker
                                                    id={`filter_${val.accessor}`}
                                                    placeholderText={i18next.t(val.Header)}
                                                    selectsRange={true}
                                                    monthsShown={2}
                                                    dateFormat="dd/MM/yyyy"
                                                    // eslint-disable-next-line prettier/prettier
                                                    formatWeekDay={(nameOfDay) => i18next.t(nameOfDay).substring(0, 3)}
                                                    calendarStartDay={1}
                                                    closeOnScroll={true}
                                                    // eslint-disable-next-line prettier/prettier
                                                    isClearable={valueDateRange.split(' - ').every((us) => us !== 'null') ? true : false}
                                                    // eslint-disable-next-line prettier/prettier
                                                    startDate={defaultValueStartDateRange}
                                                    // eslint-disable-next-line prettier/prettier
                                                    endDate={defaultValueEndDateRange}
                                                    // eslint-disable-next-line prettier/prettier
                                                    dayClassName={(date) => `react-datepicker-${new Date(date).getDay()}`}
                                                    renderCustomHeader={({
                                                        changeYear,
                                                        changeMonth,
                                                        decreaseMonth,
                                                        increaseMonth,
                                                        monthDate,
                                                        customHeaderCount,
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
                                                                aria-label="Previous Month"
                                                                className="react-datepicker__navigation react-datepicker__navigation--previous"
                                                                style={
                                                                    customHeaderCount === 1
                                                                        ? { visibility: 'hidden' }
                                                                        : null
                                                                }
                                                                onClick={decreaseMonth}
                                                                sx={{
                                                                    minWidth: 'auto',
                                                                    py: '3px',
                                                                    px: '3px',
                                                                    '&.react-datepicker__navigation':
                                                                        {
                                                                            top: 0,
                                                                            width: 'auto',
                                                                            height: 'auto',
                                                                        },
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: '1rem',
                                                                    },
                                                                }}>
                                                                <ArrowBackIcon fontSize="small" />
                                                            </Button>

                                                            <Box
                                                                className="react-datepicker__current-month"
                                                                sx={{
                                                                    display: 'flex',
                                                                    fontSize: '0.8rem',
                                                                }}>
                                                                <Select
                                                                    maxMenuHeight={150}
                                                                    components={{
                                                                        IndicatorSeparator: () =>
                                                                            null,
                                                                    }}
                                                                    value={
                                                                        months
                                                                            .map((mm) => ({
                                                                                value: mm.value,
                                                                                label: i18next.t(
                                                                                    mm.label
                                                                                ),
                                                                            }))
                                                                            .filter(
                                                                                (of) =>
                                                                                    of.value ===
                                                                                    new Date(
                                                                                        monthDate
                                                                                    ).getMonth()
                                                                            )[0]
                                                                    }
                                                                    isSearchable={false}
                                                                    options={months.map((mm) => ({
                                                                        value: mm.value,
                                                                        label: i18next.t(mm.label),
                                                                    }))}
                                                                    onChange={({ value }) =>
                                                                        changeMonth(value)
                                                                    }
                                                                    styles={{
                                                                        control: (provided) => ({
                                                                            ...provided,
                                                                            minHeight: '22px',
                                                                            width: '95px',
                                                                            boxShadow: null,
                                                                        }),
                                                                        valueContainer: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            padding: 0,
                                                                        }),
                                                                        singleValue: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            marginLeft: '4px',
                                                                            marginRight: 0,
                                                                            fontSize: '0.8rem',
                                                                            fontWeight: 400,
                                                                        }),
                                                                        dropdownIndicator: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            width: '22px',
                                                                            padding: '0 0.2rem',
                                                                        }),
                                                                        menu: (provided) => ({
                                                                            ...provided,
                                                                            margin: 0,
                                                                            backgroundColor:
                                                                                '#F5F5F5',
                                                                        }),
                                                                        menuList: (provided) => ({
                                                                            ...provided,
                                                                            margin: '0 0.25rem',
                                                                        }),
                                                                        option: (provided) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            padding:
                                                                                '0.25rem 0.5rem',
                                                                            fontSize: '12px',
                                                                        }),
                                                                    }}
                                                                />
                                                                &nbsp;
                                                                <Select
                                                                    maxMenuHeight={200}
                                                                    components={{
                                                                        IndicatorSeparator: () =>
                                                                            null,
                                                                    }}
                                                                    value={
                                                                        years.filter(
                                                                            (of) =>
                                                                                of.value ===
                                                                                new Date(
                                                                                    monthDate
                                                                                ).getFullYear()
                                                                        )[0]
                                                                    }
                                                                    options={years}
                                                                    onChange={({ value }) =>
                                                                        changeYear(value)
                                                                    }
                                                                    styles={{
                                                                        control: (provided) => ({
                                                                            ...provided,
                                                                            minHeight: '22px',
                                                                            width: '60px',
                                                                            boxShadow: null,
                                                                        }),
                                                                        valueContainer: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            padding: 0,
                                                                        }),
                                                                        singleValue: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            marginLeft: '4px',
                                                                            marginRight: 0,
                                                                            fontSize: '0.8rem',
                                                                            fontWeight: 400,
                                                                        }),
                                                                        dropdownIndicator: (
                                                                            provided
                                                                        ) => ({
                                                                            ...provided,
                                                                            width: '22px',
                                                                            padding: '0 0.2rem',
                                                                        }),
                                                                        input: (provided) => {
                                                                            return {
                                                                                ...provided,
                                                                                margin: 0,
                                                                                padding:
                                                                                    '0 0 0 4px',
                                                                            };
                                                                        },
                                                                        menu: (provided) => ({
                                                                            ...provided,
                                                                            margin: 0,
                                                                            backgroundColor:
                                                                                '#F5F5F5',
                                                                        }),
                                                                        menuList: (provided) => ({
                                                                            ...provided,
                                                                            margin: '0 0.25rem',
                                                                        }),
                                                                        option: (provided) => ({
                                                                            ...provided,
                                                                            textAlign: 'left',
                                                                            padding:
                                                                                '0.25rem 0.5rem',
                                                                            fontSize: '12px',
                                                                        }),
                                                                    }}
                                                                />
                                                            </Box>

                                                            <Button
                                                                variant="contained"
                                                                disableElevation
                                                                aria-label="Next Month"
                                                                className="react-datepicker__navigation react-datepicker__navigation--next"
                                                                style={
                                                                    customHeaderCount === 0
                                                                        ? { visibility: 'hidden' }
                                                                        : null
                                                                }
                                                                onClick={increaseMonth}
                                                                sx={{
                                                                    minWidth: 'auto',
                                                                    py: '3px',
                                                                    px: '3px',
                                                                    '&.react-datepicker__navigation':
                                                                        {
                                                                            top: 0,
                                                                            width: 'auto',
                                                                            height: 'auto',
                                                                        },
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: '1rem',
                                                                    },
                                                                }}>
                                                                <ArrowForwardIcon fontSize="small" />
                                                            </Button>
                                                        </Box>
                                                    )}
                                                    onCalendarClose={() => {
                                                        if (!startDateRange || !endDateRange) {
                                                            seStartDateRange(null);
                                                            seEndDateRange(null);
                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    value: '',
                                                                    type: 'daterange',
                                                                },
                                                            }));
                                                        }
                                                    }}
                                                    onChange={(date) => {
                                                        if (date.every((us) => us === null)) {
                                                            seStartDateRange(null);
                                                            seEndDateRange(null);
                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    value: '',
                                                                    type: 'daterange',
                                                                },
                                                            }));
                                                        } else {
                                                            if (!startDateRange && !endDateRange) {
                                                                seStartDateRange(date[0]);
                                                            } else {
                                                                // eslint-disable-next-line prettier/prettier
                                                                if (startDateRange && endDateRange) {
                                                                    seStartDateRange(date[0]);
                                                                    seEndDateRange(null);
                                                                } else {
                                                                    seEndDateRange(date[1]);
                                                                }
                                                            }

                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    value: date.map((us) => us !== null ? stringToDateTime(us, 'Y-m-d') : 'null').join(' - '),
                                                                    type: 'daterange',
                                                                },
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        );
                                    // daterange

                                    case 'select':
                                        return (
                                            <Box>
                                                <CFormLabel
                                                    htmlFor={`filter_${val.accessor}`}
                                                    className="mb-0"
                                                    children={`${i18next.t(val.Header)} :`}
                                                />

                                                <Select
                                                    inputId={`filter_${val.accessor}`}
                                                    menuPosition={'fixed'}
                                                    maxMenuHeight={135}
                                                    menuPlacement="auto"
                                                    placeholder={i18next.t(val.Header)}
                                                    value={
                                                        dataFilter[val.accessor]?.value ??
                                                        // eslint-disable-next-line prettier/prettier
                                                        (typeIsString(val.filterValue) && val.filterValue)
                                                            ? val.filterIsMulti === true
                                                                ? JSON.parse(
                                                                      // eslint-disable-next-line prettier/prettier
                                                                      dataFilter[val.accessor]?.value ?? (typeIsString(val.filterValue) && val.filterValue)
                                                                  ).map(
                                                                      // eslint-disable-next-line prettier/prettier
                                                                      (val) => (additional[val.accessor] ?? (typeIsArray(val.filterOptions) ? val.filterOptions : [])).filter((of) => of.value === val)[0]
                                                                  )
                                                                : // eslint-disable-next-line prettier/prettier
                                                                  (additional[val.accessor] ?? (typeIsArray(val.filterOptions) ? val.filterOptions : [])).filter(
                                                                      // eslint-disable-next-line prettier/prettier
                                                                      (of) => of.value == (dataFilter[val.accessor]?.value ?? (typeIsString(val.filterValue) && val.filterValue))
                                                                  )[0]
                                                            : ''
                                                    }
                                                    isMulti={val.filterIsMulti ?? false}
                                                    isClearable={true}
                                                    isSearchable={false}
                                                    // eslint-disable-next-line prettier/prettier
                                                    noOptionsMessage={() => i18next.t('Data not available.')}
                                                    // eslint-disable-next-line prettier/prettier
                                                    options={additional[val.accessor] ?? (typeIsArray(val.filterOptions) ? val.filterOptions : [])}
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
                                                        singleValue: (
                                                            provided,
                                                            { selectProps }
                                                        ) => {
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
                                                                margin: '0.25rem',
                                                            };
                                                        },
                                                        option: (provided, state) => {
                                                            return {
                                                                ...provided,
                                                                padding: '0.25rem 0.5rem',
                                                                // eslint-disable-next-line prettier/prettier
                                                                borderBottom: (state.innerProps.id.split('-')[4] ?? 0) == (state.options.length - 1) ? 0 : 'solid 1px #b1b7c1',
                                                                fontSize: '0.875rem',
                                                            };
                                                        },
                                                        loadingIndicator: (provided) => {
                                                            return {
                                                                ...provided,
                                                                color: '#e55353',
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
                                                    onChange={(e) => {
                                                        if (typeIsNull(e) === true) {
                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    value: '',
                                                                    type: 'select',
                                                                },
                                                            }));
                                                        } else {
                                                            setFilter((prevSate) => ({
                                                                ...prevSate,
                                                                [val.accessor]: {
                                                                    value: e.value,
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    type: val.filterIsMulti === true ? 'selectmulti' : 'select',
                                                                },
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        );
                                    // select

                                    default:
                                        return (
                                            <Box
                                                sx={{
                                                    '& .form-control': {
                                                        boxShadow: 'none !important',
                                                        ':hover': {
                                                            borderColor: color.primary100,
                                                        },
                                                        ':focus': {
                                                            borderColor: color.primary100,
                                                        },
                                                    },
                                                }}>
                                                <CFormLabel
                                                    htmlFor={`filter_${val.accessor}`}
                                                    className="mb-0"
                                                    children={`${i18next.t(val.Header)} :`}
                                                />

                                                <CFormInput
                                                    autoComplete="off"
                                                    type="text"
                                                    id={`filter_${val.accessor}`}
                                                    size="sm"
                                                    // eslint-disable-next-line prettier/prettier
                                                    value={dataFilter[val.accessor]?.value ?? (typeIsString(val.filterValue) === true ? val.filterValue : '')}
                                                    placeholder={i18next.t(val.Header)}
                                                    onChange={(e) =>
                                                        setFilter((prevSate) => ({
                                                            ...prevSate,
                                                            [val.accessor]: {
                                                                value: e.target.value,
                                                                type: 'text',
                                                            },
                                                        }))
                                                    }
                                                />
                                            </Box>
                                        );
                                    // text
                                }
                            })()}
                        </Grid>
                    )}
                />
            </Grid>

            {/* {custom} */}

            <Divider sx={{ mb: 1, backgroundColor: 'rgba(224, 224, 224, 1)' }} />
        </Box>
    );
};

Filter.defaultProps = {
    additional: {},
};

Filter.propTypes = {
    column: PropTypes.array,
    setFilter: PropTypes.func,
    dataFilter: PropTypes.object,
    additional: PropTypes.object,
};

export default Filter;
