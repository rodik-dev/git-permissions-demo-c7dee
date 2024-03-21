import { Model } from '@stackbit/types';

export const page_model_1: Model = {
    name: 'page_model_1',
    type: 'page',
    filePath: async ({ data }) => {
        return `content/pages/${data.slug.replace(/\W+/g, '-')}.md`;
    },
    hideContent: false,
    fields: [
        {
            type: 'string',
            name: 'title'
        },
        {
            type: 'slug',
            name: 'slug',
            required: true
        },
        {
            type: 'date',
            name: 'date'
        }
    ]
};
