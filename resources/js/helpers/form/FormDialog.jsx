import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import {
    Box,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grow,
    Skeleton,
} from '@mui/material';
import { CContainer } from '@coreui/react';
import { MuiButton } from '@components/materialui/inputs';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
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

const FormDialog = ({
    open,
    children,
    schema,
    setDialog,
    width,
    title,
    repeat,
    type,
    method,
    data,
    pathname,
    pathnameDataServer,
    payload,
    refetch,
}) => {
    const [submit, setSubmit] = useState(false);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
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
        if (open === true) {
            reset();
            clearErrors();
            setChecked(false);

            if (pathnameDataServer) {
                setLoading(true);
                try {
                    const getData = async () => {
                        await api
                            .post(pathnameDataServer, payload)
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
                                setDialog((prevState) => ({
                                    ...prevState,
                                    open: false,
                                }));
                            });
                    };
                    setTimeout(() => {
                        getData();
                    }, 500);
                } catch (error) {
                    apiCatch(error);
                    setLoading(false);
                    setDialog((prevState) => ({
                        ...prevState,
                        open: false,
                    }));
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
        }
    }, [open]);

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await api.post(pathname, { ...payload, ...formData, _method: method });
        },
        onMutate: () => {
            setSubmit(true);
            clearErrors();
        },
        onSuccess: ({ statusText, ...success }) => {
            if (checked) reset();
            if (refetch && typeIsFunction(refetch)) refetch();
            notistack['success'](i18next.t(success.data.message || statusText));
            setDialog((prevState) => ({
                ...prevState,
                open: checked,
            }));
        },
        onError: (error) => {
            apiCatch(error, setError);
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
                // onSubmit={handleSubmit((data) => console.log(data))}
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

                <DialogContent sx={{ py: '12px !important', px: '1px !important' }}>
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
                </DialogContent>

                <DialogActions
                    sx={{
                        justifyContent: 'space-between',
                        borderTop: 'solid 1px rgba(224, 224, 224, 1)',
                    }}>
                    <Box>
                        {loading === false ? (
                            <>
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
                                    children="Save"
                                    fullWidth={false}
                                    startIcon={<SaveIcon />}
                                />
                            </>
                        ) : (
                            <Box sx={{ display: 'flex' }}>
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={31}
                                />
                                &nbsp;
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={31}
                                />
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {repeat === true &&
                            (loading === false ? (
                                <FormControlLabel
                                    name="create_another"
                                    checked={checked}
                                    control={<Checkbox size="small" sx={{ p: 0, mr: '4px' }} />}
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
                            ) : (
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={100}
                                    height={31}
                                />
                            ))}
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

FormDialog.defaultProps = {
    open: false,
    width: 'xs',
    title: 'Form Dialog',
    repeat: false,
    type: 'create',
    method: configMethod[0],
    data: {},
    pathname: window.location.pathname,
    payload: {},
};

FormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    setDialog: PropTypes.func.isRequired,
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    title: PropTypes.string,
    repeat: PropTypes.bool,
    type: PropTypes.oneOf(['create', 'edit']),
    method: PropTypes.oneOf(configMethod),
    data: PropTypes.object,
    pathname: PropTypes.string,
    pathnameDataServer: PropTypes.string,
    payload: PropTypes.object,
    refetch: PropTypes.func,
};

export default FormDialog;
