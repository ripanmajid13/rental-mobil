import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Box, Toolbar } from '@mui/material';

import color from '@configs/color';

import HeaderRight from '@layouts/assets/HeaderRight';

import HeaderDrawer from './HeaderDrawer';

const Header = ({ drawerMobile, setDrawerMobile, drawerDesktop, setDrawerDesktop }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                height: '56px',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                paddingRight: '1.5rem',
                paddingLeft: '1.5rem',
                transition: (theme) =>
                    theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                ...(drawerDesktop && {
                    width: {
                        md: 'calc(100% - 260px)',
                    },
                    marginLeft: {
                        md: '260px',
                    },
                    transition: (theme) =>
                        theme.transitions.create(['margin', 'width'], {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                }),
                '&::after': {
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    width: '100%',
                    content: '""',
                    position: 'absolute',
                    backdropFilter: 'blur(10px)',
                    height: 'calc(56px + 1rem)',
                    // eslint-disable-next-line prettier/prettier
                    WebkitMask: 'linear-gradient(rgb(248, 247, 250), rgb(248, 247, 250) 18%, transparent 100%)',
                    // eslint-disable-next-line prettier/prettier
                    background: 'linear-gradient(rgba(248, 247, 250, 0.7) 44%, rgba(248, 247, 250, 0.43) 73%, rgba(248, 247, 250, 0))',
                },
            }}>
            <Toolbar
                sx={{
                    marginTop: '1rem',
                    minHeight: '56px !important',
                    borderRadius: '6px',
                    backdropFilter: 'blur(6px)',
                    backgroundColor: color.bg300,
                    // eslint-disable-next-line prettier/prettier
                    boxShadow: 'rgb(51 48 60 / 3%) 0px 2px 7px 1px, rgb(51 48 60 / 2%) 0px 4px 7px 0px, rgb(51 48 60 / 1%) 0px 1px 4px 2px',
                }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <HeaderDrawer
                        drawerMobile={drawerMobile}
                        setDrawerMobile={setDrawerMobile}
                        drawerDesktop={drawerDesktop}
                        setDrawerDesktop={setDrawerDesktop}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <HeaderRight />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    drawerMobile: PropTypes.bool.isRequired,
    setDrawerMobile: PropTypes.func.isRequired,
    drawerDesktop: PropTypes.bool.isRequired,
    setDrawerDesktop: PropTypes.func.isRequired,
};

export default Header;
