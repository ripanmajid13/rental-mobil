import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Box } from '@mui/material';
import { CFormLabel, CFormTextarea } from '@coreui/react';

import color from '@configs/color';

const CuiTextarea = ({
    id,
    setInput,
    label,
    placeholder,
    value,
    rows,
    required,
    requiredLabel,
    invalid,
    disabled,
}) => {
    return (
        <Box
            sx={{
                '& .form-control': {
                    p: '4px 8px',
                    resize: 'none',
                    fontSize: '.875rem',
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
            <CFormTextarea
                id={id}
                rows={rows}
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
        </Box>
    );
};

CuiTextarea.defaultProps = {
    value: '',
    rows: 3,
    required: false,
    requiredLabel: true,
    invalid: '',
    disabled: false,
};

CuiTextarea.propTypes = {
    id: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    required: PropTypes.bool,
    requiredLabel: PropTypes.bool,
    invalid: PropTypes.string,
    disabled: PropTypes.bool,
};

export default CuiTextarea;
