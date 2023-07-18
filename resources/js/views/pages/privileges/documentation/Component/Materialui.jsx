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
import { MuiButton, MuiTextField } from '@components/materialui/inputs';

import { RenderMap } from '@helpers/render';

import button from './materialui/inputs/button';
import textfield from './materialui/inputs/textfield';

const Materialui = () => {
    const [form, setForm] = useState({
        mui_textfield: {
            label: 'Mui Text Field',
            placeholder: 'Mui Text Field',
        },
    });

    const components = [
        {
            title: 'Feedback',
        },
        {
            title: 'Inputs',
            items: [
                {
                    form: false,
                    title: 'MuiButton',
                    location: "'@components/materialui/inputs';",
                    attributes: button,
                    display: () => (
                        <>
                            <MuiButton
                                sx={{ mb: 1 }}
                                variant="outlined"
                                color="primary"
                                children="Button 1"
                            />

                            <MuiButton
                                color="success"
                                startIcon={<AdjustIcon />}
                                loadingButton={true}
                                loadingProcess={true}
                                children="Button 2"
                            />
                        </>
                    ),
                    code: () => (
                        <>
                            <span className="arrow">{'<'}</span>
                            <span className="component">MuiButton</span>
                            <span> </span>
                            <span className="prop">variant</span>
                            <span className="equals">=</span>
                            <span className="value">&quot;outlined&quot;</span>
                            <span> </span>
                            <span className="prop">color</span>
                            <span className="equals">=</span>
                            <span className="value">&quot;primary&quot;</span>
                            <span> </span>
                            <span className="prop">children</span>
                            <span className="equals">=</span>
                            <span className="value">&quot;Button 1&quot;</span>
                            <span> </span>
                            <span className="arrow">{'/>'}</span>
                            <br />
                            <span className="arrow">{'<'}</span>
                            <span className="component">MuiButton</span>
                            <span> </span>
                            <span className="prop">color</span>
                            <span className="equals">=</span>
                            <span className="value">&quot;success&quot;</span>
                            <span> </span>
                            <span className="prop">loadingButton</span>
                            <span className="equals">=</span>
                            <span className="value">{'{true}'}</span>
                            <span> </span>
                            <span className="prop">loadingProcess</span>
                            <span className="equals">=</span>
                            <span className="value">{'{true}'}</span>
                            <span> </span>
                            <span className="prop">children</span>
                            <span className="equals">=</span>
                            <span className="value">&quot;Button 2&quot;</span>
                            <span> </span>
                            <span className="arrow">{'/>'}</span>
                        </>
                    ),
                },
                {
                    form: true,
                    id: 'mui_textfield',
                    title: 'MuiTextField',
                    location: "'@components/materialui/inputs';",
                    attributes: textfield,
                    display: MuiTextField,
                    code: () => (
                        <>
                            <span className="prop">id</span>
                            <span className="equal">=</span>
                            <span className="value">{'"mui_textfield"'}</span>
                            <span> </span>
                            <span className="prop">setInput</span>
                            <span className="equal">=</span>
                            <span className="value">{'{setInput}'}</span>
                            <span> </span>
                            <span className="prop">label</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Mui Text Field"'}</span>
                            <span> </span>
                            <span className="prop">placeholder</span>
                            <span className="equal">=</span>
                            <span className="value">{'"Mui Text Field"'}</span>
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

                                        {valItem.form === true
                                            ? (valItem.display || valItem.code) && (
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
                                                                  <span className="arrow">
                                                                      {'<'}
                                                                  </span>
                                                                  <span className="component">
                                                                      {valItem.title}
                                                                  </span>
                                                                  <span> </span>
                                                                  <span>{<valItem.code />}</span>
                                                                  <span> </span>
                                                                  <span className="arrow">
                                                                      {'/>'}
                                                                  </span>
                                                              </Typography>
                                                          </pre>
                                                      )}
                                                  </Box>
                                              )
                                            : (valItem.display || valItem.code) && (
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
                                                              {<valItem.display />}
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
                                                                  {<valItem.code />}
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

export default Materialui;
