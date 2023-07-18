import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { Box, Checkbox, Divider, FormControlLabel, Paper, Skeleton } from '@mui/material';
import { CContainer } from '@coreui/react';
import { MuiButton } from '@components/materialui/inputs';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import configMethod from '@configs/method';
import notistack from '@configs/notistack';

import { typeIsFunction } from '@hooks/type';

const FormPage = ({
    children,
    schema,
    repeat,
    type,
    method,
    data,
    dataServer,
    pathname,
    pathnameHome,
    pathnameAction,
    payload,
}) => {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(dataServer ?? false);
    const [options, setOptions] = useState({});

    const {
        register,
        handleSubmit,
        formState,
        reset,
        resetField,
        getValues,
        setValue,
        setError,
        clearErrors,
    } = useForm({
        resolver: zodResolver(schema),
        shouldFocusError: false,
    });

    useEffect(() => {
        reset();
        clearErrors();
        setChecked(false);

        if (dataServer) {
            try {
                const getData = async () => {
                    await api
                        .post(pathname, payload)
                        .then(({ data: { data, ...propsData } }) => {
                            if (data) {
                                for (const [key, value] of Object.entries(data)) {
                                    if (value) {
                                        setValue(key, value, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        });
                                    } else {
                                        resetField(key);
                                    }
                                }
                            }
                            setOptions(propsData);
                            setLoading(false);
                        })
                        .catch((err) => {
                            apiCatch(err);
                            setLoading(false);
                        });
                };
                setTimeout(() => {
                    getData();
                }, 500);
            } catch (error) {
                apiCatch(error);
                setLoading(false);
            }
        } else {
            if (type === 'edit') {
                for (const [key, value] of Object.entries(data)) {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }
        }
    }, []);

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await api.post(pathnameAction, { ...payload, ...formData, _method: method });
        },
        onMutate: () => {
            setSubmit(true);
            clearErrors();
        },
        onSuccess: ({ statusText, ...success }) => {
            notistack['success'](i18next.t(success.data.message || statusText));
            if (checked) {
                reset();
            } else {
                navigate(pathnameHome, {
                    replace: true,
                });
            }
        },
        onError: (error) => {
            apiCatch(error, setError);
        },
        onSettled: () => {
            setSubmit(false);
        },
    });

    return (
        <Paper
            elevation={0}
            // eslint-disable-next-line prettier/prettier
            sx={{ py: 1.5, px: 0, boxShadow: 'rgb(51 48 60 / 3%) 0px 2px 7px 1px, rgb(51 48 60 / 2%) 0px 4px 7px 0px, rgb(51 48 60 / 1%) 0px 1px 4px 2px' }}>
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                noValidate>
                <CContainer
                    className="mw-100"
                    children={
                        typeIsFunction(children) &&
                        children({
                            register,
                            formState,
                            resetField,
                            getValues,
                            setValue,
                            loading,
                            optionsDataServer: options,
                        })
                    }
                />

                <Box sx={{ mx: 1.5, mt: 2 }}>
                    <Divider sx={{ mx: 0, mb: 1 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {loading === false ? (
                            <>
                                <Box>
                                    <MuiButton
                                        variant="outlined"
                                        color="error"
                                        onClick={() => {
                                            !submit &&
                                                navigate(pathnameHome, {
                                                    replace: true,
                                                });
                                        }}
                                        children="Back"
                                        fullWidth={false}
                                        startIcon={<ArrowBackIcon />}
                                    />
                                    &nbsp;&nbsp;
                                    <MuiButton
                                        loadingButton={true}
                                        loadingProcess={submit}
                                        type="submit"
                                        color="success"
                                        children="Save"
                                        fullWidth={false}
                                        startIcon={<SaveIcon />}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {repeat === true && (
                                        <FormControlLabel
                                            name="create_another"
                                            checked={checked}
                                            control={
                                                <Checkbox size="small" sx={{ p: 0, mr: '4px' }} />
                                            }
                                            label={i18next.t('Create another')}
                                            labelPlacement="end"
                                            onChange={(e) => setChecked(e.target.checked)}
                                            sx={{
                                                mx: 0,
                                                '& .MuiTypography-root': {
                                                    fontSize: '14px',
                                                    userSelect: 'none',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex' }}>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={100}
                                        height={31}
                                    />
                                    &nbsp;&nbsp;
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={100}
                                        height={31}
                                    />
                                </Box>

                                {repeat === true && (
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={100}
                                        height={31}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

FormPage.defaultProps = {
    repeat: false,
    type: 'create',
    method: configMethod[0],
    data: {},
    dataServer: false,
    pathname: window.location.pathname,
    pathnameHome: window.location.pathname,
    payload: {},
};

FormPage.propTypes = {
    children: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    repeat: PropTypes.bool,
    type: PropTypes.oneOf(['create', 'edit']),
    method: PropTypes.oneOf(configMethod),
    data: PropTypes.object,
    dataServer: PropTypes.bool,
    pathname: PropTypes.string,
    pathnameHome: PropTypes.string,
    pathnameAction: PropTypes.string,
    payload: PropTypes.object,
};

export default FormPage;
