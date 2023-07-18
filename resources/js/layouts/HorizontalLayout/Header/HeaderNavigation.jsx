import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import {
    KeyboardArrowDown as KeyArrDownIcon,
    KeyboardArrowLeft as KeyArrLeftIcon,
    KeyboardArrowRight as KeyArrRightIcon,
    KeyboardArrowUp as KeyArrUpIcon,
} from '@mui/icons-material';
import { Box, Button, Fade, Popper, Toolbar } from '@mui/material';

import { APP_MODULE } from '@configs/app';
import color from '@configs/color';

import { RenderMap } from '@helpers/render';
import { routeLayoutNavigation, routeLayoutNavigationModule } from '@routes/layout';

const HeaderNavigation = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState({});
    const [anchorElSub, setAnchorElSub] = useState({});

    return (
        <Box sx={{ px: 2, bgcolor: color.bg300, color: color.text100, width: '100%' }}>
            <Toolbar disableGutters sx={{ minHeight: '54px !important' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <RenderMap
                        // eslint-disable-next-line prettier/prettier
                        data={APP_MODULE === true ? routeLayoutNavigationModule() : routeLayoutNavigation()}
                        render={(val, key) => (
                            // eslint-disable-next-line prettier/prettier
                            <Box key={key} sx={{ ml: key !== 0 ? 2 : 0 }} onMouseLeave={() => Boolean(anchorEl[key]) === true && setAnchorEl({ [key]: false })}>
                                <Button
                                    aria-describedby={`navigation-a-${key}`}
                                    disableElevation
                                    disableRipple
                                    size="small"
                                    variant={val.active}
                                    startIcon={val.icon}
                                    // eslint-disable-next-line prettier/prettier
                                    endIcon={Boolean(anchorEl[key]) === true ? <KeyArrDownIcon /> : <KeyArrUpIcon />}
                                    // onClick={(e) => setAnchorEl({ [idx]: anchorEl[idx] ? null : e.currentTarget })}
                                    onMouseEnter={(e) => setAnchorEl({ [key]: e.currentTarget })}
                                    children={i18next.t(val.name)}
                                />

                                <Popper
                                    open={Boolean(anchorEl[key])}
                                    anchorEl={anchorEl[key]}
                                    placement="bottom-start"
                                    transition
                                    disablePortal>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps}>
                                            <Box
                                                sx={{
                                                    p: '5px 1px 5px 5px',
                                                    mt: '14px',
                                                    borderRadius: '5px',
                                                    bgcolor: 'background.paper',
                                                    // eslint-disable-next-line prettier/prettier
                                                    boxShadow: 'rgba(47, 43, 61, 0.16) 0px 4px 11px 0px',
                                                }}>
                                                <Box
                                                    // eslint-disable-next-line prettier/prettier
                                                    onScroll={() => Object.keys(anchorElSub).length > 0 && setAnchorElSub({})}
                                                    sx={{
                                                        maxHeight: '130px',
                                                        minWidth: '220px',
                                                        overflowY: 'scroll',
                                                        overflowX: 'hidden',
                                                        '&::-webkit-scrollbar': {
                                                            width: '0.25rem',
                                                            height: '0.25rem',
                                                        },
                                                        '&::-webkit-scrollbar-track': {
                                                            backgroundColor: 'transparent',
                                                        },
                                                        '&::-webkit-scrollbar-corner': {
                                                            backgroundColor: 'transparent',
                                                        },
                                                        '&:hover::-webkit-scrollbar-thumb': {
                                                            borderRadius: 20,
                                                            // eslint-disable-next-line prettier/prettier
                                                            backgroundColor: 'rgba(176, 172, 181, 0.6)',
                                                        },
                                                    }}>
                                                    <RenderMap
                                                        data={val.items}
                                                        render={(valNav, keyNav) => (
                                                            // eslint-disable-next-line prettier/prettier
                                                            <Box key={keyNav} sx={{ mt: keyNav !== 0 ? '5px' : 0 }} onMouseLeave={() => valNav.items && Boolean(anchorElSub[keyNav]) === true && setAnchorElSub({ [keyNav]: false })}>
                                                                <Button
                                                                    fullWidth
                                                                    disableElevation
                                                                    disableRipple
                                                                    size="small"
                                                                    variant={valNav.active}
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    color={valNav.dev === true ? 'warning' : 'primary'}
                                                                    startIcon={valNav.icon}
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    endIcon={valNav.items ? (Boolean(anchorElSub[keyNav]) === true ? <KeyArrRightIcon /> : <KeyArrLeftIcon />) : ''}
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    onMouseEnter={(e) => valNav.items && setAnchorElSub({ [keyNav]: e.currentTarget })}
                                                                    onClick={() => {
                                                                        if (!valNav.items) {
                                                                            setAnchorEl({});
                                                                            setAnchorElSub({});
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            navigate(valNav.path, {
                                                                                replace: true,
                                                                            });
                                                                        }
                                                                    }}
                                                                    sx={{
                                                                        px: 1,
                                                                        py: 0,
                                                                        fontSize: '0.75rem',
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        justifyContent: 'start',
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        textTransform: 'none',
                                                                        '& .MuiButton-endIcon': {
                                                                            ml: 'auto',
                                                                        },
                                                                    }}
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    children={i18next.t(valNav.name)}
                                                                />

                                                                {valNav.items && (
                                                                    <Popper
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        open={Boolean(anchorElSub[keyNav])}
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        anchorEl={anchorElSub[keyNav]}
                                                                        placement="right-start"
                                                                        transition
                                                                        disablePortal>
                                                                        {({ TransitionProps }) => (
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            <Fade {...TransitionProps}>
                                                                                <Box
                                                                                    sx={{
                                                                                        p: '5px 1px 5px 5px',
                                                                                        ml: '1px',
                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                        bgcolor: 'background.paper',
                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                        position: 'fixed',
                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                        borderRadius: '5px',
                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                        boxShadow: 'rgba(47, 43, 61, 0.16) 0px 4px 11px 0px',
                                                                                    }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            maxHeight: '130px',
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            minWidth: '220px',
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            overflowY: 'scroll',
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            '&::-webkit-scrollbar': {
                                                                                                    width: '0.25rem',
                                                                                                    height: '0.25rem',
                                                                                                },
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            '&::-webkit-scrollbar-track': {
                                                                                                    backgroundColor:
                                                                                                        'transparent',
                                                                                                },
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            '&::-webkit-scrollbar-corner': {
                                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                                    backgroundColor: 'transparent',
                                                                                                },
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            '&:hover::-webkit-scrollbar-thumb': {
                                                                                                    borderRadius: 20,
                                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                                    backgroundColor: 'rgba(176, 172, 181, 0.6)',
                                                                                                },
                                                                                        }}>
                                                                                        <RenderMap
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            data={valNav.items}
                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                            render={(valSub, keySub) => (
                                                                                                <Box
                                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                                    key={keySub}
                                                                                                    // eslint-disable-next-line prettier/prettier
                                                                                                    sx={{ mt: valSub !== 0 ? '5px' : 0 }}>
                                                                                                    <Button
                                                                                                        fullWidth
                                                                                                        disableElevation
                                                                                                        disableRipple
                                                                                                        size="small"
                                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                                        variant={valSub.active}
                                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                                        color={valSub.dev === true ? 'warning' : 'primary'}
                                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                                        startIcon={valSub.icon}
                                                                                                        onClick={() => {
                                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                                            setAnchorEl({});
                                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                                            setAnchorElSub({});
                                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                                            navigate(valSub.path, {
                                                                                                                    replace: true,
                                                                                                                }
                                                                                                            );
                                                                                                        }}
                                                                                                        sx={{
                                                                                                            px: 1,
                                                                                                            py: 0,
                                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                                            fontSize: '0.75rem',
                                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                                            justifyContent: 'start',
                                                                                                            // eslint-disable-next-line prettier/prettier
                                                                                                            textTransform: 'none',
                                                                                                        }}
                                                                                                        // eslint-disable-next-line prettier/prettier
                                                                                                        children={i18next.t(valSub.name)}
                                                                                                    />
                                                                                                </Box>
                                                                                            )}
                                                                                        />
                                                                                    </Box>
                                                                                </Box>
                                                                            </Fade>
                                                                        )}
                                                                    </Popper>
                                                                )}
                                                            </Box>
                                                        )}
                                                    />
                                                </Box>
                                            </Box>
                                        </Fade>
                                    )}
                                </Popper>
                            </Box>
                        )}
                    />
                </Box>
            </Toolbar>
        </Box>
    );
};

export default HeaderNavigation;
