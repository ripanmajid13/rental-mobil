import React from 'react';

import {
    Add as AddIcon,
    Adjust as AdjustIcon,
    Delete as DeleteIcon,
    DeleteForever as DeleteForeverIcon,
    Difference as DifferenceIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
    PictureAsPdf as PictureAsPdfIcon,
    Print as PrintIcon,
    RestoreFromTrash as RestoreFromTrashIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';

const icon = (action, icon) => {
    if (icon) {
        return icon;
    } else {
        switch (action.split('-')[0]) {
            case 'create':
            case 'store':
                return <AddIcon />;
            case 'edit':
            case 'update':
                return <EditIcon />;
            case 'delete':
            case 'destroy':
                return <DeleteIcon />;
            case 'download':
                if (action.split('-').some((ass) => ass === 'pdf')) {
                    return <PictureAsPdfIcon />;
                } else if (action.split('-').some((ass) => ass === 'excel')) {
                    return <DifferenceIcon />;
                } else {
                    return <DownloadIcon />;
                }
            case 'print':
                return <PrintIcon />;
            case 'trash':
                return <DeleteForeverIcon />;
            case 'restore':
                return <RestoreFromTrashIcon />;
            case 'show':
                return <VisibilityIcon />;

            default:
                return <AdjustIcon />;
        }
    }
};

export default icon;
