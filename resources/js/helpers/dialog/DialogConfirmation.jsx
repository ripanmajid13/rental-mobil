import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { useMutation } from '@tanstack/react-query';

import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grow,
    Typography,
} from '@mui/material';
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

const DialogConfirmation = ({
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

    const mutation = useMutation({
        mutationFn: async () => {
            return await api.post(pathname, {
                ...payload,
                ...(data && {
                    datatable: data,
                }),
                _method: method,
            });
        },
        onMutate: () => {
            setSubmit(true);
        },
        onSuccess: ({ statusText, ...success }) => {
            if (refetch && typeIsFunction(refetch)) refetch();
            notistack['success'](i18next.t(success.data.message || statusText));
        },
        onError: (error) => {
            apiCatch(error);
        },
        onSettled: () => {
            setSubmit(false);
            setDialog((prevState) => ({
                ...prevState,
                open: false,
            }));
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
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                }}
                autoComplete="off"
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
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        className="mt-3 mb-0"
                        sx={{ textAlign: 'center' }}
                        children={i18next.t(text) + ' ?'}
                    />
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

DialogConfirmation.defaultProps = {
    open: false,
    width: 'xs',
    title: 'Dialog Auth',
    text: '',
    method: configMethod[0],
    pathname: window.location.pathname,
    payload: {},
};

DialogConfirmation.propTypes = {
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

export default DialogConfirmation;
