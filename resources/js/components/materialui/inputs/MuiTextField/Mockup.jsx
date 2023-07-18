import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { TextField } from '@mui/material';

import color from '@configs/color';

const Mockup = ({
    id,
    label,
    value,
    valueType,
    placeholder,
    labelRequired,
    onChange,
    InputProps,
    invalid,
    theme,
}) => {
    return (
        <TextField
            autoComplete="off"
            id={id}
            value={value}
            type={valueType === 'password' ? 'password' : 'text'}
            label={i18next.t(label)}
            placeholder={i18next.t(placeholder.length < 1 ? label : placeholder)}
            fullWidth
            size="small"
            variant="outlined"
            required={labelRequired}
            error={invalid.length < 1 || invalid === undefined ? false : true}
            helperText={invalid}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
            InputProps={InputProps}
            sx={{
                '& .MuiInputLabel-root': {
                    color: invalid
                        ? theme === 'white'
                            ? 'error.light'
                            : 'error.main'
                        : theme === 'white'
                        ? 'common.white'
                        : 'common.black',
                    '&.Mui-focused': {
                        color: invalid
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
                        p: '10.5px 14px 6.5px 14px',
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
                        borderColor: invalid
                            ? theme === 'white'
                                ? 'error.light'
                                : 'error.main'
                            : theme === 'white'
                            ? color.accent100
                            : color.primary100,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: invalid
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

Mockup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    valueType: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    labelRequired: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    InputProps: PropTypes.object,
    invalid: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
};

export default Mockup;
