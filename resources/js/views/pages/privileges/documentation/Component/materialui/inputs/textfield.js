const textfield = [
    {
        property: 'id',
        type: 'string',
        default: '-',
        required: 'true',
        description: '-',
    },
    {
        property: 'setInput',
        type: 'func',
        default: '-',
        required: 'true',
        description: '-',
    },
    {
        property: 'label',
        type: 'string',
        default: '-',
        required: 'true',
        description: '-',
    },
    {
        property: 'placeholder',
        type: 'string',
        default: '-',
        required: 'false',
        description: '-',
    },
    {
        property: 'value',
        type: 'string',
        default: "''",
        required: 'false',
        description: '-',
    },
    {
        property: 'valueType',
        type: "'text', 'password'",
        default: 'text',
        required: 'false',
        description: '-',
    },
    {
        property: 'labelRequired',
        type: 'bool',
        default: 'true',
        required: 'false',
        description: '-',
    },
    {
        property: 'InputProps',
        type: 'object',
        default: '-',
        required: 'false',
        description: '-',
    },
    {
        property: 'invalid',
        type: 'string',
        default: "''",
        required: 'false',
        description: '-',
    },
    {
        property: 'theme',
        type: "'white', 'dark'",
        default: 'white',
        required: 'false',
        description: '-',
    },
];

export default textfield;
