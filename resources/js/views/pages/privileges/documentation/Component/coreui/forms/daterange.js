const daterange = [
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
        type: 'string, number, Date()',
        default: "''",
        required: 'false',
        description: '-',
    },
    {
        property: 'required',
        type: 'bool',
        default: 'false',
        required: 'false',
        description: '-',
    },
    {
        property: 'requiredLabel',
        type: 'bool',
        default: 'true',
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
        property: 'disabled',
        type: 'bool',
        default: 'false',
        required: 'false',
        description: '-',
    },
];

export default daterange;
