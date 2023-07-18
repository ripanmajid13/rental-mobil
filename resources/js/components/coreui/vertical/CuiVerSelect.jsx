import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import Select from 'react-select';

import { Box, Skeleton } from '@mui/material';
import { CFormFeedback, CFormLabel } from '@coreui/react';

import color from '@configs/color';

import { typeIsNull } from '@hooks/type';

const CuiVerSelect = ({
    name,
    register,
    formState,
    resetField,
    getValues,
    setValue,
    loading,
    label,
    labelRequired,
    placeholder,
    options,
    optionsDataServer,
    isMulti,
    isDisabled,
    isClearable,
    isSearchable,
    note,
}) => {
    const limit = 250;
    const value = getValues(name);
    const defaultOption = optionsDataServer[name] ?? options;
    const [isLoading, setIsLoading] = useState(false);
    const [selectOption, setSelectOption] = useState(options);
    const [remainderOption, setRemainderOption] = useState(options);

    useEffect(() => {
        if (optionsDataServer[name]) {
            if (optionsDataServer[name].length >= limit) {
                let getData = [];
                let setData = [];
                optionsDataServer[name].map((val, key) => {
                    if (key < limit) {
                        getData.push(val);
                    } else {
                        setData.push(val);
                    }
                });
                setSelectOption(getData);
                setRemainderOption(setData);
            } else {
                setSelectOption(optionsDataServer[name]);
                setRemainderOption(optionsDataServer[name]);
            }
        }
    }, [optionsDataServer]);

    return (
        <Box>
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

                    <Select
                        inputId={name}
                        menuPosition={'fixed'}
                        maxMenuHeight={135}
                        menuPlacement="auto"
                        placeholder={i18next.t(placeholder ?? label)}
                        // eslint-disable-next-line prettier/prettier
                        value={!value || value.length < 1 ? '' : (isMulti === true ? JSON.parse(value).map((val) => defaultOption.filter((of) => of.value === val)[0]) : defaultOption.filter((of) => of.value == value)[0])}
                        isMulti={isMulti}
                        isLoading={isLoading}
                        isDisabled={isDisabled}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        className={formState.errors[name]?.message ? 'is-invalid' : ''}
                        noOptionsMessage={() => i18next.t('Data not available.')}
                        options={selectOption}
                        onMenuClose={() => {
                            // eslint-disable-next-line prettier/prettier
                            if (optionsDataServer[name] && optionsDataServer[name].length >= limit) {
                                let getData = [];
                                let setData = [];
                                optionsDataServer[name].map((val, key) => {
                                    if (key < limit) {
                                        getData.push(val);
                                    } else {
                                        setData.push(val);
                                    }
                                });
                                setSelectOption(getData);
                                setRemainderOption(setData);
                            }
                        }}
                        onMenuScrollToBottom={() => {
                            // eslint-disable-next-line prettier/prettier
                            if (optionsDataServer[name] && optionsDataServer[name].length >= limit) {
                                if (remainderOption.length > 0) {
                                    if (isLoading !== true) {
                                        setIsLoading(true);
                                        setTimeout(() => {
                                            let getData = [];
                                            let setData = [];
                                            remainderOption.map((val, key) => {
                                                if (key < limit) {
                                                    getData.push(val);
                                                } else {
                                                    setData.push(val);
                                                }
                                            });
                                            setSelectOption((prevState) => [
                                                ...prevState,
                                                ...getData,
                                            ]);
                                            setRemainderOption(setData);
                                            setIsLoading(false);
                                        }, 1000);
                                    }
                                }
                            }
                        }}
                        onInputChange={(input) => {
                            if (isSearchable === true) {
                                // eslint-disable-next-line prettier/prettier
                                if (optionsDataServer[name] && optionsDataServer[name].length >= limit) {
                                    if (input && input.length > 0) {
                                        let getData = [];
                                        let setData = [];
                                        // eslint-disable-next-line prettier/prettier
                                        optionsDataServer[name].filter((ofil) => ofil.label.toLowerCase().includes(input.toLowerCase())).map((val, key) => {
                                                if (key < limit) {
                                                    getData.push(val);
                                                } else {
                                                    setData.push(val);
                                                }
                                            });

                                        setSelectOption(getData);
                                        setRemainderOption(setData);
                                    } else {
                                        let getData = [];
                                        let setData = [];
                                        optionsDataServer[name].map((val, key) => {
                                            if (key < limit) {
                                                getData.push(val);
                                            } else {
                                                setData.push(val);
                                            }
                                        });
                                        setSelectOption(getData);
                                        setRemainderOption(setData);
                                    }
                                }
                            }
                        }}
                        styles={{
                            control: (provided) => {
                                return {
                                    ...provided,
                                    backgroundColor: isDisabled ? '#d8dbe0' : 'white',
                                    minHeight: '31px',
                                    borderColor: formState.errors[name]?.message
                                        ? '#e55353'
                                        : '#b1b7c1',
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
                                    color: isDisabled ? 'white' : provided.color,
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
                        {...register(name)}
                        onChange={(e) => {
                            if (typeIsNull(e) === true) {
                                resetField(name);
                            } else {
                                setValue(
                                    name,
                                    // eslint-disable-next-line prettier/prettier
                                    isMulti === true ? JSON.stringify(e.map((val) => val.value)) : e.value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    }
                                );
                            }

                            // eslint-disable-next-line prettier/prettier
                            if (optionsDataServer[name] && optionsDataServer[name].length >= limit) {
                                let getData = [];
                                let setData = [];
                                optionsDataServer[name].map((val, key) => {
                                    if (key < limit) {
                                        getData.push(val);
                                    } else {
                                        setData.push(val);
                                    }
                                });
                                setSelectOption(getData);
                                setRemainderOption(setData);
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

CuiVerSelect.defaultProps = {
    loading: false,
    label: 'Label',
    labelRequired: true,
    options: [],
    optionsDataServer: {},
    isMulti: false,
    isDisabled: false,
    isClearable: true,
    isSearchable: false,
};

CuiVerSelect.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    resetField: PropTypes.func.isRequired,
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    label: PropTypes.string,
    labelRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    optionsDataServer: PropTypes.object,
    isMulti: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    note: PropTypes.string,
};

export default CuiVerSelect;
