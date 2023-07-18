const color = ({ action }, val) => {
    if (
        val.color &&
        ['primary', 'secondary', 'success', 'error', 'info', 'warning'].some(
            (col) => col === val.color
        )
    ) {
        return val.color;
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
