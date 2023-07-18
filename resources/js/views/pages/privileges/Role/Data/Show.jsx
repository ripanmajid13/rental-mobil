import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Divider, List, ListItem, ListItemText } from '@mui/material';

import { DialogWrapper } from '@helpers/dialog';

const Show = ({ dialog, setDialog }) => {
    return (
        <DialogWrapper {...dialog} setDialog={setDialog}>
            <List dense>
                <ListItem>
                    <ListItemText
                        primary={i18next.t('Code') + ' :'}
                        secondary={dialog.data?.code}
                        sx={{ my: 0, '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
                    />

                    <ListItemText
                        primary={i18next.t('Name') + ' :'}
                        secondary={dialog.data?.name}
                        sx={{ my: 0, '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
                    />

                    <ListItemText
                        primary={i18next.t('Type') + ' :'}
                        secondary={dialog.data?.type_name}
                        sx={{ my: 0, '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
                    />

                    <ListItemText
                        primary={i18next.t('Display') + ' :'}
                        secondary={dialog.data?.display}
                        sx={{ my: 0, '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
                    />
                </ListItem>
            </List>

            <Divider />

            <List dense>
                <ListItem>
                    <ListItemText
                        primary={i18next.t('Permissions') + ' :'}
                        secondary={
                            dialog.data?.permissions
                                ? JSON.parse(dialog.data?.permissions)
                                      .map((val, key) => `${key + 1}. ${val}`)
                                      .join(', ')
                                : '-'
                        }
                        sx={{ my: 0, '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
                    />
                </ListItem>
            </List>

            <Divider />

            <List dense>
                <ListItem>
                    <ListItemText
                        primary={i18next.t('Users') + ' :'}
                        secondary={
                            dialog.data?.users
                                ? JSON.parse(dialog.data?.users)
                                      .map((val, key) => `${key + 1}. ${val}`)
                                      .join(', ')
                                : '-'
                        }
                        sx={{ my: 0, '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
                    />
                </ListItem>
            </List>
        </DialogWrapper>
    );
};

Show.defaultProps = {
    dialog: {},
};

Show.propTypes = {
    dialog: PropTypes.object,
    setDialog: PropTypes.func,
};

export default Show;
