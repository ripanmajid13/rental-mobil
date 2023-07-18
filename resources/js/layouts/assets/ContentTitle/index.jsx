import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import i18next from 'i18next';

import { Typography } from '@mui/material';

import { APP_MODULE } from '@configs/app';
import xsrfToken from '@configs/xsrfToken';

import { routeLayoutPage, routeLayoutPageModule } from '@routes/layout';

const ContentTitle = ({ app_module }) => {
    let result = 'Page Not Found';
    const location = useLocation();

    const permissions = xsrfToken().permissions ?? [];
    const title = permissions.filter((ups) => matchPath(ups.uri, location.pathname));

    if (APP_MODULE === true) {
        if (title.length < 1) {
            // development
            // eslint-disable-next-line prettier/prettier
            result = routeLayoutPage().filter((routerSome) => matchPath(routerSome.path, location.pathname))[0]?.name ?? result;
        } else {
            // eslint-disable-next-line prettier/prettier
            if (routeLayoutPageModule(app_module).some((routerSome) => matchPath(routerSome.path, location.pathname))) {
                result = 'module-pathname-' + title[0].name;
            }
        }
    } else {
        if (title.length < 1) {
            // development
            // eslint-disable-next-line prettier/prettier
            result = routeLayoutPage().filter((routerSome) => matchPath(routerSome.path, location.pathname))[0]?.name ?? result;
        } else {
            result = 'pathname-' + title[0].name;
        }
    }

    return (
        <Typography
            variant="h5"
            gutterBottom
            sx={{ px: '1.5rem', mb: 0 }}
            children={i18next.t(result)}
        />
    );
};

ContentTitle.propTypes = {
    app_module: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => {
    return {
        app_module: app.app_module,
    };
};

export default connect(mapStateToProps, null)(ContentTitle);
