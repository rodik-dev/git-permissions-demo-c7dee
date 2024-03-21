import { Model } from '@stackbit/types';

export const page_model_2: Model = {
    name: 'page_model_2',
    type: 'page',
    filePath: 'content/pages/{slug}.md',
    hideContent: true,
    permissions: (options) => {
        // allow a specific role to edit but not publish
        if (options.userContext.sso?.attributes?.roles.includes('data_model_2_editor_role')) {
            return { canView: true, canEdit: true, canPublish: false };
        }

        // allow a specific role to edit and publish
        if (options.userContext.sso?.attributes?.roles.includes('data_model_2_publisher_role')) {
            return { canView: true, canEdit: true, canPublish: true };
        }

        // by default, no one else can view the model or it's documents
        return { canView: false, canEdit: false, canPublish: false };
    },
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
