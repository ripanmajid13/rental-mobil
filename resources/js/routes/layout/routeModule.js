import { matchPath } from 'react-router-dom';

import xsrfToken from '@configs/xsrfToken';

import { typeIsArray } from '@hooks/type';
import {
    routePageMainMenu,
    routePageModule,
    routePageNavigation,
    routePagePrivate,
} from '@routes/page';

const routeModule = () => {
    let result = [];
    const superadmin = xsrfToken().super_admin;
    const permissions = xsrfToken().permissions ?? [];
    // eslint-disable-next-line prettier/prettier
    const routePage = routePageMainMenu.concat(routePageNavigation, routePagePrivate);

    routePageModule.map((val) => {
        let path = [];
        routePage.map((valPage) => {
            if (valPage.items) {
                valPage.items.map((valPage2) => {
                    if (valPage2.items) {
                        valPage2.items.map((valPage3) => {
                            // eslint-disable-next-line prettier/prettier
                            if (valPage3.module && typeIsArray(valPage3.module) && valPage3.module.some(v3ms => v3ms === val.key)) {
                                if (valPage3.component) {
                                    const setPermissionLevel3 = permissions.some((psv3) =>
                                        // eslint-disable-next-line prettier/prettier
                                        matchPath(psv3.uri, valPage.path + '-' + valPage2.path + '-' + valPage3.path)
                                    );
                                    if (superadmin || setPermissionLevel3) {
                                        // eslint-disable-next-line prettier/prettier
                                        path.push(`${valPage.path}-${valPage2.path}-${valPage3.path}`);
                                    }
                                }
                            }
                        });
                    } else {
                        // eslint-disable-next-line prettier/prettier
                        if (valPage2.module && typeIsArray(valPage2.module) && valPage2.module.some(v2ms => v2ms === val.key)) {
                            if (valPage2.component) {
                                const setPermissionLevel2 = permissions.some((psv2) =>
                                    matchPath(psv2.uri, valPage.path + '-' + valPage2.path)
                                );
                                if (superadmin || setPermissionLevel2) {
                                    path.push(`${valPage.path}-${valPage2.path}`);
                                }
                            }
                        }
                    }
                });
            }
        });
        if (path.length > 0) {
            result.push({ ...val, dev: false });
        } else if (superadmin) {
            result.push({ ...val, dev: true });
        }
    });

    return result.sort((a, b) => a.display.localeCompare(b.display));
};

export default routeModule;
