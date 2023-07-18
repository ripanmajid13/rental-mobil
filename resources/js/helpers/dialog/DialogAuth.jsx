import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
    AccountCircle as AccountCircleIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grow,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { MuiButton, MuiTextField } from '@components/materialui/inputs';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import { encrypt } from '@configs/crypto';
import configMethod from '@configs/method';
import notistack from '@configs/notistack';

import { typeIsFunction } from '@hooks/type';

const Transition = forwardRef(function Transition(props, ref) {
    const customProps = {
        ...props,
        timeout: {
            enter: 425,
            exit: 395,
        },
    };

    return <Grow ref={ref} {...customProps} />;
});

const DialogAuth = ({
    open,
    data,
    width,
    title,
    text,
    setDialog,
    method,
    pathname,
    payload,
    refetch,
}) => {
    const [submit, setSubmit] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [alertError, setAlertError] = useState('');

    useEffect(() => {
        if (open === true) {
            reset();
            clearErrors();
        }
    }, [open]);

    const schema = z.object({
        username: z.string().nonempty({
            message: 'The username field is required.',
        }),
        password: z.string().nonempty({
            message: 'The password field is required.',
        }),
    });

    const { register, handleSubmit, formState, reset, setError, clearErrors } = useForm({
        resolver: zodResolver(schema),
        shouldFocusError: false,
    });

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await api.post(pathname, {
                ...payload,
                ...(data && {
                    datatable: data,
                }),
                ...{
                    ...formData,
                    password: encrypt(formData.password),
                },
                _method: method,
            });
        },
        onMutate: () => {
            setSubmit(true);
            clearErrors();
        },
        onSuccess: ({ statusText, ...success }) => {
            if (refetch && typeIsFunction(refetch)) refetch();
            notistack['success'](i18next.t(success.data.message || statusText));
            setDialog((prevState) => ({
                ...prevState,
                open: false,
            }));
        },
        onError: (error) => {
            apiCatch(error, setError, setAlertError);
        },
        onSettled: () => {
            setSubmit(false);
        },
    });

    return (
        <Dialog
            fullWidth={true}
            open={open}
            maxWidth={width}
            transitionDuration={{ enter: 425, exit: 395 }}
            TransitionComponent={Transition}
            onClose={() =>
                !submit &&
                setDialog((prevState) => ({
                    ...prevState,
                    open: false,
                }))
            }
            keepMounted
            aria-describedby="alert-dialog-slide-description">
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                noValidate>
                <DialogTitle
                    sx={{
                        p: 1,
                        fontSize: '1.15rem',
                        textAlign: 'center',
                        borderBottom: 'solid 1px rgba(224, 224, 224, 1)',
                    }}
                    children={i18next.t(title)}
                />

                <DialogContent>
                    {text.length > 0 && (
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ mt: 1, textAlign: 'center' }}
                            children={i18next.t(text) + ' ?'}
                        />
                    )}

                    {alertError.length > 0 && (
                        <Alert
                            severity="error"
                            sx={{ mt: 2, my: '20px', width: '100%' }}
                            onClose={() => setAlertError('')}
                            children={i18next.t(alertError)}
                        />
                    )}

                    <div className="mt-4 mb-4">
                        <MuiTextField
                            name="username"
                            register={register}
                            formState={formState}
                            label="Username/Email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <MuiTextField
                            name="password"
                            register={register}
                            formState={formState}
                            label="Password"
                            type={passwordType}
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
                                            onClick={() => setPasswordType(passwordType === 'text' ? 'password' : 'text')}
                                            edge="end">
                                            {passwordType === 'password' ? (
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
                </DialogContent>

                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        borderTop: 'solid 1px rgba(224, 224, 224, 1)',
                    }}>
                    <MuiButton
                        variant="outlined"
                        color="error"
                        onClick={() =>
                            !submit &&
                            setDialog((prevState) => ({
                                ...prevState,
                                open: false,
                            }))
                        }
                        children="Cancel"
                        fullWidth={false}
                        startIcon={<CloseIcon />}
                    />
                    &nbsp;
                    <MuiButton
                        loadingButton={true}
                        loadingProcess={submit}
                        type="submit"
                        color="success"
                        children="Yes"
                        fullWidth={false}
                        startIcon={<CheckIcon />}
                    />
                </DialogActions>
            </Box>
        </Dialog>
    );
};

DialogAuth.defaultProps = {
    open: false,
    width: 'xs',
    title: 'Dialog Auth',
    text: '',
    method: configMethod[0],
    pathname: window.location.pathname,
    payload: {},
};

DialogAuth.propTypes = {
    open: PropTypes.bool.isRequired,
    setDialog: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    title: PropTypes.string,
    text: PropTypes.string,
    method: PropTypes.oneOf(configMethod),
    pathname: PropTypes.string,
    payload: PropTypes.object,
    refetch: PropTypes.func,
};

export default DialogAuth;
