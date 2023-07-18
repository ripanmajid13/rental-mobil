import { matchPath } from 'react-router-dom';

import xsrfToken from '@configs/xsrfToken';

import { typeIsArray } from '@hooks/type';
import { routePageMainMenu, routePageNavigation, routePagePrivate } from '@routes/page';

const routeNavigation = () => {
    const routes = routePageMainMenu.concat(routePageNavigation, routePagePrivate);
    const superadmin = xsrfToken().super_admin;
    const permissions = xsrfToken().permissions ?? [];

    return routes
        .filter((rf) => typeIsArray(rf.items))
        .map((rTitle) => ({
            ...rTitle,
            active:
                rTitle.items
                    .map((rNav) => {
                        const rNavPath = rTitle.path + '-' + rNav.path;
                        // eslint-disable-next-line prettier/prettier
                        const rNavSome = permissions.some((ps) => matchPath(ps.uri, rNavPath));
                        if (typeIsArray(rNav.items)) {
                            return rNav.items.map((rSub) => {
                                const rSubPath = rNavPath + '-' + rSub.path;
                                // eslint-disable-next-line prettier/prettier
                                const rSubSome = permissions.some((ps) => matchPath(ps.uri, rSubPath));
                                // eslint-disable-next-line prettier/prettier
                                if (rSub.component && (rSub.public === true || superadmin === true || rSubSome === true)) {
                                    if (matchPath(rSubPath, location.pathname) !== null) {
                                        return true;
                                        // eslint-disable-next-line prettier/prettier
                                    } else if (typeIsArray(rSub.actions) && rSub.actions.length > 0) {
                                        return rSub.actions.map((rSubAction) => {
                                            // eslint-disable-next-line prettier/prettier
                                            const rSubActionPath = rSubPath + '/' + rSubAction.path;
                                            // eslint-disable-next-line prettier/prettier
                                            const rSubActionSome = permissions.some((ps) => matchPath(ps.uri, rSubActionPath));
                                            // eslint-disable-next-line prettier/prettier
                                            if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true) && matchPath(rSubActionPath, location.pathname) !== null) {
                                                return true;
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            // eslint-disable-next-line prettier/prettier
                            if (rNav.component && (rNav.public === true || superadmin === true || rNavSome === true)) {
                                if (matchPath(rNavPath, location.pathname) !== null) {
                                    return true;
                                } else if (typeIsArray(rNav.actions) && rNav.actions.length > 0) {
                                    return rNav.actions.map((rNavAction) => {
                                        // eslint-disable-next-line prettier/prettier
                                        const rNavActionPath = rNavPath + '/' + rNavAction.path;
                                        // eslint-disable-next-line prettier/prettier
                                        const rNavActionSome = permissions.some((ps) => matchPath(ps.uri, rNavActionPath));
                                        // eslint-disable-next-line prettier/prettier
                                        if (rNavAction.component && (rNavAction.public === true || superadmin === true || rNavActionSome === true) && matchPath(rNavActionPath, location.pathname) !== null) {
                                            return true;
                                        }
                                    });
                                }
                            }
                        }
                    })
                    .flat(2)
                    .filter((val) => val === true).length < 1
                    ? 'outlined'
                    : 'contained',
            items: rTitle.items
                .map((rNav) => {
                    const rNavPath = rTitle.path + '-' + rNav.path;
                    // eslint-disable-next-line prettier/prettier
                    const rNavSome = permissions.some((ps) => matchPath(ps.uri, rNavPath));
                    // eslint-disable-next-line prettier/prettier
                    const rNavFilter = permissions.filter((ps) => matchPath(ps.uri, rNavPath));

                    if (typeIsArray(rNav.items)) {
                        return {
                            ...rNav,
                            active: rNav.items
                                .map((rSub) => {
                                    const rSubPath = rNavPath + '-' + rSub.path;
                                    // eslint-disable-next-line prettier/prettier
                                const rSubSome = permissions.some((ps) => matchPath(ps.uri, rSubPath));
                                    // eslint-disable-next-line prettier/prettier
                                if (rSub.component && (rSub.public === true || superadmin === true || rSubSome === true)) {
                                        if (matchPath(rSubPath, location.pathname) !== null) {
                                            return true;
                                        } else if (typeIsArray(rNav.actions)) {
                                            return rSub.actions.map((rSubAction) => {
                                                // eslint-disable-next-line prettier/prettier
                                            const rSubActionPath = rSubPath + '/' + rSubAction.path;
                                                // eslint-disable-next-line prettier/prettier
                                            const rSubActionSome = permissions.some((ps) => matchPath(ps.uri, rSubActionPath));
                                                // eslint-disable-next-line prettier/prettier
                                            if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true) && matchPath(rSubActionPath, location.pathname) !== null) {
                                                    return true;
                                                }
                                            });
                                        }
                                    }
                                })
                                .some((actSub) => actSub === true)
                                ? 'contained'
                                : 'text',
                            items: rNav.items
                                .map((rSub) => {
                                    const rSubPath = rNavPath + '-' + rSub.path;
                                    // eslint-disable-next-line prettier/prettier
                                    const rSubSome = permissions.some((ps) => matchPath(ps.uri, rSubPath));
                                    // eslint-disable-next-line prettier/prettier
                                    const rSubFilter = permissions.filter((ps) => matchPath(ps.uri, rSubPath));

                                    // eslint-disable-next-line prettier/prettier
                                    if (rSub.component && (rSub.public === true || superadmin === true || rSubSome === true)) {
                                        return {
                                            dev: !rSubSome,
                                            // eslint-disable-next-line prettier/prettier
                                            name: rSubSome ? 'pathname-' + rSubFilter[0].name : rSub.name,
                                            path: rSubPath,
                                            icon: rSub.icon,
                                            // eslint-disable-next-line prettier/prettier
                                            active: matchPath(rSubPath, location.pathname) !== null || (typeIsArray(rNav.actions)
                                                    ? rSub.actions.map((rSubAction) => {
                                                          // eslint-disable-next-line prettier/prettier
                                                          const rSubActionPath = rSubPath + '/' + rSubAction.path;
                                                          // eslint-disable-next-line prettier/prettier
                                                          const rSubActionSome = permissions.some((ps) => matchPath(ps.uri, rSubActionPath));
                                                          // eslint-disable-next-line prettier/prettier
                                                          if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true) && matchPath(rSubActionPath, location.pathname)) {
                                                              return true;
                                                          }
                                                      })
                                                    : false)
                                                    ? 'contained'
                                                    : 'text',
                                            actions: typeIsArray(rSub.actions)
                                                ? rSub.actions
                                                      .map((rSubAction) => {
                                                          // eslint-disable-next-line prettier/prettier
                                                          const rSubActionPath = rSubPath + '/' + rSubAction.path;
                                                          // eslint-disable-next-line prettier/prettier
                                                          const rSubActionSome = permissions.some((ps) => matchPath(ps.uri, rSubActionPath));
                                                          // eslint-disable-next-line prettier/prettier
                                                          const rSubActionFilter = permissions.filter((ps) => matchPath(ps.uri, rSubActionPath));
                                                          // eslint-disable-next-line prettier/prettier
                                                          if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true)) {
                                                              return {
                                                                  dev: !rSubActionSome,
                                                                  // eslint-disable-next-line prettier/prettier
                                                                  name: rSubActionSome ? 'pathname-' + rSubActionFilter[0].name : rNav.name,
                                                                  path: rSubActionPath,
                                                              };
                                                          }
                                                      })
                                                      // eslint-disable-next-line prettier/prettier
                                                      .filter((rfSubAction) => rfSubAction !== undefined)
                                                : [],
                                        };
                                    }
                                })
                                .filter((rfSub) => rfSub !== undefined),
                        };
                    } else {
                        // eslint-disable-next-line prettier/prettier
                        if (rNav.component && (rNav.public === true || superadmin === true || rNavSome === true)) {
                            return {
                                dev: !rNavSome,
                                name: rNavSome ? 'pathname-' + rNavFilter[0].name : rNav.name,
                                path: rNavPath,
                                icon: rNav.icon,
                                // eslint-disable-next-line prettier/prettier
                                active: matchPath(rNavPath, location.pathname) !== null || (typeIsArray(rNav.actions)
                                        ? rNav.actions.some((rNavAction) => {
                                              // eslint-disable-next-line prettier/prettier
                                              const rNavActionPath = rNavPath + '/' + rNavAction.path;
                                              // eslint-disable-next-line prettier/prettier
                                              const rNavActionSome = permissions.some((ps) => matchPath(ps.uri, rNavActionPath));
                                              // eslint-disable-next-line prettier/prettier
                                              if (rNavAction.component && (rNavAction.public === true || superadmin === true || rNavActionSome === true) && matchPath(rNavActionPath, location.pathname)) {
                                                  return true;
                                              }
                                          })
                                        : false)
                                        ? 'contained'
                                        : 'text',
                                actions: typeIsArray(rNav.actions)
                                    ? rNav.actions
                                          .map((rNavAction) => {
                                              // eslint-disable-next-line prettier/prettier
                                              const rNavActionPath = rNavPath + '/' + rNavAction.path;
                                              // eslint-disable-next-line prettier/prettier
                                              const rNavActionSome = permissions.some((ps) => matchPath(ps.uri, rNavActionPath));
                                              // eslint-disable-next-line prettier/prettier
                                              const rNavActionFilter = permissions.filter((ps) => matchPath(ps.uri, rNavActionPath));
                                              // eslint-disable-next-line prettier/prettier
                                              if (rNavAction.component && (rNavAction.public === true || superadmin === true || rNavActionSome === true)) {
                                                  return {
                                                      dev: !rNavActionSome,
                                                      // eslint-disable-next-line prettier/prettier
                                                      name: rNavActionSome ? 'pathname-' + rNavActionFilter[0].name : rNav.name,
                                                      path: rNavActionPath,
                                                  };
                                              }
                                          })
                                          .filter((rfNavAction) => rfNavAction !== undefined)
                                    : [],
                            };
                        }
                    }
                })
                // eslint-disable-next-line prettier/prettier
                .filter((rfNav) => rfNav !== undefined && (typeIsArray(rfNav.items) ? rfNav.items.length > 0 : true)),
        }))
        .filter((rfTitle) => rfTitle.items.length > 0);
};

export default routeNavigation;
