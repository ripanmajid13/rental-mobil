const color = (action, color) => {
    // eslint-disable-next-line prettier/prettier
    if (color && ['primary', 'secondary', 'success', 'error', 'info', 'warning'].some((col) => col === color)) {
        return color;
    } else {
        switch (action.split('-')[0]) {
            case 'create':
            case 'store':
                return 'success';
            case 'edit':
            case 'update':
                return 'warning';
            case 'delete':
            case 'destroy':
                return 'error';
            case 'download':
                return 'primary';
            case 'print':
                return 'primary';
            case 'detail':
            case 'show':
            case 'trash':
                return 'info';
            case 'restore':
                return 'primary';

            default:
                return 'secondary';
        }
    }
};

export default color;
