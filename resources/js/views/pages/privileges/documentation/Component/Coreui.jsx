import React, { useState } from 'react';

import AdjustIcon from '@mui/icons-material/Adjust';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {
    Box,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { CuiDate, CuiDateRange, CuiInput, CuiSelect, CuiTextarea } from '@components/coreui/forms';

import { RenderMap } from '@helpers/render';

import date from './coreui/forms/date';
import daterange from './coreui/forms/daterange';
import input from './coreui/forms/input';
import select from './coreui/forms/select';
import textarea from './coreui/forms/textarea';

const Coreui = () => {
    const [form, setForm] = useState({
        cui_date: {
            label: 'Cui Date',
            placeholder: 'Cui Date',
        },
        cui_daterange: {
            label: 'Cui Date Range',
            placeholder: 'Cui Date Range',
        },
        cui_input: {
            label: 'Cui Input',
            placeholder: 'Cui Input',
        },
        cui_select: {
            label: 'Cui Select',
            placeholder: 'Cui Select',
            options: [
                { value: 1, label: 'Data 1' },
                { value: 2, label: 'Data 2' },
            ],
        },
        cui_textarea: {
            label: 'Cui Textarea',
            placeholder: 'Cui Textarea',
        },
    });

    const components = [
        {
            title: 'Components',
        },
        {
            title: 'Forms',
            items: [
                {
                    id: 'cui_date',
                    title: 'CuiDate',
                    location: "'@components/coreui/forms';",
                    attributes: date,
                    display: CuiDate,
                    code: () => (
                        <>
                            <span className="prop">id</span>
                            <span className="equal">=</span>
                            <span className="value">{'"cui_date"'}</span>
                            <span> </span>
                            <span className="prop">setInput</span>
                            <span className="equal">=</span>
                            <span className="value">{'{setInput}'}</span>
                            <span> </span>
                            <span className="prop">label</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Date"'}</span>
                            <span> </span>
                            <span className="prop">placeholder</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Date"'}</span>
                        </>
                    ),
                },
                {
                    id: 'cui_daterange',
                    title: 'CuiDateRange',
                    location: "'@components/coreui/forms';",
                    attributes: daterange,
                    display: CuiDateRange,
                    code: () => (
                        <>
                            <span className="prop">id</span>
                            <span className="equal">=</span>
                            <span className="value">{'"cui_daterange"'}</span>
                            <span> </span>
                            <span className="prop">setInput</span>
                            <span className="equal">=</span>
                            <span className="value">{'{setInput}'}</span>
                            <span> </span>
                            <span className="prop">label</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Date Range"'}</span>
                            <span> </span>
                            <span className="prop">placeholder</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Date Range"'}</span>
                        </>
                    ),
                },
                {
                    id: 'cui_input',
                    title: 'CuiInput',
                    location: "'@components/coreui/forms';",
                    attributes: input,
                    display: CuiInput,
                    code: () => (
                        <>
                            <span className="prop">id</span>
                            <span className="equal">=</span>
                            <span className="value">{'"cui_input"'}</span>
                            <span> </span>
                            <span className="prop">setInput</span>
                            <span className="equal">=</span>
                            <span className="value">{'{setInput}'}</span>
                            <span> </span>
                            <span className="prop">label</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Input"'}</span>
                            <span> </span>
                            <span className="prop">placeholder</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Input"'}</span>
                        </>
                    ),
                },
                {
                    id: 'cui_select',
                    title: 'CuiSelect',
                    location: "'@components/coreui/forms';",
                    attributes: select,
                    display: CuiSelect,
                    code: () => (
                        <>
                            <span className="prop">id</span>
                            <span className="equal">=</span>
                            <span className="value">{'"cui_select"'}</span>
                            <span> </span>
                            <span className="prop">setInput</span>
                            <span className="equal">=</span>
                            <span className="value">{'{setInput}'}</span>
                            <span> </span>
                            <span className="prop">options</span>
                            <span className="equal">=</span>
                            <span className="value">
                                {'{[ { value: 1, label: "Data 1" },{ value: 2, label: "Data 2" }]}'}
                            </span>
                            <span> </span>
                            <span className="prop">label</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Select"'}</span>
                            <span> </span>
                            <span className="prop">placeholder</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Select"'}</span>
                        </>
                    ),
                },
                {
                    id: 'cui_textarea',
                    title: 'CuiTextarea',
                    location: "'@components/coreui/forms';",
                    attributes: textarea,
                    display: CuiTextarea,
                    code: () => (
                        <>
                            <span className="prop">id</span>
                            <span className="equal">=</span>
                            <span className="value">{'"cui_textarea"'}</span>
                            <span> </span>
                            <span className="prop">setInput</span>
                            <span className="equal">=</span>
                            <span className="value">{'{setInput}'}</span>
                            <span> </span>
                            <span className="prop">label</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Textarea"'}</span>
                            <span> </span>
                            <span className="prop">placeholder</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Cui Textarea"'}</span>
                        </>
                    ),
                },
            ],
        },
    ];

    return (
        <Box sx={{ p: 1 }}>
            <RenderMap
                data={components}
                render={(val, key) => (
                    <Box key={key}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ pt: 1, px: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                            <WorkspacesIcon sx={{ mr: 1, height: 35, width: 35 }} />
                            {val.title}
                        </Typography>

                        {val.items && (
                            <RenderMap
                                data={val.items.sort((a, b) => a.title.localeCompare(b.title))}
                                render={(valItem, keyItem) => (
                                    <Box sx={{ ml: 4 }} key={keyItem}>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                            sx={{
                                                pt: 1,
                                                px: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                            <AdjustIcon sx={{ mr: 1, height: 25, width: 25 }} />
                                            {valItem.title}
                                        </Typography>

                                        {(valItem.display || valItem.code) && (
                                            <Box sx={{ mb: 2, ml: '50px' }}>
                                                {valItem.display && (
                                                    <Box
                                                        sx={{
                                                            px: 2,
                                                            py: 1,
                                                            pb: 2,
                                                            borderTop:
                                                                '1px solid rgba(224, 224, 224, 1)',
                                                            borderLeft:
                                                                '1px solid rgba(224, 224, 224, 1)',
                                                            borderRight:
                                                                '1px solid rgba(224, 224, 224, 1)',
                                                            borderRadius: '5px 5px 0 0',
                                                        }}>
                                                        {
                                                            <valItem.display
                                                                id={valItem.id}
                                                                setInput={setForm}
                                                                {...form[valItem.id]}
                                                            />
                                                        }
                                                    </Box>
                                                )}
                                                {valItem.code && (
                                                    <pre
                                                        style={{
                                                            padding: '0.5rem',
                                                            color: '#ccc',
                                                            backgroundColor: '#2d2d2d',
                                                            borderRadius: '0 0 5px 5px',
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
                                                                '& .arrow': {
                                                                    color: '#e2777a',
                                                                },
                                                                '& .component': {
                                                                    color: '#f8c555',
                                                                },
                                                                '& .prop': {
                                                                    color: '#e2777a',
                                                                },
                                                                '& .equal': {
                                                                    color: '#39f',
                                                                },
                                                                '& .value': {
                                                                    color: '#7ec699',
                                                                },
                                                            }}>
                                                            <span className="arrow">{'<'}</span>
                                                            <span className="component">
                                                                {valItem.title}
                                                            </span>
                                                            <span> </span>
                                                            <span>{<valItem.code />}</span>
                                                            <span> </span>
                                                            <span className="arrow">{'/>'}</span>
                                                        </Typography>
                                                    </pre>
                                                )}
                                            </Box>
                                        )}

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
                                                <span>{`{ ${valItem.title} }`}</span>
                                                <span> </span>
                                                <span className="from">from</span>
                                                <span> </span>
                                                <span className="location">{valItem.location}</span>
                                            </Typography>
                                        </pre>

                                        {valItem.attributes && (
                                            <TableContainer
                                                component={Paper}
                                                sx={{
                                                    ml: '50px',
                                                    boxShadow: 'none',
                                                    width: 'auto',
                                                }}>
                                                <Table size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '600',
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                }}>
                                                                Property
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '600',
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                }}>
                                                                Type
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '600',
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                }}>
                                                                Default
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '600',
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                }}>
                                                                Required
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '600',
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                }}>
                                                                Description
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        <RenderMap
                                                            data={valItem.attributes}
                                                            render={(valAtt, keyAtt) => (
                                                                <TableRow key={keyAtt}>
                                                                    <TableCell
                                                                        sx={{
                                                                            fontSize: '16px',
                                                                            fontWeight: 'bolder',
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                        }}
                                                                        children={valAtt.property}
                                                                    />
                                                                    <TableCell
                                                                        sx={{
                                                                            color: '#d63384',
                                                                            fontSize: '16px',
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
                                                                        }}
                                                                        children={valAtt.type}
                                                                    />
                                                                    <TableCell
                                                                        sx={{
                                                                            fontSize: '16px',
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                        }}
                                                                        children={valAtt.default}
                                                                    />
                                                                    <TableCell
                                                                        sx={{
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            color: valAtt.required === 'true' ? 'error.main' : 'secondary.main',
                                                                            fontSize: '16px',
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                        }}
                                                                        children={valAtt.required}
                                                                    />
                                                                    <TableCell
                                                                        sx={{
                                                                            fontSize: '16px',
                                                                            // eslint-disable-next-line prettier/prettier
                                                                            fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                                                        }}
                                                                        children={
                                                                            valAtt.description
                                                                        }
                                                                    />
                                                                </TableRow>
                                                            )}
                                                        />
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}

                                        {val.items.length !== keyItem + 1 && <br />}
                                    </Box>
                                )}
                            />
                        )}

                        {components.length !== key + 1 && <Divider sx={{ ml: 2 }} />}
                    </Box>
                )}
            />
        </Box>
    );
};

export default Coreui;
