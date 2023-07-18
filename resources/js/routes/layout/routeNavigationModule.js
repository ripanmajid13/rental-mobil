import { matchPath } from 'react-router-dom';

import xsrfToken from '@configs/xsrfToken';

import { typeIsArray, typeIsString } from '@hooks/type';
import {
    routePageMainMenu,
    routePageModuleNavigation,
    routePageNavigation,
    routePagePrivate,
} from '@routes/page';

const routeNavigationModule = () => {
    const routes = routePageMainMenu.concat(routePageNavigation, routePagePrivate);
    const module = xsrfToken().module;
    const superadmin = xsrfToken().super_admin;
    const permissions = xsrfToken().permissions ?? [];

    return routePageModuleNavigation.map((rParent) => ({
        name: rParent.display,
        icon: rParent.icon,
        items: routes
            .filter((rf) => typeIsArray(rf.items))
            .map((rTitle) =>
                rTitle.items
                    .map((rNav) => {
                        const rNavPath = rTitle.path + '-' + rNav.path;
                        // eslint-disable-next-line prettier/prettier
                        const rNavSome = permissions.some((ps) => matchPath(ps.uri, rNavPath));
                        // eslint-disable-next-line prettier/prettier
                        const rNavFilter = permissions.filter((ps) => matchPath(ps.uri, rNavPath));

                        if (typeIsArray(rNav.items)) {
                            return {
                                ...rNav,
                                items: rNav.items
                                    .map((rSub) => {
                                        const rSubPath = rNavPath + '-' + rSub.path;
                                        // eslint-disable-next-line prettier/prettier
                                        const rSubSome = permissions.some((ps) => matchPath(ps.uri, rSubPath));
                                        // eslint-disable-next-line prettier/prettier
                                        const rSubFilter = permissions.filter((ps) => matchPath(ps.uri, rSubPath));

                                        // eslint-disable-next-line prettier/prettier
                                        if (rSub.component && (rSub.public === true || superadmin === true || rSubSome === true) && typeIsArray(rSub.module) && rSub.module.some(rms => rms === module) && typeIsString(rSub.navigation) && rSub.navigation === rParent.key) {
                                            return {
                                                dev: !rSubSome,
                                                // eslint-disable-next-line prettier/prettier
                                                name: rSubSome ? 'module-pathname-' + rSubFilter[0].name : rSub.name,
                                                path: rSubPath,
                                                icon: rSub.icon,
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
                                                              if (rSubAction.component && (rSubAction.public === true || superadmin === true || rSubActionSome === true) && typeIsArray(rSubAction.module) && rSubAction.module.some(rms => rms === module) && typeIsString(rSubAction.navigation) && rSubAction.navigation === rParent.key) {
                                                                  return {
                                                                      dev: !rSubActionSome,
                                                                      // eslint-disable-next-line prettier/prettier
                                                                    name: rSubActionSome ? 'module-pathname-' + rSubActionFilter[0].name : rNav.name,
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
                            if (rNav.component && (rNav.public === true || superadmin === true || rNavSome === true) && typeIsArray(rNav.module) && rNav.module.some(rms => rms === module) && typeIsString(rNav.navigation) && rNav.navigation === rParent.key) {
                                return {
                                    dev: !rNavSome,
                                    // eslint-disable-next-line prettier/prettier
                                    name: rNavSome ? 'module-pathname-' + rNavFilter[0].name : rNav.name,
                                    path: rNavPath,
                                    icon: rNav.icon,
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
                                                  if (rNavAction.component && (rNavAction.public === true || superadmin === true || rNavActionSome === true) && typeIsArray(rNavAction.module) && rNavAction.module.some(rms => rms === module) && typeIsString(rNavAction.navigation) && rNavAction.navigation === rParent.key) {
                                                      return {
                                                          dev: !rNavActionSome,
                                                          // eslint-disable-next-line prettier/prettier
                                                          name: rNavActionSome ? 'module-pathname-' + rNavActionFilter[0].name : rNav.name,
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
                    .filter(
                        (rfNav) =>
                            rfNav !== undefined &&
                            (typeIsArray(rfNav.items) ? rfNav.items.length > 0 : true)
                    )
            )
            .flat()
            .filter((rfTitle) => rfTitle !== undefined),
    }));
};

export default routeNavigationModule;
