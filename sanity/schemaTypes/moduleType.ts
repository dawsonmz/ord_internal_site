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
            name: 'short_text',
            title: 'Short Text',
            type: 'array',
            of: [ { type: 'block' } ],
        },
        {
            name: 'detailed_text',
            title: 'Detailed Text',
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
        prepare(value: Record<string, any>) {
            const { title, category, minutes } = value;
            return {
                title: `[${category}] ${title}`,
                subtitle: `${minutes} min`,
            };
        },
    },
};