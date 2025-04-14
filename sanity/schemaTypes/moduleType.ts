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
    preview: {
        select: {
            title: 'title',
            order: 'order',
            minutes: 'minutes',
        },
        prepare(selection: { title: String; order: Number; minutes: Number; }) {
            const { title, order, minutes } = selection;
            return {
                title: `${order}: ${title}`,
                subtitle: `${minutes} min`,
            };
        },
    },
};