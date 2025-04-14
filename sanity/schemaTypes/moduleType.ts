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
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    'Routine',
                    'First training',
                    'Laterals',
                    'Transitions',
                    'C-cuts',
                ],
            },
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
            category: 'category',
            minutes: 'minutes',
        },
        prepare(selection: { title: String; category: String; minutes: Number; }) {
            const { title, category, minutes } = selection;
            return {
                title: `[${category}] ${title}`,
                subtitle: `${minutes} min`,
            };
        },
    },
};