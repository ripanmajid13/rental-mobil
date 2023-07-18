import React from 'react';
import PropTypes from 'prop-types';

import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

const HeaderDrawer = ({ drawerMobile, setDrawerMobile, drawerDesktop, setDrawerDesktop }) => {
    return (
        <Box>
            <IconButton
                onClick={() =>
                    window.innerWidth < 900
                        ? setDrawerMobile(!drawerMobile)
                        : setDrawerDesktop(!drawerDesktop)
                }
                edge="start"
                children={<MenuIcon />}
            />
        </Box>
    );
};

HeaderDrawer.propTypes = {
    drawerMobile: PropTypes.bool.isRequired,
    setDrawerMobile: PropTypes.func.isRequired,
    drawerDesktop: PropTypes.bool.isRequired,
    setDrawerDesktop: PropTypes.func.isRequired,
};

export default HeaderDrawer;
