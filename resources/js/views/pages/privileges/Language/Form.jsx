import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

import { CCol, CRow } from '@coreui/react';
import { CuiVerInput, CuiVerTextarea } from '@components/coreui/vertical';

import { FormPage } from '@helpers/form';

const Form = () => {
    return (
        <FormPage
            {...useLocation().state}
            schema={z.object({
                key: z.string().nonempty({
                    message: 'The key field is required.',
                }),
                lang_en: z.string(),
                lang_id: z.string(),
            })}
            children={(props) => (
                <CRow>
                    <CCol xs={12}>
                        <div className="mb-2">
                            <CuiVerInput {...props} name="key" label="Key" />
                        </div>
                    </CCol>

                    <CCol xs={12}>
                        <div className="mb-2">
                            <CuiVerTextarea
                                {...props}
                                name="lang_en"
                                label="Language EN"
                                labelRequired={false}
                            />
                        </div>
                    </CCol>

                    <CCol xs={12}>
                        <div className="mb-2">
                            <CuiVerTextarea
                                {...props}
                                name="lang_id"
                                label="Language ID"
                                labelRequired={false}
                            />
                        </div>
                    </CCol>
                </CRow>
            )}
        />
    );
};

export default memo(Form);
