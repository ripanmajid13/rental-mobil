// import React, { memo, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';

// // import { FormPageLoading } from '@helpers/form';

// const Form = () => {
//     // return <pre>{JSON.stringify(useLocation().state, null, 2)}</pre>;
//     // let params = useParams();

//     // const [formInput, setFormInput] = useState({
//     //     first_name: {
//     //         value: '',
//     //         type: 'text',
//     //         label: 'First Name',
//     //         placeholder: 'First Name',
//     //         required: true,
//     //         gridSm: 4,
//     //     },
//     //     last_name: {
//     //         value: '',
//     //         type: 'text',
//     //         label: 'Last Name',
//     //         placeholder: 'Last Name',
//     //         required: true,
//     //         gridSm: 4,
//     //     },
//     //     date_of_birth: {
//     //         value: '',
//     //         type: 'date',
//     //         label: 'Date Of Birth',
//     //         placeholder: 'Date Of Birth',
//     //         required: true,
//     //         gridSm: 2,
//     //     },
//     //     active: {
//     //         value: '',
//     //         valueDefault: 'true',
//     //         type: 'select',
//     //         label: 'Active',
//     //         placeholder: 'Active',
//     //         required: true,
//     //         gridSm: 2,
//     //     },
//     //     email: {
//     //         value: '',
//     //         type: 'text',
//     //         valueType: 'email',
//     //         label: 'Email',
//     //         placeholder: 'Email',
//     //         required: true,
//     //     },
//     //     username: {
//     //         value: '',
//     //         type: 'text',
//     //         label: 'Username',
//     //         placeholder: 'Username',
//     //         required: true,
//     //     },
//     //     password: {
//     //         value: '',
//     //         type: 'text',
//     //         valueEncrypt: true,
//     //         label: 'Password',
//     //         placeholder: 'Password',
//     //         required: true,
//     //         ...(params.id && {
//     //             note: 'Ignore it if it will not be changed.',
//     //         }),
//     //     },
//     //     permissions: {
//     //         value: '',
//     //         valueEdit: 'permissions_id',
//     //         type: 'select',
//     //         multiple: true,
//     //         label: 'Permissions',
//     //         placeholder: 'Permissions',
//     //         gridSm: 12,
//     //     },
//     // });

//     // return (
//     //     <FormPageLoading
//     //         home="/privileges-user"
//     //         input={formInput}
//     //         setInput={setFormInput}
//     //         {...(params.id
//     //             ? {
//     //                   type: 'edit',
//     //                   method: 'PUT',
//     //                   action: `/${params.id}/update`,
//     //                   repeat: false,
//     //               }
//     //             : {
//     //                   type: 'create',
//     //                   method: 'POST',
//     //                   action: '/store',
//     //                   repeat: true,
//     //               })}
//     //     />
//     // );
// };

// export default memo(Form);

import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

import { CCol, CRow } from '@coreui/react';
import { CuiVerDate, CuiVerInput, CuiVerSelect } from '@components/coreui/vertical';

import { FormPage } from '@helpers/form';

const Form = () => {
    return (
        <FormPage
            {...useLocation().state}
            schema={z.object({
                first_name: z.string().nonempty({
                    message: 'The first name field is required.',
                }),
                last_name: z.string().nonempty({
                    message: 'The last name field is required.',
                }),
                date_of_birth: z.string().nonempty({
                    message: 'The date of birth field is required.',
                }),
                active: z.string().nonempty({
                    message: 'The active field is required.',
                }),
                email: z.string().email().nonempty({
                    message: 'The email field is required.',
                }),
                username: z.string().nonempty({
                    message: 'The username field is required.',
                }),
                password: z.string().nonempty({
                    message: 'The password field is required.',
                }),
                permissions: z.string().optional(),
            })}
            children={(props) => (
                <CRow>
                    <CCol xs={12} sm={4}>
                        <div className="mb-2">
                            <CuiVerInput {...props} name="first_name" label="First Name" />
                        </div>
                    </CCol>

                    <CCol xs={12} sm={4}>
                        <div className="mb-2">
                            <CuiVerInput {...props} name="last_name" label="Last Name" />
                        </div>
                    </CCol>

                    <CCol xs={12} sm={2}>
                        <div className="mb-2">
                            <CuiVerDate {...props} name="date_of_birth" label="Date Of Birth" />
                        </div>
                    </CCol>

                    <CCol xs={12} sm={2}>
                        <div className="mb-2">
                            <CuiVerSelect
                                {...props}
                                name="active"
                                label="Active"
                                options={[
                                    { value: 'true', label: 'True' },
                                    { value: 'false', label: 'False' },
                                ]}
                            />
                        </div>
                    </CCol>

                    <CCol xs={12} sm={4}>
                        <div className="mb-2">
                            <CuiVerInput {...props} name="email" label="Email" />
                        </div>
                    </CCol>

                    <CCol xs={12} sm={4}>
                        <div className="mb-2">
                            <CuiVerInput {...props} name="username" label="Username" />
                        </div>
                    </CCol>

                    <CCol xs={12} sm={4}>
                        <div className="mb-2">
                            <CuiVerInput
                                {...props}
                                name="password"
                                label="Password"
                                note={
                                    useLocation().state.data?.id &&
                                    'Ignore it if it will not be changed.'
                                }
                            />
                        </div>
                    </CCol>

                    <CCol xs={12}>
                        <div className="mb-2">
                            <CuiVerSelect
                                {...props}
                                name="permissions"
                                label="Permissions"
                                labelRequired={false}
                                isMulti={true}
                                options={[
                                    { value: 1, label: 'A' },
                                    { value: 2, label: 'B' },
                                ]}
                            />
                        </div>
                    </CCol>
                </CRow>
            )}
        />
    );
};

export default memo(Form);
