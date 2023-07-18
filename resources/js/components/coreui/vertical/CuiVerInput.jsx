import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Box, Skeleton, Typography } from '@mui/material';
import { CFormInput, CFormLabel } from '@coreui/react';

import color from '@configs/color';

const CuiVerInput = ({
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
    size,
    note,
    type,
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
                    <CFormInput
                        autoComplete="off"
                        type={type}
                        id={name}
                        size={size}
                        // value={getValues(name) ?? ''}
                        placeholder={i18next.t(placeholder ?? label)}
                        invalid={formState.errors[name]?.message ? true : false}
                        feedback={i18next.t(formState.errors[name]?.message)}
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
                </>
            )}
        </Box>
    );
};

CuiVerInput.defaultProps = {
    loading: false,
    label: 'Label',
    labelRequired: true,
    size: 'sm',
    type: 'text',
};

CuiVerInput.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    resetField: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    type: PropTypes.string,
    loading: PropTypes.bool,
    label: PropTypes.string,
    labelRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['sm', '', 'lg']),
    note: PropTypes.string,
};

export default CuiVerInput;
