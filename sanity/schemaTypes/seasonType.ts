export const seasonType = {
    name: 'season',
    title: 'Season',
    type: 'document',
    fields: [
        {
            name: 'season',
            title: 'Season',
            type: 'string',
            options: {
                list: [
                    'Spring',
                    'Fall',
                ],
            },
        },
        {
            name: 'year',
            title: 'Year',
            type: 'number',
        },
    ],
    preview: {
        select: {
            season: 'season',
            year: 'year',
        },
        prepare(selection: { season: String; year: Number }) {
            const { season, year } = selection;
            return {
                title: `${season} ${year}`,
            };
        },
    },
};