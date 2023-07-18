import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import Mockup from './Mockup';
import MockupLoading from './MockupLoading';

const MuiButton = ({ children, loadingButton, loadingPosition, loadingProcess, ...props }) => {
    if (loadingButton !== true) {
        return (
            <Mockup
                type={props.type}
                color={props.color}
                disableElevation={props.disableElevation}
                variant={props.variant}
                startIcon={props.startIcon}
                size={props.size}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
                onClick={props.onClick}
                sx={{
                    height: 31,
                    padding: '0 10px',
                    textTransform: 'none',
                    ...props.sx,
                }}
                children={i18next.t(children)}
            />
        );
    } else {
        return (
            <MockupLoading
                loading={loadingProcess}
                type={props.type}
                color={props.color}
                disableElevation={props.disableElevation}
                variant={props.variant}
                size={props.size}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
                onClick={props.onClick}
                startIcon={props.startIcon}
                loadingPosition={loadingPosition}
                sx={{
                    height: 31,
                    padding: '0 10px',
                    textTransform: 'none',
                    '&.MuiLoadingButton-root': {
                        '&.Mui-disabled': {
                            color: 'common.white',
                            backgroundColor: props.color + '.main',
                        },
                    },
                    ...props.sx,
                }}
                children={i18next.t(children)}
            />
        );
    }
};

MuiButton.defaultProps = {
    loadingButton: false,
    loadingProcess: false,
    loadingPosition: 'start',
    type: 'button',
    color: 'secondary',
    disableElevation: true,
    variant: 'contained',
    size: 'small',
    fullWidth: true,
    disabled: false,
};

MuiButton.propTypes = {
    children: PropTypes.node.isRequired,
    loadingButton: PropTypes.bool,
    loadingProcess: PropTypes.bool,
    loadingPosition: PropTypes.oneOf(['start', 'end', 'center']),
    type: PropTypes.string,
    color: PropTypes.oneOf([
        'inherit',
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
    ]),
    disableElevation: PropTypes.bool,
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    startIcon: PropTypes.node,
    onClick: PropTypes.func,
    sx: PropTypes.object,
};

export default MuiButton;
