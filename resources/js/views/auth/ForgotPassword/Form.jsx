import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { ContactMail as ContactMailIcon, MailLock as MailLockIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, InputAdornment, Link, Paper } from '@mui/material';
import { MuiTextField } from '@components/materialui';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import color from '@configs/color';
import notistack from '@configs/notistack';

import Banner from '../Banner';
import Copyright from '../Copyright';

const Form = () => {
    const schema = z.object({
        email: z
            .string()
            .email({
                message: 'The selected email is invalid.',
            })
            .nonempty({
                message: 'The email field is required.',
            }),
    });

    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [alertError, setAlertError] = useState('');

    const {
        register,
        handleSubmit,
        formState,
        resetField,
        getValues,
        setValue,
        setError,
        clearErrors,
    } = useForm({
        resolver: zodResolver(schema),
        shouldFocusError: false,
    });

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await api.post('/forgot-password', formData);
        },
        onMutate: () => {
            clearErrors();
            setSubmit(true);
            setAlertError('');
        },
        onSuccess: ({ statusText, ...success }) => {
            notistack['success'](i18next.t(success.data.message || statusText));
            navigate('/', {
                replace: true,
            });
        },
        onError: (error) => {
            apiCatch(error, setError, setAlertError);
            setSubmit(false);
        },
    });

    return (
        // eslint-disable-next-line prettier/prettier
        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square sx={{ bgcolor: color.primary100 }}>
            <Box
                sx={{
                    py: 3,
                    mx: 4,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Banner
                    title={i18next.t('Forgot Password') + ' 🔒'}
                    // eslint-disable-next-line prettier/prettier
                    description={i18next.t(`Enter your email and we′ll send you instructions to reset your password`)}
                />

                {alertError.length > 0 && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3, width: '100%' }}
                        onClose={() => setAlertError('')}
                        children={i18next.t(alertError)}
                    />
                )}

                <Box
                    component="form"
                    autoComplete="off"
                    noValidate
                    // eslint-disable-next-line prettier/prettier
                    onSubmit={handleSubmit((data) => mutation.mutate(data))}
                    sx={{ width: '100%' }}>
                    <div className="mb-4">
                        <MuiTextField
                            name="email"
                            register={register}
                            resetField={resetField}
                            formState={formState}
                            getValues={getValues}
                            setValue={setValue}
                            label="Email"
                            theme="white"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ContactMailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <LoadingButton
                        type="submit"
                        size="small"
                        fullWidth
                        disableElevation
                        color="success"
                        loading={submit}
                        loadingPosition="start"
                        startIcon={<MailLockIcon />}
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontSize: '14px',
                            color: color.primary200,
                            backgroundColor: color.accent100,
                            ':hover': {
                                color: color.bg300,
                                backgroundColor: color.accent200,
                            },
                            '&.MuiLoadingButton-root': {
                                '&.Mui-disabled': {
                                    color: color.bg300,
                                    backgroundColor: color.accent200,
                                },
                            },
                        }}
                        children={i18next.t('Send Reset Link')}
                    />

                    <Link
                        href="/"
                        variant="body2"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/', {
                                replace: true,
                            });
                        }}
                        children={i18next.t('Already have an account? Login')}
                        sx={{
                            color: color.bg300,
                            ':hover': {
                                color: color.accent100,
                                textDecoration: 'none',
                            },
                        }}
                    />

                    <Copyright
                        sx={{
                            color: color.bg300,
                            '& .MuiLink-root': {
                                textDecoration: 'none',
                                ':hover': {
                                    color: color.accent100,
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Grid>
    );
};

export default Form;
