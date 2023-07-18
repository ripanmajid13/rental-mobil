import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import Select from 'react-select';

import { Box } from '@mui/material';
import { CFormFeedback, CFormLabel } from '@coreui/react';

import color from '@configs/color';

import { typeIsNull } from '@hooks/type';

const CuiSelect = ({
    id,
    multiple,
    setInput,
    label,
    placeholder,
    value,
    required,
    requiredLabel,
    invalid,
    disabled,
    clearable,
    searchable,
    options,
}) => {
    const limitSelection = 250;
    const [isLoading, setIsLoading] = useState(false);
    const [newOptions, setNewOptions] = useState(options.length < limitSelection ? options : []);
    const [oldOptions, setOldOptions] = useState(options);

    useEffect(() => {
        resetSelectionUnlimited();
    }, []);

    const resetSelectionUnlimited = () => {
        if (options.length >= limitSelection) {
            let newData = [];
            let oldData = [];
            options.map((val, key) => {
                if (key < limitSelection) {
                    newData.push(val);
                } else {
                    oldData.push(val);
                }
            });
            setIsLoading(false);
            setNewOptions(newData);
            setOldOptions(oldData);
        }
    };

    return (
        <Box>
            {label && (
                <CFormLabel htmlFor={id} className="mb-0">
                    {i18next.t(label)}
                    {required && requiredLabel && <span className="text-danger">*</span>} :
                </CFormLabel>
            )}

            <Select
                inputId={id}
                isMulti={multiple}
                isLoading={isLoading}
                menuPosition={'fixed'}
                maxMenuHeight={135}
                menuPlacement="auto"
                placeholder={i18next.t(placeholder || label)}
                value={
                    value.length < 1
                        ? ''
                        : multiple === true
                        ? JSON.parse(value).map(
                              (val) => options.filter((of) => of.value === val)[0]
                          )
                        : options.filter((of) => of.value == value)[0]
                }
                isDisabled={disabled}
                isClearable={clearable}
                isSearchable={searchable}
                className={invalid ? 'is-invalid' : ''}
                noOptionsMessage={() => i18next.t('Data not available.')}
                options={newOptions}
                onMenuScrollToBottom={() => {
                    if (options.length >= limitSelection) {
                        if (oldOptions.length > 0) {
                            if (isLoading !== true) {
                                setIsLoading(true);
                                setTimeout(() => {
                                    let newData = [];
                                    let oldData = [];
                                    oldOptions.map((val, key) => {
                                        if (key < limitSelection) {
                                            newData.push(val);
                                        } else {
                                            oldData.push(val);
                                        }
                                    });
                                    setIsLoading(false);
                                    setNewOptions([...newOptions, ...newData]);
                                    setOldOptions(oldData);
                                }, 1000);
                            }
                        }
                    }
                }}
                onInputChange={(input) => {
                    if (searchable === true) {
                        if (input && input.length > 0) {
                            if (options.length >= limitSelection) {
                                let newData = [];
                                let oldData = [];
                                // eslint-disable-next-line prettier/prettier
                                options.filter((ofil) => ofil.label.toLowerCase().includes(input.toLowerCase()))
                                    .map((val, key) => {
                                        if (key < limitSelection) {
                                            newData.push(val);
                                        } else {
                                            oldData.push(val);
                                        }
                                    });
                                setIsLoading(false);
                                setNewOptions(newData);
                                setOldOptions(oldData);
                            }
                        } else {
                            resetSelectionUnlimited();
                        }
                    }
                }}
                onMenuClose={() => resetSelectionUnlimited()}
                onChange={(e) => {
                    resetSelectionUnlimited();
                    setInput((prevState) => ({
                        ...prevState,
                        [id]: {
                            ...prevState[id],
                            value:
                                typeIsNull(e) === true
                                    ? ''
                                    : multiple === true
                                    ? JSON.stringify(e.map((val) => val.value))
                                    : e.value.toString(),
                            invalid: '',
                        },
                    }));
                }}
                styles={{
                    control: (provided) => {
                        return {
                            ...provided,
                            backgroundColor: disabled ? '#d8dbe0' : 'white',
                            minHeight: '31px',
                            borderColor: invalid ? '#e55353' : '#b1b7c1',
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
                            color: disabled ? 'white' : provided.color,
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
            />

            <CFormFeedback invalid>{invalid}</CFormFeedback>
        </Box>
    );
};

CuiSelect.defaultProps = {
    value: '',
    clearable: true,
    searchable: false,
    multiple: false,
    options: [],
    required: false,
    requiredLabel: true,
    invalid: '',
    disabled: false,
};

CuiSelect.propTypes = {
    id: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    required: PropTypes.bool,
    requiredLabel: PropTypes.bool,
    invalid: PropTypes.string,
    disabled: PropTypes.bool,
};

export default CuiSelect;
