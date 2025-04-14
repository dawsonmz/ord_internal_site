export const moduleType = {
    name: 'module',
    title: 'Module',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        },
        {
            name: 'minutes',
            title: 'Minutes',
            type: 'number',
        },
        {
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [ { type: 'block' } ],
        },
    ],
};