import React from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import HomeIcon from '@mui/icons-material/Home';

import xsrfToken from '@configs/xsrfToken';

import { typeIsArray } from '@hooks/type';
import {
    routePageMainMenu,
    routePageModule,
    routePageNavigation,
    routePagePrivate,
    routePageSetting,
} from '@routes/page';

import BreadcrumbLink from './BreadcrumbLink';
import BreadcrumbText from './BreadcrumbText';

const routeBreadcrumbModule = (module) => {
    const location = useLocation();
    const navigate = useNavigate();
    const superadmin = xsrfToken().super_admin;
    const permissions = xsrfToken().permissions ?? [];
    // eslint-disable-next-line prettier/prettier
    const routes = routePageMainMenu.concat(routePageNavigation, routePagePrivate, routePageSetting)
        .filter((rf) => typeIsArray(rf.items))
        .map((rTitle) => {
            return rTitle.items.map((rNav) => {
                const rNavPath = rTitle.path + '-' + rNav.path;
                // eslint-disable-next-line prettier/prettier
                const rNavSome = permissions.some((ps) => matchPath(ps.uri, rNavPath));
                // eslint-disable-next-line prettier/prettier
                const rNavFilter = permissions.filter((ps) => matchPath(ps.uri, rNavPath));

                if (typeIsArray(rNav.items)) {
                    return rNav.items.map((rSub) => {
                        const rSubPath = rNavPath + '-' + rSub.path;
                        // eslint-disable-next-line prettier/prettier
                        const rSubSome = permissions.some((ps) => matchPath(ps.uri, rSubPath));
                        // eslint-disable-next-line prettier/prettier
                        const rSubFilter = permissions.filter((ps) => matchPath(ps.uri, rSubPath));
                        // eslint-disable-next-line prettier/prettier
                        if (rSub.component && (rSub.public === true || superadmin === true || rSubSome === true)) {
                            // eslint-disable-next-line prettier/prettier
                            if (matchPath(rSubPath, location.pathname) !== null && typeIsArray(rSub.module) && rSub.module.some(rms => rms === module)) {
                                return [
                                    <BreadcrumbText key={0}>
                                        <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
                                        {i18next.t(rTitle.name)}
                                    </BreadcrumbText>,
                                    <BreadcrumbText key={1}>{i18next.t(rNav.name)}</BreadcrumbText>,
                                    <BreadcrumbText key={2}>
                                        {i18next.t(
                                            rSubSome === true
                                                ? 'pathname-' + rSubFilter[0].name
                                                : rSub.name
                                        )}
                                    </BreadcrumbText>,
                                ];
                            }

                            if (typeIsArray(rSub.actions)) {
                                return rSub.actions.map((rSubAction) => {
                                    const rSubActionPath = rSubPath + '/' + rSubAction.path;
                                    // eslint-disable-next-line prettier/prettier
                                    const rSubActionSome = permissions.some((ps) => matchPath(ps.uri, rSubActionPath));
                                    // eslint-disable-next-line prettier/prettier
                                    const rSubActionFilter = permissions.filter((ps) => matchPath(ps.uri, rSubActionPath));
                                    // eslint-disable-next-line prettier/prettier
                                    if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true) && matchPath(rSubActionPath, location.pathname) !== null && typeIsArray(rSubAction.module) && rSubAction.module.some(rms => rms === module)) {
                                        return [
                                            <BreadcrumbText key={0}>
                                                <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
                                                {i18next.t(rTitle.name)}
                                            </BreadcrumbText>,
                                            <BreadcrumbText key={1}>
                                                {i18next.t(rNav.name)}
                                            </BreadcrumbText>,
                                            <BreadcrumbLink
                                                key={2}
                                                href={rSubPath}
                                                navigate={navigate}>
                                                {i18next.t(
                                                    rSubSome === true
                                                        ? 'pathname-' + rSubFilter[0].name
                                                        : rSub.name
                                                )}
                                            </BreadcrumbLink>,
                                            <BreadcrumbText key={2}>
                                                {i18next.t(
                                                    rSubActionSome === true
                                                        ? 'pathname-' + rSubActionFilter[0].name
                                                        : rSubAction.name
                                                )}
                                            </BreadcrumbText>,
                                        ];
                                    }
                                });
                            }
                        }
                    });
                } else {
                    // eslint-disable-next-line prettier/prettier
                    if (rNav.component && (rNav.public === true || superadmin === true || rNavSome === true)) {
                        // eslint-disable-next-line prettier/prettier
                        if (matchPath(rNavPath, location.pathname) !== null && typeIsArray(rNav.module) && rNav.module.some(rms => rms === module)) {
                            return [
                                <BreadcrumbText key={0}>
                                    <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
                                    {i18next.t(rTitle.name)}
                                </BreadcrumbText>,
                                <BreadcrumbText key={1}>
                                    {i18next.t(
                                        rNavSome === true
                                            ? 'pathname-' + rNavFilter[0].name
                                            : rNav.name
                                    )}
                                </BreadcrumbText>,
                            ];
                        }

                        if (typeIsArray(rNav.actions)) {
                            return rNav.actions.map((rNavAction) => {
                                const rNavActionPath = rNavPath + '/' + rNavAction.path;
                                // eslint-disable-next-line prettier/prettier
                                const rNavActionSome = permissions.some((ps) => matchPath(ps.uri, rNavActionPath));
                                // eslint-disable-next-line prettier/prettier
                                 const rNavActionFilter = permissions.filter((ps) => matchPath(ps.uri, rNavActionPath));
                                // eslint-disable-next-line prettier/prettier
                                if (rNavAction.component && (rNavAction.public === true || superadmin === true || rNavActionSome === true) && matchPath(rNavActionPath, location.pathname) !== null && typeIsArray(rNavAction.module) && rNavAction.module.some(rms => rms === module)) {
                                    return [
                                        <BreadcrumbText key={0}>
                                            <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
                                            {i18next.t(rTitle.name)}
                                        </BreadcrumbText>,
                                        <BreadcrumbLink key={1} href={rNavPath} navigate={navigate}>
                                            {i18next.t(
                                                rNavSome === true
                                                    ? 'pathname-' + rNavFilter[0].name
                                                    : rNav.name
                                            )}
                                        </BreadcrumbLink>,
                                        <BreadcrumbText key={2}>
                                            {i18next.t(
                                                rNavActionSome === true
                                                    ? 'pathname-' + rNavActionFilter[0].name
                                                    : rNavAction.name
                                            )}
                                        </BreadcrumbText>,
                                    ];
                                }
                            });
                        }
                    }
                }
            });
        })
        .flat(3)
        .filter((rResult) => rResult !== undefined);

    return routes.length < 1
        ? [
              <BreadcrumbText key={0}>
                  <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />{' '}
                  {i18next.t(
                      routePageModule.filter((valModule) => valModule.key === module)[0].display
                  )}
              </BreadcrumbText>,
              <BreadcrumbText key={1}>{i18next.t('Page Not Found')}</BreadcrumbText>,
          ]
        : routes;
};

export default routeBreadcrumbModule;
