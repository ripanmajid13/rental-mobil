import {stringToColor, stringToInitial, stringToInvertColor} from './index';

const stringAvatar = (name, sx = {}) => {
    return {
        sx: {
            color: stringToInvertColor(stringToColor(name), true),
            bgcolor: stringToColor(name),
            fontSize: '10px',
            width: 25,
            height: 25,
            marginRight: '0.5rem',
            ...sx,
        },
        children: stringToInitial(name),
    };
};

export default stringAvatar;
