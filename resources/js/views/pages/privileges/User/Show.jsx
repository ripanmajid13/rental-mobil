import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import i18next from 'i18next';

import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { MuiButton } from '@components/materialui/inputs';

import { RenderMap } from '@helpers/render';
import { stringToDateTime } from '@hooks/string';

const Show = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const userAvatar = (name) => {
        return {
            variant: 'rounded',
            sx: {
                mb: 2,
                width: 100,
                height: 100,
                bgcolor: () => {
                    let hash = 0;
                    let i;

                    /* eslint-disable no-bitwise */
                    for (i = 0; i < name.length; i += 1) {
                        hash = name.charCodeAt(i) + ((hash << 5) - hash);
                    }

                    let color = '#';

                    for (i = 0; i < 3; i += 1) {
                        const value = (hash >> (i * 8)) & 0xff;
                        color += `00${value.toString(16)}`.slice(-2);
                    }
                    /* eslint-enable no-bitwise */

                    return color;
                },
                // fontSize: '1.75rem',
                // marginRight: '1rem',
            },
            children:
                name.split(' ').length < 2
                    ? `${name.split(' ')[0][0]}`
                    : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={5} lg={4}>
                <Card
                    elevation={0}
                    // eslint-disable-next-line prettier/prettier
                            sx={{ boxShadow: 'rgb(51 48 60 / 3%) 0px 2px 7px 1px, rgb(51 48 60 / 2%) 0px 4px 7px 0px, rgb(51 48 60 / 1%) 0px 1px 4px 2px' }}>
                            <CardContent
                        sx={{
                            display: 'flex',
                            p: '3.375rem 1.5rem 1.5rem',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <Avatar {...userAvatar(data.name ?? '')} />

                        <Typography variant="h5" gutterBottom sx={{ mb: 0 }} children={data.name} />

                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            children={stringToDateTime(data.join, 'd/m/Y')}
                        />
                    </CardContent>

                    <Divider sx={{ mx: '1.5rem' }} />

                    <CardContent sx={{ p: '1.5rem' }}>
                        <Typography
                            variant="body1"
                            gutterBottom
                            sx={{ textTransform: 'uppercase' }}
                            children={i18next.t('Details')}
                        />

                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', mb: '0.1rem' }}>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ m: '0px 0.25rem 0px 0px', fontWeight: '550' }}
                                    children={i18next.t('Date Of Birth') + ':'}
                                />
                                &nbsp;
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ mb: 0 }}
                                    children={
                                        data.date_of_birth
                                            ? stringToDateTime(data.date_of_birth, 'd/m/Y')
                                            : '-'
                                    }
                                />
                            </Box>

                            <Box sx={{ display: 'flex', mb: '0.1rem' }}>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ m: '0px 0.25rem 0px 0px', fontWeight: '550' }}
                                    children={i18next.t('Username') + ':'}
                                />
                                &nbsp;
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ mb: 0 }}
                                    children={data.username}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', mb: '0.1rem' }}>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ m: '0px 0.25rem 0px 0px', fontWeight: '550' }}
                                    children={i18next.t('Email') + ':'}
                                />
                                &nbsp;
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    // eslint-disable-next-line prettier/prettier
                                    sx={{ mb: 0, color: data.email_verified_at ? '' : 'warning.main' }}
                                    children={data.email}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    mb: '0.1rem',
                                    alignItems: 'center',
                                }}>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ m: '0px 0.25rem 0px 0px', fontWeight: '550' }}
                                    children={i18next.t('Status') + ':'}
                                />
                                &nbsp;
                                <Chip
                                    variant="outlined"
                                    label={data.active === 'true' ? 'Active' : 'Inactive'}
                                    color={data.active === 'true' ? 'success' : 'error'}
                                    sx={{
                                        fontSize: '12px',
                                        borderRadius: '4px',
                                        height: 'auto',
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                            <MuiButton
                                color="secondary"
                                onClick={() =>
                                    navigate('/privileges-user', {
                                        replace: true,
                                    })
                                }
                                children="Back"
                                fullWidth={false}
                                startIcon={<ArrowBackIcon />}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={7} lg={8}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Card
                            elevation={0}
                            // eslint-disable-next-line prettier/prettier
                            sx={{ boxShadow: 'rgb(51 48 60 / 3%) 0px 2px 7px 1px, rgb(51 48 60 / 2%) 0px 4px 7px 0px, rgb(51 48 60 / 1%) 0px 1px 4px 2px' }}>
                            <CardContent sx={{ p: '1.5rem' }}>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ textTransform: 'uppercase' }}
                                    children={i18next.t('Roles')}
                                />

                                <Box sx={{ mt: 2 }}>
                                    {data.roles ? (
                                        <RenderMap
                                            data={JSON.parse(data.roles)}
                                            render={(val, key) => (
                                                <List dense sx={{ py: 0 }} key={key}>
                                                    <ListItem sx={{ p: 0 }}>
                                                        <ListItemText
                                                            primary={`${key + 1}. ${val}`}
                                                            sx={{ my: 0 }}
                                                        />
                                                    </ListItem>
                                                </List>
                                            )}
                                        />
                                    ) : (
                                        '-'
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card
                            elevation={0}
                            // eslint-disable-next-line prettier/prettier
                            sx={{ boxShadow: 'rgb(51 48 60 / 3%) 0px 2px 7px 1px, rgb(51 48 60 / 2%) 0px 4px 7px 0px, rgb(51 48 60 / 1%) 0px 1px 4px 2px' }}>
                            <CardContent sx={{ p: '1.5rem' }}>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ textTransform: 'uppercase' }}
                                    children={i18next.t('Permissions')}
                                />

                                <Box sx={{ mt: 2 }}>
                                    {data.permissions ? (
                                        <RenderMap
                                            data={JSON.parse(data.permissions)}
                                            render={(val, key) => (
                                                <List dense sx={{ py: 0 }} key={key}>
                                                    <ListItem sx={{ p: 0 }}>
                                                        <ListItemText
                                                            primary={`${key + 1}. ${val}`}
                                                            sx={{ my: 0 }}
                                                        />
                                                    </ListItem>
                                                </List>
                                            )}
                                        />
                                    ) : (
                                        '-'
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Show;
