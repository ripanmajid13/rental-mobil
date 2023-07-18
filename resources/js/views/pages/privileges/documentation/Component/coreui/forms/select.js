const select = [
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
        property: 'clearable',
        type: 'bool',
        default: 'true',
        required: 'false',
        description: '-',
    },
    {
        property: 'searchable',
        type: 'bool',
        default: 'false',
        required: 'false',
        description: '-',
    },
    {
        property: 'multiple',
        type: 'bool',
        default: 'false',
        required: 'false',
        description: '-',
    },
    {
        property: 'options',
        type: 'array[{ value: "", label: "" }]',
        default: '[]',
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

export default select;