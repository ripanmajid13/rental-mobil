import React from 'react';

import AdjustIcon from '@mui/icons-material/Adjust';
import { Box, Paper, Typography } from '@mui/material';

import { RenderMap } from '@helpers/render';

const Config = () => {
    const data = [
        {
            title: 'API',
            import: 'api',
            location: "'@config/api';",
        },
    ];

    return (
        <Box>
            <RenderMap
                data={data}
                render={(val, key) => (
                    <Paper sx={{ mb: 3 }} key={key}>
                        <Typography
                            variant="body1"
                            gutterBottom
                            sx={{
                                pt: 1,
                                px: 1,
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <AdjustIcon sx={{ mr: 1, height: 25, width: 25 }} />
                            API
                        </Typography>

                        <pre
                            style={{
                                padding: '0.5rem',
                                marginLeft: '50px',
                                color: '#ccc',
                                backgroundColor: '#2d2d2d',
                                borderRadius: '5px',
                            }}>
                            <Typography
                                variant="button"
                                display="block"
                                gutterBottom
                                sx={{
                                    mb: 0,
                                    textTransform: 'none',
                                    // eslint-disable-next-line prettier/prettier
                                    fontFamily: 'Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace',
                                    '& .import': {
                                        color: '#cc99cd',
                                        fontStyle: 'italic',
                                    },
                                    '& .from': {
                                        color: '#cc99cd',
                                        fontStyle: 'italic',
                                    },
                                    '& .location': {
                                        color: '#7ec699',
                                    },
                                }}>
                                <span className="import">import</span>
                                <span> </span>
                                <span>{val.import}</span>
                                <span> </span>
                                <span className="from">from</span>
                                <span> </span>
                                <span className="location">{val.location}</span>
                            </Typography>
                        </pre>
                    </Paper>
                )}
            />
        </Box>
    );
};

export default Config;
