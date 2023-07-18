import { matchPath } from 'react-router-dom';

import xsrfToken from '@configs/xsrfToken';

import { typeIsArray } from '@hooks/type';
import {
    routePageMainMenu,
    routePageNavigation,
    routePagePrivate,
    routePageSetting,
} from '@routes/page';

const routePageModule = (module) => {
    // eslint-disable-next-line prettier/prettier
    const routes = routePageMainMenu.concat(routePageNavigation, routePagePrivate, routePageSetting);
    const superadmin = xsrfToken().super_admin;
    const permissions = xsrfToken().permissions ?? [];

    return routes
        .filter((rf) => typeIsArray(rf.items))
        .map((rTitle) => {
            return rTitle.items.map((rNav) => {
                const rNavPath = rTitle.path + '-' + rNav.path;
                const rNavName = rTitle.name + ' ' + rNav.name;
                // eslint-disable-next-line prettier/prettier
                const rNavSome = permissions.some((ps) => matchPath(ps.uri, rNavPath));
                if (typeIsArray(rNav.items)) {
                    return rNav.items.map((rSub) => {
                        const rSubPath = rNavPath + '-' + rSub.path;
                        const rSubName = rNavName + ' ' + rSub.name;
                        // eslint-disable-next-line prettier/prettier
                        const rSubSome = permissions.some((ps) => matchPath(ps.uri, rSubPath));
                        // eslint-disable-next-line prettier/prettier
                        if (rSub.component && (rSub.public === true || superadmin === true || rSubSome === true) && typeIsArray(rSub.module) && rSub.module.some(rms => rms === module)) {
                            // eslint-disable-next-line prettier/prettier
                            return [{ path: rSubPath, name: rSubName, element: rSub.component }].concat(
                                typeIsArray(rSub.actions)
                                    ? rSub.actions.map((rSubAction) => {
                                          // eslint-disable-next-line prettier/prettier
                                          const rSubActionPath = rSubPath + '/' + rSubAction.path;
                                          // eslint-disable-next-line prettier/prettier
                                          const rSubActionName = rSubName + ' ' + rSubAction.name;
                                          // eslint-disable-next-line prettier/prettier
                                          const rSubActionSome = permissions.some((ps) => matchPath(ps.uri, rSubActionPath));
                                          // eslint-disable-next-line prettier/prettier
                                          if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true) && typeIsArray(rSubAction.module) && rSubAction.module.some(rms => rms === module)) {
                                              return {
                                                  path: rSubActionPath,
                                                  name: rSubActionName,
                                                  element: rSubAction.component,
                                              };
                                          }
                                      })
                                    : undefined
                            );
                        }
                    });
                } else {
                    // eslint-disable-next-line prettier/prettier
                    if (rNav.component && (rNav.public === true || superadmin === true || rNavSome === true) && typeIsArray(rNav.module) && rNav.module.some(rms => rms === module)) {
                        // eslint-disable-next-line prettier/prettier
                        return [{ path: rNavPath, name: rNavName, element: rNav.component }].concat(
                            typeIsArray(rNav.actions)
                                ? rNav.actions.map((rNavAction) => {
                                      const rNavActionPath = rNavPath + '/' + rNavAction.path;
                                      const rNavActionName = rNavName + ' ' + rNavAction.name;
                                      // eslint-disable-next-line prettier/prettier
                                      const rNavActionSome = permissions.some((ps) => matchPath(ps.uri, rNavActionPath));
                                      // eslint-disable-next-line prettier/prettier
                                      if (rNavAction.component && (rNavAction.public === true || superadmin === true || rNavActionSome === true) && typeIsArray(rNavAction.module) && rNavAction.module.some(rms => rms === module)) {
                                          return {
                                              path: rNavActionPath,
                                              name: rNavActionName,
                                              element: rNavAction.component,
                                          };
                                      }
                                  })
                                : undefined
                        );
                    }
                }
            });
        })
        .flat(3)
        .filter((rResult) => rResult !== undefined)
        .sort((a, b) => a.path.localeCompare(b.path));
};

export default routePageModule;
