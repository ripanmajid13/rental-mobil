import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    Sync as SyncIcon,
} from '@mui/icons-material';
import { Badge, Box, Button } from '@mui/material';

import method from '@configs/method';

import { RenderMap } from '@helpers/render';
import { typeIsArray, typeIsBoolean, typeIsFunction, typeIsString } from '@hooks/type';

import color from './assets/color';
import disabled from './assets/disabled';
import display from './assets/display';
import icon from './assets/icon';
import pathname from './assets/pathname';
import title from './assets/title';
import url from './assets/url';

const Header = ({
    uri,
    back,
    actions,
    actionsData,
    rowData,
    permissions,
    paginate,
    setTable,
    column,
    filter,
    setFilter,
}) => {
    const navigate = useNavigate();

    return (
        <Box>
            {typeIsString(back) && back.length > 0 && (
                <Button
                    disableElevation
                    disableTouchRipple
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                        navigate(back, {
                            replace: true,
                        })
                    }
                    sx={{
                        mr: '0.25rem',
                        mb: 1,
                        fontSize: '0.75rem',
                        textTransform: 'none',
                        '& .MuiButton-startIcon': {
                            mr: '6px',
                            '& .MuiSvgIcon-root': {
                                width: '16px',
                                height: '16px',
                            },
                        },
                    }}
                    startIcon={<ArrowBackIcon />}
                    children={i18next.t('Back')}
                />
            )}

            {typeIsArray(column) && column.length > 0 && (
                <Button
                    disableElevation
                    disableTouchRipple
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        let newFilter = [];
                        for (let [key, val] of Object.entries(filter)) {
                            if (val.value.length > 0) {
                                newFilter.push({
                                    key: key,
                                    value: val.value,
                                    type: val.type,
                                });
                            }
                        }
                        setTable((prevState) => ({
                            ...prevState,
                            // eslint-disable-next-line prettier/prettier
                            querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                            payload: {
                                ...prevState.payload,
                                page: 1,
                                table_search: newFilter,
                            },
                        }));
                    }}
                    sx={{
                        mr: '0.25rem',
                        mb: 1,
                        fontSize: '0.75rem',
                        textTransform: 'none',
                        '& .MuiButton-startIcon': {
                            mr: '6px',
                            '& .MuiSvgIcon-root': {
                                width: '16px',
                                height: '16px',
                            },
                        },
                    }}
                    startIcon={<SearchIcon fontSize="inherit" />}
                    children={i18next.t('Search')}
                />
            )}

            <Button
                disableElevation
                disableTouchRipple
                size="small"
                color="success"
                variant="contained"
                onClick={() => {
                    setFilter({});
                    setTable((prevState) => ({
                        ...prevState,
                        // eslint-disable-next-line prettier/prettier
                        querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                        payload: {
                            page: 1,
                            paginate: 10,
                        },
                    }));
                }}
                sx={{
                    mr: '0.5rem',
                    mb: 1,
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    '& .MuiButton-startIcon': {
                        mr: '6px',
                        '& .MuiSvgIcon-root': {
                            width: '16px',
                            height: '16px',
                        },
                    },
                }}
                startIcon={<SyncIcon fontSize="inherit" />}
                children={i18next.t('Reload')}
            />

            <RenderMap
                data={actions}
                render={(val, key) => (
                    <Badge
                        key={key}
                        invisible
                        // eslint-disable-next-line prettier/prettier
                        // invisible={permissions.some((ups) => matchPath(ups.uri, Object.values(url(val, actionsData[val].uri ?? uri, actionsData[val].params)).join('/')))}
                        variant="dot"
                        color="warning"
                        // eslint-disable-next-line prettier/prettier
                        anchorOrigin={{ vertical: 'top', horizontal: 'left'  }}
                        sx={{
                            // eslint-disable-next-line prettier/prettier
                            mr: Object.keys(actionsData).length === key + 1 ? 0 : '0.5rem',
                            mb: 1,
                            '& .MuiBadge-badge': {
                                animation: 'blinker 1s linear infinite',
                                '@keyframes blinker': {
                                    '50%': {
                                        opacity: 0,
                                    },
                                },
                            },
                        }}>
                        <Button
                            disableElevation
                            disableTouchRipple
                            size="small"
                            // eslint-disable-next-line prettier/prettier
                            color={color(url(val, actionsData[val].uri ?? uri, actionsData[val].params).action, actionsData[val].color)}
                            variant="contained"
                            disabled={disabled(actionsData[val], rowData)}
                            onClick={() => {
                                if (typeIsFunction(actionsData[val].fn)) {
                                    actionsData[val].fn({
                                        // eslint-disable-next-line prettier/prettier
                                        ...(typeIsBoolean(actionsData[val].dialog) && actionsData[val].dialog === true
                                            ? {
                                                  open: true,
                                                  // eslint-disable-next-line prettier/prettier
                                                  width: actionsData[val].dialogWidth ?? 'xs',
                                                  // eslint-disable-next-line prettier/prettier
                                                  ...(actionsData[val].dialogText && {
                                                      // eslint-disable-next-line prettier/prettier
                                                      text: actionsData[val].dialogText,
                                                  }),
                                                  // eslint-disable-next-line prettier/prettier
                                                  title: typeIsString(actionsData[val].dialogTitle) ? actionsData[val].dialogTitle : title(val, actionsData[val].display, Object.values(url(val, actionsData[val].uri ?? uri, actionsData[val].params)).join('/'), permissions),
                                                  // eslint-disable-next-line prettier/prettier
                                                  type: actionsData[val].dialogEdit === true ? 'edit' : (actionsData[val].dialogDestroy === true ? 'destroy' : 'create'),
                                                  // eslint-disable-next-line prettier/prettier
                                                  method: actionsData[val].dialogEdit === true ? method[1] : (actionsData[val].dialogDestroy === true ? method[2] : method[0]),
                                                  // eslint-disable-next-line prettier/prettier
                                                  repeat: typeIsBoolean(actionsData[val].dialogRepeat) ? actionsData[val].dialogRepeat : false,
                                                  // eslint-disable-next-line prettier/prettier
                                                  pathname: pathname(val, actionsData[val].uri ?? uri, actionsData[val].params, rowData.length < 1 ? {} : rowData[0]),
                                                  // eslint-disable-next-line prettier/prettier
                                                  payload: {
                                                      ...(actionsData[val].dialogPayload && {
                                                          ...actionsData[val].dialogPayload,
                                                      }),
                                                      // eslint-disable-next-line prettier/prettier
                                                      ...((actionsData[val].dialogDownload || actionsData[val].dialogPrint ) && {
                                                          datatable_column: column.map((val) => ({
                                                              column: val.accessor,
                                                              display: i18next.t(val.Header),
                                                          })),
                                                          datatable_filter: Object.keys(filter).map(
                                                              (val) => ({
                                                                  key: val,
                                                                  type: filter[val].type,
                                                                  value: filter[val].value,
                                                                  display: i18next.t(
                                                                      column.filter(
                                                                          (col) =>
                                                                              col.accessor === val
                                                                      )[0].Header
                                                                  ),
                                                              })
                                                          ),
                                                      }),
                                                  },
                                                  // eslint-disable-next-line prettier/prettier
                                                  ...(actionsData[val].dialogData === true && {
                                                      // eslint-disable-next-line prettier/prettier
                                                      data: actionsData[val].dataMultiple === true ? (rowData.length < 1 ? [] : rowData) : (rowData.length < 1 ? {} : rowData[0])
                                                  }),
                                                  // eslint-disable-next-line prettier/prettier
                                                  ...(typeIsString(actionsData[val].dialogDataServer) && actionsData[val].dialogDataServer.length > 0 && {
                                                          // eslint-disable-next-line prettier/prettier
                                                          pathnameDataServer: pathname(actionsData[val].dialogDataServer, actionsData[val].uri ?? uri, actionsData[val].params, rowData.length < 1 ? {} : rowData[0])
                                                      }),
                                                  // eslint-disable-next-line prettier/prettier
                                                  ...((actionsData[val].dialogDownloadFile || actionsData[val].dialogPrintFile) && {
                                                      // eslint-disable-next-line prettier/prettier
                                                      fileName: actionsData[val].dialogDownloadFile || actionsData[val].dialogPrintFile,
                                                  }),
                                                  // eslint-disable-next-line prettier/prettier
                                                   ...((actionsData[val].dialogDownloadTitleFile || actionsData[val].dialogPrintTitleFile) && {
                                                      // eslint-disable-next-line prettier/prettier
                                                    titleFile: actionsData[val].dialogDownloadTitleFile || actionsData[val].dialogPrintTitleFile,
                                                  }),
                                                  refetch: () =>
                                                      setTable((prevState) => ({
                                                          ...prevState,
                                                          // eslint-disable-next-line prettier/prettier
                                                          querykey: Math.random().toString(36).substring(2) + Date.now().toString(36).substring(5),
                                                          payload: {
                                                              page: 1,
                                                              paginate: paginate,
                                                          },
                                                      })),
                                              }
                                            : {}),
                                    });
                                } else {
                                    // eslint-disable-next-line prettier/prettier
                                    navigate(pathname(val, actionsData[val].uri ?? uri, actionsData[val].params, rowData.length < 1 ? {} : rowData[0]), {
                                            replace: true,
                                            state: {
                                                data: rowData.length < 1 ? {} : rowData[0],
                                                // eslint-disable-next-line prettier/prettier
                                                type: actionsData[val].pageEdit === true ? 'edit' : (actionsData[val].pageDestroy === true ? 'destroy' : 'create'),
                                                // eslint-disable-next-line prettier/prettier
                                                method: actionsData[val].pageEdit === true ? method[1] : (actionsData[val].pageDestroy === true ? method[2] : method[0]),
                                                // eslint-disable-next-line prettier/prettier
                                                repeat: typeIsBoolean(actionsData[val].pageRepeat) ? actionsData[val].pageRepeat : false,
                                                // eslint-disable-next-line prettier/prettier
                                                pathname: pathname(val, actionsData[val].uri ?? uri, actionsData[val].params, rowData.length < 1 ? {} : rowData[0]),
                                                // eslint-disable-next-line prettier/prettier
                                                pathnameHome: actionsData[val].pageHome ?? (actionsData[val].uri ?? uri),
                                                // eslint-disable-next-line prettier/prettier
                                                pathnameAction: pathname(actionsData[val].pageAction ?? val, actionsData[val].uri ?? uri, actionsData[val].params, rowData.length < 1 ? {} : rowData[0]),
                                                payload: {
                                                    ...(actionsData[val].pagePayload && {
                                                        ...actionsData[val].pagePayload,
                                                    }),
                                                },
                                                // eslint-disable-next-line prettier/prettier
                                                ...(typeIsBoolean(actionsData[val].pageDataServer) && actionsData[val].pageDataServer === true && {
                                                        // eslint-disable-next-line prettier/prettier
                                                        dataServer: true
                                                    }),
                                            },
                                        }
                                    );
                                }
                            }}
                            sx={{
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                '& .MuiButton-startIcon': {
                                    mr: '6px',
                                    '& .MuiSvgIcon-root': {
                                        width: '16px',
                                        height: '16px',
                                    },
                                },
                            }}
                            // eslint-disable-next-line prettier/prettier
                            startIcon={icon(url(val, actionsData[val].uri ?? uri, actionsData[val].params).action, actionsData[val].icon)}
                            children={i18next.t(display(val, actionsData[val].display))}
                        />
                    </Badge>
                )}
            />
        </Box>
    );
};

Header.propTypes = {
    uri: PropTypes.string,
    back: PropTypes.string,
    actions: PropTypes.array,
    actionsData: PropTypes.object,
    rowData: PropTypes.array,
    permissions: PropTypes.array,
    paginate: PropTypes.number,
    setTable: PropTypes.func,
    column: PropTypes.array,
    filter: PropTypes.object,
    setFilter: PropTypes.func,
};

export default Header;
