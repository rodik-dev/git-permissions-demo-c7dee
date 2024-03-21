import { Model } from '@stackbit/types';

export const page_model_2: Model = {
    name: 'page_model_2',
    type: 'page',
    filePath: 'content/pages/{slug}.md',
    hideContent: true,
    fields: [
        {
            type: 'string',
            name: 'string_field'
        },
        {
            type: 'string',
            name: 'string_default',
            default: 'the default value'
        }
    ]
};
