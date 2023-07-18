import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import color from '@configs/color';
import { decrypt, encrypt } from '@configs/crypto';

import { RenderMap } from '@helpers/render';
import { routeLayoutModule } from '@routes/layout';
import { STORE_TYPE_APP_MODULE, STORE_TYPE_APP_STATE } from '@store/type/app';

const Content = ({ dispatch, token }) => {
    return (
        <Box>
            <Grid container spacing={5} alignItems="flex-end">
                <RenderMap
                    data={routeLayoutModule()}
                    render={(val, key) => (
                        <Grid item key={key} xs={12} sm={3}>
                            <Card
                                onClick={() => {
                                    dispatch({
                                        type: STORE_TYPE_APP_STATE,
                                        app_backdrop_open: true,
                                        app_backdrop_content: i18next.t(val.display) + ' . . .',
                                    });
                                    setTimeout(() => {
                                        dispatch({
                                            type: STORE_TYPE_APP_MODULE,
                                            token: encrypt(
                                                JSON.stringify({
                                                    ...JSON.parse(decrypt(token)),
                                                    module: val.key,
                                                })
                                            ),
                                            module: val.key,
                                        });
                                    }, 500);
                                }}
                                sx={{
                                    bgcolor: val.dev === true ? 'error.main' : '',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        // eslint-disable-next-line prettier/prettier
                                        bgcolor: val.dev === true ? 'common.white' : color.primary200,
                                        '& .MuiCardContent-root': {
                                            '& .MuiBox-root': {
                                                '& .MuiSvgIcon-root': {
                                                    // eslint-disable-next-line prettier/prettier
                                                    color: val.dev === true ? 'error.main' : color.bg100,
                                                },
                                                '& .MuiTypography-root': {
                                                    // eslint-disable-next-line prettier/prettier
                                                    color: val.dev === true ? 'error.main' : color.bg100,
                                                },
                                            },
                                        },
                                    },
                                    '& .MuiCardContent-root': {
                                        py: '1rem !important',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '&:last-child': {
                                            p: 0,
                                        },
                                        '& .MuiBox-root': {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '& .MuiSvgIcon-root': {
                                                width: '3rem',
                                                height: '3rem',
                                                color:
                                                    val.dev === true ? 'white' : color.primary200,
                                            },
                                            '& .MuiTypography-root': {
                                                mt: 1,
                                                mb: 0,
                                                fontWeight: 'bold',
                                                color:
                                                    val.dev === true ? 'white' : color.primary200,
                                            },
                                        },
                                    },
                                }}>
                                <CardContent>
                                    <Box>
                                        {val.icon ?? <DoNotDisturbIcon />}
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            children={i18next.t(val.display)}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                />
            </Grid>
        </Box>
    );
};

Content.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

export default Content;
