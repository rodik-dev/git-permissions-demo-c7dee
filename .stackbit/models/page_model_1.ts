import { Model } from '@stackbit/types';

export const page_model_1: Model = {
    name: 'page_model_1',
    type: 'page',
    filePath: async ({ data }) => {
        return `content/pages/${data.slug.replace(/\W+/g, '-')}.md`;
    },
    hideContent: false,
    permissions: (options) => {
        // allow a specific role to edit but not publish
        if (options.userContext.sso?.attributes?.groups?.includes('data_model_1_editor_role')) {
            return { canView: true, canEdit: true, canPublish: false };
        }

        // allow a specific role to edit and publish
        if (options.userContext.sso?.attributes?.groups?.includes('data_model_1_publisher_role')) {
            return { canView: true, canEdit: true, canPublish: true };
        }

        // by default, no one else can edit or publish
        return { canView: true, canEdit: true, canPublish: true };
    },
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
