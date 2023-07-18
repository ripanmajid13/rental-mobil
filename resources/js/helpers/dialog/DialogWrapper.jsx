import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Close as CloseIcon } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grow } from '@mui/material';
import { MuiButton } from '@components/materialui/inputs';

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

const DialogWrapper = ({ open, width, setDialog, title, children }) => {
    return (
        <Dialog
            fullWidth={true}
            open={open}
            maxWidth={width}
            transitionDuration={{ enter: 425, exit: 395 }}
            TransitionComponent={Transition}
            onClose={() =>
                setDialog((prevState) => ({
                    ...prevState,
                    open: false,
                }))
            }
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

            <DialogContent sx={{ p: 0 }} children={children} />

            <DialogActions
                sx={{
                    justifyContent: 'center',
                    borderTop: 'solid 1px rgba(224, 224, 224, 1)',
                }}>
                <MuiButton
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                        setDialog((prevState) => ({
                            ...prevState,
                            open: false,
                        }))
                    }
                    children="Close"
                    fullWidth={false}
                    startIcon={<CloseIcon />}
                />
            </DialogActions>
        </Dialog>
    );
};

DialogWrapper.defaultProps = {
    open: false,
    width: 'xs',
    title: '',
};

DialogWrapper.propTypes = {
    open: PropTypes.bool.isRequired,
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
    setDialog: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
};

export default DialogWrapper;
