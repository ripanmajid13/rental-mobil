import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Grow,
    LinearProgress,
    Typography,
} from '@mui/material';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import xsrfToken from '@configs/xsrfToken';

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

const DialogPrint = ({ open, width, setDialog, title, titleFile, fileName, pathname, payload }) => {
    const key = Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5);
    const broadcastAs = 'print' + pathname.replace(/\//g, '-') + '-' + key;
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        if (open === true) {
            const postData = async () => {
                try {
                    // eslint-disable-next-line prettier/prettier
                    window.Echo.channel('channel-process').listen('.process-' + broadcastAs, ({ response }) => setLoading(parseInt(response)));

                    await api
                        // eslint-disable-next-line prettier/prettier
                        .post(pathname, {
                                ...payload,
                                ...(titleFile && {
                                    titleFile: titleFile,
                                }),
                                broadcastAs: broadcastAs,
                                fileName: i18next.t(fileName ?? title),
                                method: 'POST',
                            },
                            {
                                headers: {
                                    ...(Object.keys(xsrfToken()).some(
                                        (xrfs) => xrfs === 'token'
                                    ) && {
                                        Authorization: xsrfToken().token,
                                    }),
                                },
                            }
                        )
                        .then(({ data }) => {
                            window.open(window.location.origin + data.file, '_blank');
                            setDialog((prevState) => ({
                                ...prevState,
                                open: false,
                            }));

                            setTimeout(() => {
                                setLoading(0);
                            }, 300);
                        })
                        .catch((error) => {
                            apiCatch(error);
                            setDialog((prevState) => ({
                                ...prevState,
                                open: false,
                            }));
                            setTimeout(() => {
                                setLoading(0);
                            }, 300);
                        });
                } catch (error) {
                    apiCatch(error);
                    setDialog((prevState) => ({
                        ...prevState,
                        open: false,
                    }));
                    setTimeout(() => {
                        setLoading(0);
                    }, 300);
                }
            };
            setTimeout(() => {
                postData();
            }, 500);
        }
    }, [open]);

    return (
        <Dialog
            fullWidth={true}
            open={open}
            maxWidth={width}
            transitionDuration={{ enter: 425, exit: 395 }}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle
                sx={{
                    p: 1,
                    fontSize: '1.15rem',
                    textAlign: 'center',
                    borderBottom: 'solid 1px rgba(224, 224, 224, 1)',
                }}
                children={i18next.t(title)}
            />

            <DialogContent sx={{ px: 3, py: '16px !important' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress
                            variant="determinate"
                            color="success"
                            value={loading}
                            sx={{ height: '30px', borderRadius: '15px' }}
                        />
                    </Box>
                    <Box sx={{ minWidth: 35, position: 'absolute' }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            children={`${Math.round(loading)}%`}
                        />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

DialogPrint.defaultProps = {
    open: false,
    width: 'xs',
    title: '',
    pathname: '',
    payload: {},
};

DialogPrint.propTypes = {
    open: PropTypes.bool.isRequired,
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
    setDialog: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleFile: PropTypes.string,
    fileName: PropTypes.string,
    pathname: PropTypes.string,
    payload: PropTypes.object,
};

export default DialogPrint;
