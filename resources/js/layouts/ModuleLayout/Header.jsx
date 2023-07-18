import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import {
    Cached as CachedIcon,
    LockPerson as LockPersonIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import color from '@configs/color';
import { decrypt, encrypt } from '@configs/crypto';

import HeaderLeft from '@layouts/assets/HeaderLeft';
import {
    STORE_TYPE_APP_FLUSH_CACHE,
    STORE_TYPE_APP_LOGOUT,
    STORE_TYPE_APP_STATE,
} from '@store/type/app';

const Header = ({ dispatch, token }) => {
    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{ bgcolor: color.primary100, boxShadow: 'rgba(47, 43, 61, 0.14) 0px 2px 6px 0px' }}>
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <HeaderLeft />
                </Box>

                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    startIcon={<CachedIcon />}
                    sx={{ my: 1, mx: 1.5 }}
                    onClick={async () => {
                        try {
                            dispatch({
                                type: STORE_TYPE_APP_STATE,
                                app_backdrop_open: true,
                                app_backdrop_content: i18next.t('Flush Cache') + ' . . .',
                            });

                            await api
                                .post('/flush-cache')
                                .then(({ data }) => {
                                    // eslint-disable-next-line prettier/prettier
                                    for (let [key, val] of Object.entries(JSON.parse(decrypt(data)).lang)) {
                                        // eslint-disable-next-line prettier/prettier
                                        i18next.addResourceBundle(key, 'translation', val.translation);
                                    }
                                    dispatch({
                                        type: STORE_TYPE_APP_FLUSH_CACHE,
                                        token: encrypt(
                                            JSON.stringify({
                                                ...JSON.parse(decrypt(token)),
                                                ...JSON.parse(decrypt(data)),
                                            })
                                        ),
                                    });
                                })
                                .catch((error) => {
                                    apiCatch(error);
                                })
                                .finally(() =>
                                    dispatch({
                                        type: STORE_TYPE_APP_STATE,
                                        app_backdrop_open: false,
                                    })
                                );
                        } catch (error) {
                            dispatch({
                                type: STORE_TYPE_APP_STATE,
                                app_backdrop_open: false,
                            });
                            apiCatch(error);
                        }
                    }}
                    children={i18next.t('Flush Cache')}
                />

                <Button
                    size="small"
                    color="warning"
                    variant="contained"
                    startIcon={<LockPersonIcon />}
                    sx={{ my: 1, mx: 1.5 }}
                    children={i18next.t('Lock Account')}
                />

                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    startIcon={<LogoutIcon />}
                    sx={{ my: 1, mx: 1.5 }}
                    onClick={async () => {
                        try {
                            dispatch({
                                type: STORE_TYPE_APP_STATE,
                                app_backdrop_open: true,
                                app_backdrop_content: i18next.t('Logout') + ' . . .',
                            });

                            await api
                                .post('/logout')
                                .then(() =>
                                    dispatch({
                                        type: STORE_TYPE_APP_LOGOUT,
                                    })
                                )
                                .catch((error) => {
                                    apiCatch(error);
                                })
                                .finally(() =>
                                    dispatch({
                                        type: STORE_TYPE_APP_STATE,
                                        app_backdrop_open: false,
                                    })
                                );
                        } catch (error) {
                            dispatch({
                                type: STORE_TYPE_APP_STATE,
                                app_backdrop_open: false,
                            });
                            apiCatch(error);
                        }
                    }}
                    children={i18next.t('Logout')}
                />
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

export default Header;
