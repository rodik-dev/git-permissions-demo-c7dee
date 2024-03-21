import { Model } from '@stackbit/types';

export const data_model_2: Model = {
    name: 'data_model_2',
    type: 'data',
    labelField: 'string_field',
    filePath: 'content/data/{slug}.md',
    fields: [
        {
            type: 'string',
            name: 'string_field'
        },
        {
            type: 'string',
            name: 'string_default',
            default: 'the default value'
        },
        {
            type: 'reference',
            name: 'referenceSingleToNonDuplicatable',
            models: ['data_model_1']
        },
        {
            type: 'reference',
            name: 'referenceSingleToDuplicatable',
            models: ['data_model_2']
        }
    ]
};
