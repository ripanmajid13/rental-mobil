import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { osName, osVersion } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
    AccountCircle as AccountCircleIcon,
    Lock as LockIcon,
    Login as LoginIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, IconButton, InputAdornment, Link, Paper } from '@mui/material';
import { MuiTextField } from '@components/materialui';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import color from '@configs/color';
import { decrypt, encrypt } from '@configs/crypto';

import { APP_NAME } from '@src/configs/app';
import { STORE_TYPE_APP_LOGIN, STORE_TYPE_APP_STATE } from '@store/type/app';

import Banner from '../Banner';
import Copyright from '../Copyright';

const Form = ({ dispatch }) => {
    const schema = z.object({
        username: z.string(),
        password: z.string(),
    });

    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [password, setPassword] = useState('password');
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
            return await api.post('/login', formData);
        },
        onMutate: () => {
            clearErrors();
            setSubmit(true);
            setAlertError('');
        },
        onSuccess: ({ data }) => {
            api.defaults.headers.common['Authorization'] = JSON.parse(decrypt(data)).token;
            for (let [key, val] of Object.entries(JSON.parse(decrypt(data)).lang)) {
                i18next.addResourceBundle(key, 'translation', val.translation);
            }
            dispatch({
                type: STORE_TYPE_APP_LOGIN,
                token: encrypt(
                    JSON.stringify({
                        ...JSON.parse(decrypt(data)),
                        module: '',
                    })
                ),
                content: i18next.t('Welcome') + ' . . .',
            });
            setTimeout(() => {
                setSubmit(false);
                dispatch({
                    type: STORE_TYPE_APP_STATE,
                    app_auth: true,
                });
            }, 500);
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
                    title={i18next.t('Welcome to') + ' ' + APP_NAME + ' 👋🏻'}
                    description={i18next.t('Please login to your account and start the adventure!')}
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
                    onSubmit={handleSubmit((data) => mutation.mutate({ ...data, password: encrypt(data.password), device: osName + ' ' + osVersion }))}
                    sx={{ width: '100%' }}>
                    <div className="mb-4">
                        <MuiTextField
                            name="username"
                            register={register}
                            resetField={resetField}
                            formState={formState}
                            getValues={getValues}
                            setValue={setValue}
                            label="Username"
                            theme="white"
                            required={false}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <MuiTextField
                            name="password"
                            register={register}
                            resetField={resetField}
                            formState={formState}
                            getValues={getValues}
                            setValue={setValue}
                            label="Password"
                            theme="white"
                            required={false}
                            type={password}
                            encrypted={true}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            // eslint-disable-next-line prettier/prettier
                                            onClick={() => setPassword((prevState) => prevState === 'text' ? 'password' : 'text')}
                                            edge="end">
                                            {password === 'text' ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
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
                        startIcon={<LoginIcon />}
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
                        children={i18next.t('Login')}
                    />

                    <Grid container>
                        <Grid item xs>
                            <Link
                                href="/forgot-password"
                                variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/forgot-password', {
                                        replace: true,
                                    });
                                }}
                                children={i18next.t('Forgot password?')}
                                sx={{
                                    color: color.bg300,
                                    ':hover': {
                                        color: color.accent100,
                                        textDecoration: 'none',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <Link
                                href="/register"
                                variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/register', {
                                        replace: true,
                                    });
                                }}
                                children={i18next.t("Don't have an account? Register")}
                                sx={{
                                    color: color.bg300,
                                    ':hover': {
                                        color: color.accent100,
                                        textDecoration: 'none',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

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

Form.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Form;
