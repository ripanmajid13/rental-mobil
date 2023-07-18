import React from 'react';
import i18next from 'i18next';

import { Search as SearchIcon } from '@mui/icons-material';

const ButtonSearch = (onSearch) => ({
    color: 'primary',
    startIcon: <SearchIcon />,
    invisible: true,
    onClick: () => onSearch(),
    children: i18next.t('Search'),
});

export default ButtonSearch;
