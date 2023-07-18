import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { TextField } from '@mui/material';

import color from '@configs/color';

const MuiTextField = ({
    name,
    register,
    resetField,
    formState,
    getValues,
    setValue,
    // loading,
    label,
    placeholder,
    InputProps,
    required,
    theme,
    type,
}) => {
    return (
        <TextField
            id={name}
            type={type}
            label={i18next.t(label)}
            placeholder={i18next.t(placeholder ?? label)}
            autoComplete="off"
            fullWidth
            size="small"
            required={required}
            value={getValues(name) ?? ''}
            InputLabelProps={{ shrink: true }}
            error={formState.errors[name]?.message ? true : false}
            helperText={formState.errors[name]?.message}
            InputProps={InputProps}
            {...register(name)}
            onChange={(e) => {
                if (e.target.value.length < 1) {
                    resetField(name);
                } else {
                    setValue(name, e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }}
            sx={{
                '& .MuiInputLabel-root': {
                    color: formState.errors[name]?.message
                        ? theme === 'white'
                            ? 'error.light'
                            : 'error.main'
                        : theme === 'white'
                        ? 'common.white'
                        : 'common.black',
                    '&.Mui-focused': {
                        color: formState.errors[name]?.message
                            ? theme === 'white'
                                ? 'error.light'
                                : 'error.main'
                            : theme === 'white'
                            ? 'common.white'
                            : 'common.black',
                    },
                    '& .MuiInputLabel-asterisk': {
                        color: 'error.main',
                    },
                },
                '& .MuiInputBase-root': {
                    '&.Mui-error': {
                        '& fieldset': {
                            borderColor: theme === 'white' ? 'error.light' : 'error.main',
                        },
                    },
                    '& .MuiInputBase-input': {
                        p: `10.5px 14px 6.5px ${InputProps ? '5px' : '14px'}`,
                        color: theme === 'white' ? 'common.white' : 'common.black',
                    },
                    '& .MuiInputAdornment-root': {
                        '& .MuiSvgIcon-root': {
                            mt: '4px',
                            color: theme === 'white' ? 'common.white' : 'common.black',
                        },
                    },
                    '& fieldset': {
                        borderColor: theme === 'white' ? 'common.white' : 'common.black',
                    },
                    '&:hover fieldset': {
                        borderColor: formState.errors[name]?.message
                            ? theme === 'white'
                                ? 'error.light'
                                : 'error.main'
                            : theme === 'white'
                            ? color.accent100
                            : color.primary100,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: formState.errors[name]?.message
                            ? theme === 'white'
                                ? 'error.light'
                                : 'error.main'
                            : theme === 'white'
                            ? color.accent100
                            : color.primary100,
                    },
                    '& legend': {
                        float: 'unset !important',
                    },
                },
                '& .MuiFormHelperText-root': {
                    marginLeft: 0,
                    '&.Mui-error': {
                        color: theme === 'white' ? 'error.light' : 'error.main',
                    },
                },
            }}
        />
    );
};

MuiTextField.defaultProps = {
    // loading: false,
    label: 'Label',
    theme: 'dark',
    required: true,
    type: 'text',
};

MuiTextField.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    resetField: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    // loading: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    theme: PropTypes.oneOf(['white', 'dark']),
    InputProps: PropTypes.object,
    required: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'password']),
};

export default MuiTextField;
