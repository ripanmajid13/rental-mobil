import { matchPath, useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import method from '@configs/method';
import xsrfToken from '@configs/xsrfToken';

import { typeIsArray, typeIsBoolean, typeIsFunction, typeIsObject } from '@hooks/type';

import color from './assets/color';
import disabled from './assets/disabled';
import display from './assets/display';
import icon from './assets/icon';
import pathname from './assets/pathname';
import permission from './assets/permission';
import title from './assets/title';
import url from './assets/url';

const action = (buttons, actions, uri, selectedRow, reloadRow, columns, filter) => {
    let navigate = useNavigate();

    for (let [key, val] of Object.entries(actions)) {
        if (typeIsObject(val) === true) {
            if (permission(url(val.uri ?? uri, key, val)) === true) {
                buttons.push({
                    color: color(url(val.uri ?? uri, key, val), val),
                    disabled: disabled(val, selectedRow),
                    startIcon: icon(url(val.uri ?? uri, key, val), val),
                    invisible: xsrfToken().permissions.some((ups) =>
                        matchPath(ups.uri, Object.values(url(val.uri ?? uri, key, val)).join('/'))
                    ),
                    children: i18next.t(display(key, val)),
                    // eslint-disable-next-line prettier/prettier
                    onClick: () => {
                        if (typeIsFunction(val.fn)) {
                            return val.fn({
                                reloadRow: () => reloadRow(),
                                ...(val.dialog === true
                                    ? {
                                          open: true,
                                          width: val.dialogWidth ?? 'xs',
                                          text: val.dialogText ?? '',
                                          // eslint-disable-next-line prettier/prettier
                                          title: val.dialogTitle ?? title(url(val.uri ?? uri, key, val), key, val),
                                          ...((val.dialogDownloadFile || val.dialogPrintFile) && {
                                              titlefile:
                                                  val.dialogDownloadFile || val.dialogPrintFile,
                                          }),
                                          // eslint-disable-next-line prettier/prettier
                                          method: val.dialogEdit === true ? method[1] : (val.dialogDestroy === true ? method[2] : method[0]),
                                          // eslint-disable-next-line prettier/prettier
                                          type: val.dialogEdit === true ? 'edit' : (val.dialogDestroy === true ? 'destroy' : 'create'),
                                          state:
                                              val.dialogEdit === true
                                                  ? val.data === true
                                                      ? val.dataMultiple === true
                                                          ? selectedRow
                                                          : selectedRow[0]
                                                      : {}
                                                  : {},
                                          // eslint-disable-next-line prettier/prettier
                                          repeat: typeIsBoolean(val.dialogRepeat) ? val.dialogRepeat : false,
                                          ...(val.dialogLoading === true && {
                                              uri: val.dialogLoadingUri ?? uri,
                                              params: (val.dialogLoadingParams &&
                                              typeIsArray(val.dialogLoadingParams) &&
                                              val.dialogLoadingParams.length > 0
                                                  ? val.dialogLoadingParams.map((par) =>
                                                        typeIsObject(par)
                                                            ? `${Object.values(par)}`
                                                            : selectedRow.length < 1
                                                            ? ''
                                                            : selectedRow[0][par] ?? ''
                                                    )
                                                  : val.params &&
                                                    typeIsArray(val.params) &&
                                                    val.params.length > 0
                                                  ? val.params.map((par) =>
                                                        typeIsObject(par)
                                                            ? `${Object.values(par)}`
                                                            : selectedRow.length < 1
                                                            ? ''
                                                            : selectedRow[0][par] ?? ''
                                                    )
                                                  : []
                                              ).join('/'),
                                              action:
                                                  '/' +
                                                  (val.dialogLoadingAction ?? key)
                                                      .toString()
                                                      .replace(/([A-Z])/g, '_$1')
                                                      .toLowerCase()
                                                      .split('_')
                                                      .join('-'),
                                          }),
                                          pathname: pathname(val.uri ?? uri, key, val, selectedRow),
                                          payload: {
                                              ...((val.dialogDownload === true ||
                                                  val.dialogPrint === true) && {
                                                  datatable_column: columns.map((val) => ({
                                                      column: val.accessor,
                                                      display: i18next.t(val.Header),
                                                  })),
                                                  datatable_filter: JSON.parse(filter()).map(
                                                      (val) => ({
                                                          ...val,
                                                          display: i18next.t(
                                                              columns.filter(
                                                                  (col) => col.accessor === val.key
                                                              )[0].Header
                                                          ),
                                                      })
                                                  ),
                                              }),
                                              ...(val.payload ?? {}),
                                              ...(val.dialogDataRow === true &&
                                                  val.data === true &&
                                                  (val.dataMultiple === true
                                                      ? {
                                                            datarow: selectedRow,
                                                        }
                                                      : {
                                                            ...selectedRow[0],
                                                        })),
                                          },
                                      }
                                    : {}),
                            });
                        } else {
                            navigate(pathname(val.uri ?? uri, key, val, selectedRow), {
                                replace: true,
                                ...(selectedRow.length > 0 && {
                                    state: selectedRow[0],
                                }),
                            });
                        }
                    },
                });
            }
        } else if (typeIsBoolean(val) === true && val === true) {
            if (permission(url(val.uri ?? uri, key, val)) === true) {
                buttons.push({
                    color: color(url(val.uri ?? uri, key, val), val),
                    disabled: disabled(val, selectedRow),
                    startIcon: icon(url(val.uri ?? uri, key, val), val),
                    invisible: xsrfToken().permissions.some((ups) =>
                        matchPath(ups.uri, Object.values(url(val.uri ?? uri, key, val)).join('/'))
                    ),
                    children: i18next.t(display(key, val)),
                    // eslint-disable-next-line prettier/prettier
                    onClick: () => {
                        navigate(pathname(val.uri ?? uri, key, val, selectedRow), {
                            replace: true,
                            ...(selectedRow.length > 0 && {
                                state: selectedRow[0],
                            }),
                        });
                    },
                });
            }
        }
    }
};

export default action;
