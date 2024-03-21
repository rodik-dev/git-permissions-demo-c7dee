import { Model } from '@stackbit/types';

export const object_model_2: Model = {
    name: 'object_model_2',
    type: 'object',
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
