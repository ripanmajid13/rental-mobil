import React from 'react';
import PropTypes from 'prop-types';

import { Box, Container } from '@mui/material';

import ContentBreadcrumb from '@layouts/assets/ContentBreadcrumb';
import ContentRouter from '@layouts/assets/ContentRouter';
import ContentTitle from '@layouts/assets/ContentTitle';
import Footer from '@layouts/assets/Footer';

const Content = ({ drawerDesktop }) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                position: 'relative',
                marginTop: '96px',
                marginLeft: '-260px',
                transition: (theme) =>
                    theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                ...(drawerDesktop && {
                    transition: (theme) =>
                        theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    width: { md: 'calc(100% - 260px)' },
                    marginLeft: { md: 0 },
                }),
            }}>
            <ContentTitle />

            <ContentBreadcrumb />

            <Container
                maxWidth="xl"
                sx={{
                    pt: '.75rem',
                    pb: '24px',
                    minHeight: 'calc(100% - 95.7px)',
                }}>
                <ContentRouter />
            </Container>

            <Footer />
        </Box>
    );
};

Content.propTypes = {
    drawerDesktop: PropTypes.bool.isRequired,
};

export default Content;
