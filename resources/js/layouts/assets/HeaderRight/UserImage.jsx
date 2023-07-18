import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '@mui/material';

const UserImage = ({ name }) => {
    return (
        <Avatar
            sx={{
                width: 40,
                height: 40,
                bgcolor: () => {
                    let hash = 0;
                    let i;

                    /* eslint-disable no-bitwise */
                    for (i = 0; i < (name ?? '').length; i += 1) {
                        hash = (name ?? '').charCodeAt(i) + ((hash << 5) - hash);
                    }

                    let color = '#';

                    for (i = 0; i < 3; i += 1) {
                        const value = (hash >> (i * 8)) & 0xff;
                        color += `00${value.toString(16)}`.slice(-2);
                    }
                    /* eslint-enable no-bitwise */

                    return color;
                },
                fontSize: '20px',
                marginRight: 0,
            }}
            children={
                (name ?? '').split(' ').length < 2
                    ? `${(name ?? '').split(' ')[0][0]}`
                    : `${(name ?? '').split(' ')[0][0]}${(name ?? '').split(' ')[1][0]}`
            }
        />
    );
};

UserImage.defaultProps = {
    name: 'User',
};

UserImage.propTypes = {
    name: PropTypes.string,
};

export default UserImage;
