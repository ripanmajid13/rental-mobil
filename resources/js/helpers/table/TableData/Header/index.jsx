import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Badge, Box } from '@mui/material';
import { MuiButton } from '@components/materialui/inputs';

import { RenderMap } from '@helpers/render';
import { typeIsString } from '@hooks/type';

import ButtonBack from './button/ButtonBack';
import ButtonReload from './button/ButtonReload';
import ButtonSearch from './button/ButtonSearch';
import action from './action';

const Header = ({ uri, back, actions, columns, filter, selectedRow, searchRow, reloadRow }) => {
    let navigate = useNavigate();

    let buttons = [ButtonReload(reloadRow)];

    if (columns.filter((cf) => cf.filter === true).length > 0) {
        buttons.unshift(ButtonSearch(searchRow));
    }

    if (typeIsString(back) && back.length > 0) {
        buttons.unshift(
            ButtonBack(() =>
                navigate(back, {
                    replace: true,
                })
            )
        );
    }

    action(buttons, actions, uri, selectedRow, reloadRow, columns, filter);

    return (
        <Box>
            {/* <Box>
                menu when Scroll
            </Box> */}

            <Box>
                <RenderMap
                    data={buttons}
                    render={({ invisible = true, ...val }, key) => {
                        return (
                            <Badge
                                invisible={invisible}
                                variant="dot"
                                color="warning"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    marginRight: buttons.length === key + 1 ? 0 : '0.5rem',
                                    '& .MuiBadge-badge': {
                                        animation: 'blinker 1s linear infinite',
                                        '@keyframes blinker': {
                                            '50%': {
                                                opacity: 0,
                                            },
                                        },
                                    },
                                }}
                                key={key}>
                                <MuiButton
                                    {...val}
                                    sx={{
                                        marginBottom: '8px',
                                        fontSize: '0.75rem',
                                    }}
                                />
                            </Badge>
                        );
                    }}
                />
            </Box>

            {/* <Divider sx={{ mb: 1, backgroundColor: 'rgba(224, 224, 224, 1)' }} /> */}
        </Box>
    );
};

Header.propTypes = {
    uri: PropTypes.string,
    back: PropTypes.string,
    actions: PropTypes.object,
    columns: PropTypes.array,
    filter: PropTypes.func,
    selectedRow: PropTypes.array,
    searchRow: PropTypes.func.isRequired,
    reloadRow: PropTypes.func.isRequired,
};

export default Header;
