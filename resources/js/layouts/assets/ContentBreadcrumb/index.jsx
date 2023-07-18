import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18next from 'i18next';

import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Typography } from '@mui/material';

import { APP_MODULE } from '@configs/app';
import { decrypt, encrypt } from '@configs/crypto';

import { STORE_TYPE_APP_MODULE, STORE_TYPE_APP_STATE } from '@store/type/app';

import routeBreadcrumb from './routeBreadcrumb';
import routeBreadcrumbModule from './routeBreadcrumbModule';

const ContentBreadcrumb = ({ dispatch, app_module, app_token }) => {
    return (
        <Box
            sx={{
                mt: '.5rem',
                pr: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Breadcrumbs
                sx={{
                    px: '1.5rem',
                    pt: 0,
                    display: 'block',
                    fontSize: '12px',
                    position: 'relative',
                    zIndex: 0,
                    '& .MuiBreadcrumbs-ol': {
                        marginLeft: '1px',
                        marginRight: '1px',
                    },
                }}
                separator={<NavigateNextIcon sx={{ fontSize: '14px' }} />}
                aria-label="breadcrumb"
                // eslint-disable-next-line prettier/prettier
                children={APP_MODULE === true ? routeBreadcrumbModule(app_module) : routeBreadcrumb()}
            />

            {APP_MODULE === true && (
                <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                        mb: 0,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => {
                        dispatch({
                            type: STORE_TYPE_APP_STATE,
                            app_backdrop_open: true,
                            app_backdrop_content: i18next.t('Home') + ' . . .',
                        });
                        setTimeout(() => {
                            dispatch({
                                type: STORE_TYPE_APP_MODULE,
                                token: encrypt(
                                    JSON.stringify({
                                        ...JSON.parse(decrypt(app_token)),
                                        module: '',
                                    })
                                ),
                                module: '',
                            });
                        }, 500);
                    }}>
                    {i18next.t('Home').toUpperCase()}{' '}
                    <FormatAlignJustifyIcon sx={{ ml: 1 }} fontSize="inherit" />
                </Typography>
            )}
        </Box>
    );
};

ContentBreadcrumb.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app_module: PropTypes.string.isRequired,
    app_token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => {
    return {
        app_module: app.app_module,
        app_token: app.app_token,
    };
};

export default connect(mapStateToProps, null)(ContentBreadcrumb);
