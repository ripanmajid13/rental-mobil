import React from 'react';
import PropTypes from 'prop-types';

import { Drawer } from '@mui/material';

import color from '@configs/color';

import Main from './Main';

const Sidebar = ({ window, drawerDesktop, drawerMobile, setDrawerMobile }) => {
    return (
        <>
            {/* mobile */}
            <Drawer
                sx={{
                    width: 260,
                    flexShrink: 0,
                    display: {
                        xs: 'block',
                        md: 'none',
                    },
                    '& .MuiDrawer-paper': {
                        width: 260,
                        boxSizing: 'border-box',
                        borderRight: 0,
                        position: 'fixed',
                        backgroundColor: color.primary200,
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
                container={window !== undefined ? () => window().document.body : undefined}
                variant="temporary"
                anchor="left"
                open={drawerMobile}
                onClose={() => setDrawerMobile(!drawerMobile)}
                children={<Main />}
            />

            {/* desktop */}
            <Drawer
                sx={{
                    width: 260,
                    flexShrink: 0,
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                    '& .MuiDrawer-paper': {
                        width: 260,
                        boxSizing: 'border-box',
                        borderRight: 0,
                        position: 'fixed',
                        backgroundColor: color.primary200,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerDesktop}
                children={<Main />}
            />
        </>
    );
};

Sidebar.propTypes = {
    window: PropTypes.func,
    drawerDesktop: PropTypes.bool.isRequired,
    drawerMobile: PropTypes.bool.isRequired,
    setDrawerMobile: PropTypes.func.isRequired,
};

export default Sidebar;
