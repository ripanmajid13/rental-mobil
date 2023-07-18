import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import {
    Cached as CachedIcon,
    LockPerson as LockPersonIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';

import api from '@configs/api';
import apiCatch from '@configs/apiCatch';
import color from '@configs/color';
import { decrypt, encrypt } from '@configs/crypto';
import xsrfToken from '@configs/xsrfToken';

import {
    STORE_TYPE_APP_FLUSH_CACHE,
    STORE_TYPE_APP_LOGOUT,
    STORE_TYPE_APP_STATE,
} from '@store/type/app';

import UserImage from './UserImage';
import UserTitle from './UserTitle';

const User = ({ dispatch, token }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <>
            <IconButton
                size="small"
                sx={{ ml: 2 }}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                children={<UserImage name={xsrfToken().name ?? ''} />}
            />

            <Menu
                anchorEl={anchorEl}
                id="user-menu"
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        mt: '7px',
                        ml: '-5px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        '& .MuiAvatar-root': {
                            width: 40,
                            height: 40,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        '& .MuiList-root': {
                            p: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem
                    sx={{ px: 1, display: 'flex', alignItems: 'center' }}
                    onClick={() =>
                        navigate('/setting-profile', {
                            replace: true,
                        })
                    }>
                    <UserImage name={xsrfToken().name ?? ''} />

                    <UserTitle name={xsrfToken().name ?? ''} email={xsrfToken().email ?? ''} />
                </MenuItem>

                <Divider sx={{ borderColor: color.text200 }} />

                <MenuItem
                    sx={{ px: 1 }}
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
                    }}>
                    <ListItemIcon>
                        <CachedIcon fontSize="small" />
                    </ListItemIcon>
                    {i18next.t('Flush Cache')}
                </MenuItem>

                <MenuItem sx={{ px: 1 }} onClick={() => {}}>
                    <ListItemIcon>
                        <LockPersonIcon fontSize="small" />
                    </ListItemIcon>
                    {i18next.t('Lock Account')}
                </MenuItem>

                <MenuItem
                    sx={{ px: 1 }}
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
                    }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    {i18next.t('Logout')}
                </MenuItem>
            </Menu>
        </>
    );
};

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

export default User;
