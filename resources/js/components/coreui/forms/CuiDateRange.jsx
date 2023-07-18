import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { CFormFeedback, CFormLabel } from '@coreui/react';

import color from '@configs/color';

import { stringToDateTime } from '@hooks/string';

import 'react-datepicker/dist/react-datepicker.css';

const CuiDateRange = ({
    id,
    setInput,
    label,
    placeholder,
    value,
    required,
    requiredLabel,
    invalid,
    disabled,
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
                            border: 'solid 1px #b1b7c1',
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
                            backgroundColor: '#f0f0f0',
                            '& .react-datepicker__month-container': {
                                '& .react-datepicker__header': {
                                    '& .react-datepicker__day-names': {
                                        mt: 1,
                                        borderTop: '1px solid #aeaeae',
                                    },
                                },
                                '& .react-datepicker__month': {
                                    margin: 0,
                                    padding: '0.4rem',
                                    backgroundColor: '#fff',
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
            <CFormLabel htmlFor={id} className="mb-0">
                {i18next.t(label)}
                {required && requiredLabel && <span className="text-danger">*</span>} :
            </CFormLabel>

            <DatePicker
                id={id}
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
                            style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
                            onClick={decreaseMonth}
                            sx={{
                                minWidth: 'auto',
                                py: '3px',
                                px: '3px',
                                '&.react-datepicker__navigation': {
                                    top: 0,
                                    width: 'auto',
                                    height: 'auto',
                                },
                                '& .MuiSvgIcon-root': { fontSize: '1rem' },
                            }}>
                            <ArrowBackIcon fontSize="small" />
                        </Button>

                        <Box
                            className="react-datepicker__current-month"
                            sx={{ display: 'flex', fontSize: '0.8rem' }}>
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
                                            (of) => of.value === new Date(monthDate).getMonth()
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
                                        fontSize: '0.8rem',
                                        fontWeight: 400,
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
                                        (of) => of.value === new Date(monthDate).getFullYear()
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
                                        fontSize: '0.8rem',
                                        fontWeight: 400,
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
                            aria-label="Next Month"
                            className="react-datepicker__navigation react-datepicker__navigation--next"
                            style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
                            onClick={increaseMonth}
                            sx={{
                                minWidth: 'auto',
                                py: '3px',
                                px: '3px',
                                '&.react-datepicker__navigation': {
                                    top: 0,
                                    width: 'auto',
                                    height: 'auto',
                                },
                                '& .MuiSvgIcon-root': { fontSize: '1rem' },
                            }}>
                            <ArrowForwardIcon fontSize="small" />
                        </Button>
                    </Box>
                )}
                selectsRange={true}
                startDate={
                    value.split(' - ').length === 2 && value.split(' - ')[0] !== 'null'
                        ? new Date(value.split(' - ')[0])
                        : null
                }
                endDate={
                    value.split(' - ').length === 2 && value.split(' - ')[1] !== 'null'
                        ? new Date(value.split(' - ')[1])
                        : null
                }
                monthsShown={2}
                dateFormat="dd/MM/yyyy"
                formatWeekDay={(nameOfDay) => i18next.t(nameOfDay).substring(0, 3)}
                calendarStartDay={1}
                placeholderText={i18next.t(placeholder ?? label)}
                disabled={disabled}
                closeOnScroll={true}
                isClearable={value ? true : false}
                // eslint-disable-next-line prettier/prettier
                dayClassName={(date) => `react-datepicker-${new Date(date).getDay()}`}
                onChange={(update) =>
                    setInput((prevState) => ({
                        ...prevState,
                        [id]: {
                            ...prevState[id],
                            value: !update.every((us) => us === null)
                                ? update
                                      .map((us) =>
                                          us !== null ? stringToDateTime(us, 'Y-m-d') : 'null'
                                      )
                                      .join(' - ')
                                : '',
                            invalid: '',
                        },
                    }))
                }
            />

            <CFormFeedback invalid>{invalid}</CFormFeedback>
        </Box>
    );
};

CuiDateRange.defaultProps = {
    value: '',
    required: false,
    requiredLabel: true,
    invalid: '',
    disabled: false,
};

CuiDateRange.propTypes = {
    id: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    required: PropTypes.bool,
    requiredLabel: PropTypes.bool,
    invalid: PropTypes.string,
    disabled: PropTypes.bool,
};

export default CuiDateRange;
