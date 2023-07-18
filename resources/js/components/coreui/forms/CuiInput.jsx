import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Box, Typography } from '@mui/material';
import { CFormInput, CFormLabel } from '@coreui/react';

import color from '@configs/color';

const CuiInput = ({
    id,
    setInput,
    label,
    size,
    placeholder,
    value,
    required,
    requiredLabel,
    disabled,
    invalid,
    note,
}) => {
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
                    '&.is-invalid': {
                        ':hover': {
                            borderColor: '#e55353',
                        },
                        ':focus': {
                            borderColor: '#e55353',
                        },
                    },
                },
            }}>
            <CFormLabel htmlFor={id} className="mb-0">
                {i18next.t(label)}
                {required && requiredLabel && <span className="text-danger">*</span>} :
            </CFormLabel>
            <CFormInput
                autoComplete="off"
                type="text"
                id={id}
                size={size}
                name={id}
                value={value}
                disabled={disabled}
                placeholder={i18next.t(placeholder ?? label)}
                invalid={invalid.length < 1 ? false : true}
                feedback={invalid}
                onChange={(e) =>
                    setInput((prevState) => ({
                        ...prevState,
                        [id]: {
                            ...prevState[id],
                            value: e.target.value,
                            invalid: '',
                        },
                    }))
                }
            />
            {note && (
                <Typography
                    color="error"
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ mb: 0 }}
                    children={'*' + i18next.t(note)}
                />
            )}
        </Box>
    );
};

CuiInput.defaultProps = {
    value: '',
    size: 'sm',
    required: false,
    requiredLabel: true,
    invalid: '',
    disabled: false,
};

CuiInput.propTypes = {
    id: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.oneOf(['sm', '', 'lg']),
    note: PropTypes.string,
    required: PropTypes.bool,
    requiredLabel: PropTypes.bool,
    invalid: PropTypes.string,
    disabled: PropTypes.bool,
};

export default CuiInput;
