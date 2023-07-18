import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { APP_MODULE } from '@configs/app';

import { routeLayoutPage, routeLayoutPageModule } from '@routes/layout';
import Error404 from '@views/errors/Error404';

const ContentRouter = ({ app_module }) => {
    return (
        <Routes>
            {(APP_MODULE === true ? routeLayoutPageModule(app_module) : routeLayoutPage()).map(
                (val, key) => (
                    <Route
                        key={key}
                        path={val.path}
                        name={val.name}
                        element={<val.element uri={val.path} />}
                    />
                )
            )}
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

ContentRouter.propTypes = {
    app_module: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => {
    return {
        app_module: app.app_module,
    };
};

export default connect(mapStateToProps, null)(ContentRouter);
