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
    Badge as BadgeIcon,
    ContactMail as ContactMailIcon,
    Lock as LockIcon,
    Login as LoginIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, IconButton, InputAdornment, Link, Paper } from '@mui/material';
import { MuiTextField } from '@components/materialui/inputs';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import color from '@configs/color';
import { decrypt, encrypt } from '@configs/crypto';

import { STORE_TYPE_APP_LOGIN, STORE_TYPE_APP_STATE } from '@store/type/app';

import Banner from '../Banner';
import Copyright from '../Copyright';

const Form = ({ dispatch }) => {
    const schema = z.object({
        username: z.string().nonempty({
            message: 'The active field is required.',
        }),
        password: z.string().nonempty({
            message: 'The active field is required.',
        }),
        first_name: z.string().nonempty({
            message: 'The first name field is required.',
        }),
        last_name: z.string(),
        alamat: z.string().nonempty({
            message: 'The alamat field is required.',
        }),
        nomor_telepon: z.string().nonempty({
            message: 'The nomor telepon field is required.',
        }),
        nomor_sim: z.string().nonempty({
            message: 'The nomor sim field is required.',
        }),
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
            return await api.post('/register', formData);
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ bgcolor: color.primary100 }}>
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
                    title={i18next.t('Adventure starts here') + ' 🚀'}
                    description={i18next.t('Make your app management easy and fun!')}
                />

                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit((data) =>
                        mutation.mutate({
                            ...data,
                            password: encrypt(data.password),
                            device: osName + ' ' + osVersion,
                        })
                    )}
                    sx={{ width: '100%' }}>
                    {alertError.length > 0 && (
                        <Alert
                            severity="error"
                            sx={{ mb: 3, width: '100%' }}
                            onClose={() => setAlertError('')}
                            children={i18next.t(alertError)}
                        />
                    )}

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="username"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Username"
                                    theme="white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="password"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Password"
                                    theme="white"
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="first_name"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Fisrt Name"
                                    theme="white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="last_name"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Last Name"
                                    theme="white"
                                    required={false}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="alamat"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Alamat"
                                    theme="white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="nomor_telepon"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Nomor Telepon"
                                    theme="white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className="mb-2">
                                <MuiTextField
                                    name="nomor_sim"
                                    register={register}
                                    resetField={resetField}
                                    formState={formState}
                                    getValues={getValues}
                                    setValue={setValue}
                                    label="Nomor Sim"
                                    theme="white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>

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
                            color: color.bg300,
                            backgroundColor: color.accent200,
                            ':hover': {
                                color: color.primary200,
                                backgroundColor: color.accent100,
                            },
                            '&.MuiLoadingButton-root': {
                                '&.Mui-disabled': {
                                    color: color.primary200,
                                    backgroundColor: color.accent100,
                                },
                            },
                        }}
                        children={i18next.t('Register')}
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

Form.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Form;
