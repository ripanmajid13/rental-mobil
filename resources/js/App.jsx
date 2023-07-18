import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Backdrop, CircularProgress, CssBaseline, Typography } from '@mui/material';

import { APP_LAYOUT, APP_MODULE as CONFIG_APP_MODULE } from '@configs/app';
import moduleDashboard from '@configs/moduleDashboard';

import { routeLayoutNavigationModule } from '@routes/layout';
import ForgotPassword from '@views/auth/ForgotPassword';
import Login from '@views/auth/Login';
import Register from '@views/auth/Register';
import ResetPassword from '@views/auth/ResetPassword';

import { HorizontalLayout, ModuleLayout, VerticalLayout } from './layouts';

// eslint-disable-next-line prettier/prettier
const App = ({ app_auth, app_module, app_backdrop_open, app_backdrop_progress, app_backdrop_content }) => {
    const [logged, setLogged] = useState(app_auth);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setLogged(app_auth);
        }
        return () => (mounted = false);
    }, [app_auth]);

    const handleFirstLoadModule = () => {
        if (moduleDashboard.some((mds) => mds.key === app_module)) {
            if (moduleDashboard.filter((mds) => mds.key === app_module)[0].dashboard.length < 1) {
                let resultHome = '/dashboard';

                routeLayoutNavigationModule().map((val, key) => {
                    if (key === 0) {
                        val.items.map((val2, key2) => {
                            if (key2 === 0) {
                                if (val2.items) {
                                    resultHome = val2.items[0].path;
                                } else {
                                    resultHome = val2.path;
                                }
                            }
                        });
                    }
                });

                return resultHome;
            } else {
                return moduleDashboard.filter((mds) => mds.key === app_module)[0].dashboard;
            }
        } else {
            return '/dashboard';
        }
    };

    return (
        <>
            <CssBaseline />

            {app_backdrop_open === true && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        flexDirection: 'column',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={app_backdrop_open}>
                    {app_backdrop_progress.length < 1 && <CircularProgress color="inherit" />}
                    <Typography
                        variant="h4"
                        gutterBottom
                        component="div"
                        sx={{ marginBottom: 0 }}
                        children={app_backdrop_content}
                    />
                </Backdrop>
            )}

            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            logged === true ? (
                                CONFIG_APP_MODULE === true ? (
                                    app_module.length < 1 ? (
                                        <ModuleLayout />
                                    ) : (
                                        <Navigate to={handleFirstLoadModule()} replace={true} />
                                    )
                                ) : (
                                    <Navigate to="/main-menu-manajemen-mobil" replace={true} />
                                )
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            logged === true ? (
                                CONFIG_APP_MODULE === true ? (
                                    app_module.length < 1 ? (
                                        <ModuleLayout />
                                    ) : (
                                        <Navigate to={handleFirstLoadModule()} replace={true} />
                                    )
                                ) : (
                                    <Navigate to="/main-menu-manajemen-mobil" replace={true} />
                                )
                            ) : (
                                <ForgotPassword />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            logged === true ? (
                                CONFIG_APP_MODULE === true ? (
                                    app_module.length < 1 ? (
                                        <ModuleLayout />
                                    ) : (
                                        <Navigate to={handleFirstLoadModule()} replace={true} />
                                    )
                                ) : (
                                    <Navigate to="/main-menu-manajemen-mobil" replace={true} />
                                )
                            ) : (
                                <Register />
                            )
                        }
                    />
                    <Route
                        path="/reset-password/:token"
                        element={
                            logged === true ? (
                                CONFIG_APP_MODULE === true ? (
                                    app_module.length < 1 ? (
                                        <ModuleLayout />
                                    ) : (
                                        <Navigate to={handleFirstLoadModule()} replace={true} />
                                    )
                                ) : (
                                    <Navigate to="/main-menu-manajemen-mobil" replace={true} />
                                )
                            ) : (
                                <ResetPassword />
                            )
                        }
                    />
                    <Route
                        path="*"
                        element={
                            logged === true ? (
                                CONFIG_APP_MODULE === true ? (
                                    app_module.length < 1 ? (
                                        <Navigate to="/" replace={true} />
                                    ) : APP_LAYOUT === 'HORIZONTAL' ? (
                                        <HorizontalLayout />
                                    ) : (
                                        <VerticalLayout />
                                    )
                                ) : APP_LAYOUT === 'HORIZONTAL' ? (
                                    <HorizontalLayout />
                                ) : (
                                    <VerticalLayout />
                                )
                            ) : (
                                <Navigate to="/" replace={true} />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const mapStateToProps = ({ app }) => {
    return {
        app_auth: app.app_auth,
        app_module: app.app_module,
        app_backdrop_open: app.app_backdrop_open,
        app_backdrop_content: app.app_backdrop_content,
        app_backdrop_progress: app.app_backdrop_progress,
    };
};

App.propTypes = {
    app_auth: PropTypes.bool.isRequired,
    app_module: PropTypes.string.isRequired,
    app_backdrop_open: PropTypes.bool.isRequired,
    app_backdrop_content: PropTypes.string.isRequired,
    app_backdrop_progress: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(App);
