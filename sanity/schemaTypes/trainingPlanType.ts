export const trainingPlanType = {
    name: 'training_plan',
    title: 'Training Plan',
    type: 'document',
    fields: [
        {
            name: 'lesson_number',
            title: 'Lesson Number',
            type: 'number',
        },
        {
            name: 'season',
            title: 'Season',
            type: 'reference',
            to: [{ type: 'season' }],
        },
        {
            name: 'date_time',
            title: 'Date and Time',
            type: 'datetime',
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'string',
        },
        {
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'module' }],
                }
            ],
        },
    ],
    preview: {
        select: {
            season: 'season.season',
            year: 'season.year',
            lesson_number: 'lesson_number',
            date_time: 'date_time',
        },
        prepare(selection: { season: String; year: String; lesson_number: Number; date_time: String; }) {
            const { season, year, lesson_number, date_time } = selection;
            return {
                title: `${season} ${year} - Lesson ${lesson_number}`,
                subtitle: new Date(date_time.valueOf()).toLocaleDateString('en-GB', { dateStyle: 'full' }),
            };
        },
    },
};
