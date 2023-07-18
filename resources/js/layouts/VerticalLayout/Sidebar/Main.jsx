import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import {
    Box,
    Collapse,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';

import { APP_MODULE } from '@configs/app';
import color from '@configs/color';

import { RenderMap } from '@helpers/render';
import HeaderLeft from '@layouts/assets/HeaderLeft';
import { routeLayoutNavigation, routeLayoutNavigationModule } from '@routes/layout';

const Main = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState({});

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minHeight: 56,
                    padding: '0 1rem',
                }}>
                <HeaderLeft />
            </Box>

            <Divider sx={{ backgroundColor: color.primary300 }} />

            <Box
                sx={{
                    m: '5px 1px 5px 5px',
                    px: 1,
                    position: 'relative',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        width: '0.25rem',
                        height: '0.25rem',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: 20,
                    },
                    '&:hover::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(176, 172, 181, 0.6)',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-corner': {
                        backgroundColor: 'transparent',
                    },
                }}>
                <RenderMap
                    // eslint-disable-next-line prettier/prettier
                    data={APP_MODULE === true ? routeLayoutNavigationModule() : routeLayoutNavigation()}
                    render={({ name, items }, key) => (
                        <List
                            key={key}
                            dense
                            sx={{ pb: 0, mt: key === 0 ? 0 : 1.5 }}
                            subheader={
                                <ListSubheader
                                    disableSticky
                                    disableGutters
                                    sx={{
                                        p: '1rem 0.25rem 0.5rem',
                                        color: color.accent100,
                                        fontWeight: 500,
                                        fontSize: '0.820312rem',
                                        lineHeight: 'normal',
                                        textTransform: 'uppercase',
                                        transition: 'padding-left 0.25s ease-in-out 0s',
                                    }}
                                    children={i18next.t(name)}
                                />
                            }>
                            <RenderMap
                                data={items}
                                render={(valNav, keyNav) => (
                                    <Fragment key={keyNav}>
                                        <ListItemButton
                                            component="li"
                                            selected={valNav.active === 'contained'}
                                            onClick={() => {
                                                if (valNav.items) {
                                                    setOpen((preState) => ({
                                                        [keyNav]: !preState[keyNav],
                                                    }));
                                                } else {
                                                    setOpen({});
                                                    navigate(valNav.path, {
                                                        replace: true,
                                                    });
                                                }
                                            }}
                                            sx={{
                                                p: '0.25rem',
                                                mt: keyNav === 0 ? 0 : 0.5,
                                                // eslint-disable-next-line prettier/prettier
                                                color: valNav.dev === true ? color.accent100 : color.bg300,
                                                borderRadius: '5px',
                                                '&:hover': {
                                                    color: color.text100,
                                                    bgcolor: color.accent200,
                                                },
                                                '&.Mui-selected': {
                                                    color: color.text100,
                                                    bgcolor: color.accent100,
                                                    '&:hover': {
                                                        color: color.text100,
                                                        bgcolor: color.accent100,
                                                    },
                                                },
                                            }}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: '30px',
                                                    color: 'inherit',
                                                    '& .MuiSvgIcon-root': {
                                                        width: '1.375rem',
                                                        height: '1.375rem',
                                                    },
                                                }}
                                                children={valNav.icon}
                                            />
                                            <ListItemText primary={i18next.t(valNav.name)} />
                                            {valNav.items &&
                                                // eslint-disable-next-line prettier/prettier
                                                ((valNav.active === 'contained' && Object.keys(open).length < 1 ? true : (open[keyNav] ?? false)) ? (
                                                    // eslint-disable-next-line prettier/prettier
                                                    <ExpandLess sx={{ width: '1.375rem', height: '1.375rem' }} />
                                                ) : (
                                                    // eslint-disable-next-line prettier/prettier
                                                    <ExpandMore sx={{ width: '1.375rem', height: '1.375rem' }} />
                                                ))}
                                        </ListItemButton>

                                        {valNav.items && (
                                            <Collapse
                                                // eslint-disable-next-line prettier/prettier
                                                in={valNav.active === 'contained' && Object.keys(open).length < 1 ? true : (open[keyNav] ?? false)}
                                                timeout="auto"
                                                unmountOnExit>
                                                <List dense disablePadding>
                                                    <RenderMap
                                                        data={valNav.items}
                                                        render={(valSub, keySub) => (
                                                            <ListItemButton
                                                                key={keySub}
                                                                component="li"
                                                                // eslint-disable-next-line prettier/prettier
                                                                selected={valSub.active === 'contained'}
                                                                onClick={() =>
                                                                    navigate(valSub.path, {
                                                                        replace: true,
                                                                    })
                                                                }
                                                                sx={{
                                                                    p: '0.25rem',
                                                                    mt: 0.5,
                                                                    ml: 4,
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    color: valSub.dev === true ? color.accent100 : color.bg300,
                                                                    borderRadius: '5px',
                                                                    '&:hover': {
                                                                        color: color.text100,
                                                                        bgcolor: color.accent200,
                                                                    },
                                                                    '&.Mui-selected': {
                                                                        color: color.text100,
                                                                        bgcolor: color.accent100,
                                                                        '&:hover': {
                                                                            color: color.text100,
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            bgcolor: color.accent100,
                                                                        },
                                                                    },
                                                                }}>
                                                                <ListItemIcon
                                                                    sx={{
                                                                        minWidth: '30px',
                                                                        color: 'inherit',
                                                                        '& .MuiSvgIcon-root': {
                                                                            width: '1.375rem',
                                                                            height: '1.375rem',
                                                                        },
                                                                    }}
                                                                    children={
                                                                        valSub.icon ?? (
                                                                            <FilterTiltShiftIcon />
                                                                        )
                                                                    }
                                                                />
                                                                <ListItemText
                                                                    primary={i18next.t(valSub.name)}
                                                                />
                                                            </ListItemButton>
                                                        )}
                                                    />
                                                </List>
                                            </Collapse>
                                        )}
                                    </Fragment>
                                )}
                            />
                        </List>
                    )}
                />
            </Box>
        </>
    );
};

export default Main;
