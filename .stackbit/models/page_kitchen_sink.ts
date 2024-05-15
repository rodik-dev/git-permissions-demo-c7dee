import { DocumentStringLikeFieldNonLocalized, Model } from '@stackbit/types';
import { generateAction, translateAction } from '../../utils/actions';

export const page_kitchen_sink: Model = {
    name: 'page_kitchen_sink',
    label: 'Page',
    type: 'page',
    urlPath: '/{slug}',
    filePath: 'content/pages/{slug}.md',
    hideContent: true,
    preview: ({ document }) => {
        const titleField = document.fields.string_field as DocumentStringLikeFieldNonLocalized;
        return {
            title: `Page ${titleField?.value ?? 'default'}`
        };
    },
    fieldGroups: [
        {
            name: 'enums',
            label: 'Enums',
            icon: 'table-list'
        },
        {
            name: 'images',
            label: 'Images',
            icon: 'image'
        },
        {
            name: 'nested',
            label: 'Nested',
            icon: 'list-tree'
        },
        {
            name: 'references',
            label: 'References',
            icon: 'link'
        }
    ],
    fields: [
        {
            type: 'string',
            name: 'string_field'
        },
        {
            type: 'string',
            name: 'string_required',
            description: 'Required field, if not specified a validation error will be shown',
            required: true,
            actions: [
                {
                    name: 'upper-action',
                    label: 'Upper action',
                    run: async (options) => {
                        const document = options.parentDocument;
                        const currentTitleField = document.fields.string_required;
                        if (!currentTitleField || !('value' in currentTitleField)) return;
                        const sanitizedTitle = currentTitleField.value.toUpperCase().trim();
                        options.contentSourceActions.updateDocument({
                            document,
                            userContext: options.getUserContextForContentSourceType(document.srcType),
                            operations: [
                                {
                                    opType: 'set',
                                    fieldPath: ['string_required'],
                                    modelField: options.modelField,
                                    field: { type: 'string', value: sanitizedTitle }
                                }
                            ]
                        });
                    },
                    permissions: (options) => {
                        if (options.userContext.role === 'only-page') {
                            return {
                                canExecute: false
                            };
                        }
                        return {
                            canExecute: true
                        };
                    }
                },
                {
                    name: 'lower-action',
                    label: 'Lower action',
                    run: async (options) => {
                        const document = options.parentDocument;
                        const currentTitleField = document.fields.string_required;
                        if (!currentTitleField || !('value' in currentTitleField)) return;
                        const sanitizedTitle = currentTitleField.value.toLowerCase().trim();
                        options.contentSourceActions.updateDocument({
                            document,
                            userContext: options.getUserContextForContentSourceType(document.srcType),
                            operations: [
                                {
                                    opType: 'set',
                                    fieldPath: ['string_required'],
                                    modelField: options.modelField,
                                    field: { type: 'string', value: sanitizedTitle }
                                }
                            ]
                        });
                    }
                }
            ]
        },
        {
            type: 'json',
            name: 'json_custom',
            controlType: 'custom-inline-html',
            controlFilePath: '.stackbit/custom-controls/dist/custom-string.html',
            description: 'Required field, if not specified a validation error will be shown',
            required: true
        },
        {
            type: 'list',
            name: 'string_list',
            items: {
                type: 'string'
            }
        },
        {
            type: 'color',
            name: 'color'
        },
        {
            type: 'text',
            name: 'multiline_text_field',
            description: 'Multiline text field, press "Shift + Return" to add a new line',
            actions: [generateAction, translateAction]
        },
        {
            type: 'markdown',
            name: 'markdown_field'
        },
        {
            type: 'boolean',
            name: 'boolean_field'
        },
        {
            type: 'number',
            name: 'number_integer',
            description: 'Integer number, allows only whole numbers'
        },
        {
            type: 'number',
            subtype: 'float',
            name: 'number_float',
            description: 'Decimal number, allows fractional numbers'
        },
        {
            type: 'number',
            name: 'number_slider',
            description: 'Number field with a slider control, min, max, step and unit properties',
            controlType: 'slider',
            min: 0,
            max: 100,
            step: 10,
            unit: '%'
        },
        {
            type: 'list',
            name: 'number_list',
            items: {
                type: 'number'
            }
        },
        {
            type: 'date',
            name: 'date_field'
        },
        {
            type: 'datetime',
            name: 'datetime_field'
        },
        {
            type: 'enum',
            name: 'enum_dropdown',
            group: 'enums',
            options: [
                {
                    label: 'Option 1',
                    value: 'option_1'
                },
                {
                    label: 'Option 2',
                    value: 'option_2'
                },
                {
                    label: 'Option 3',
                    value: 'option_3'
                }
            ]
        },
        {
            type: 'enum',
            name: 'enum_button_group',
            group: 'enums',
            controlType: 'button-group',
            options: [
                {
                    label: 'Option 1',
                    value: 'option_1'
                },
                {
                    label: 'Option 2',
                    value: 'option_2'
                },
                {
                    label: 'Option 3',
                    value: 'option_3'
                }
            ]
        },
        {
            type: 'enum',
            name: 'enum_palette',
            group: 'enums',
            controlType: 'palette',
            options: [
                {
                    value: 'option-1',
                    label: 'Option 1',
                    textColor: '#FFFFFF',
                    backgroundColor: '#000000'
                },
                {
                    value: 'option-2',
                    label: 'Option 2',
                    textColor: '#000000',
                    backgroundColor: '#FFFF00',
                    borderColor: '#000000'
                },
                {
                    value: 'option-3',
                    label: 'Option 3',
                    textColor: '#FF0000',
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FF0000'
                }
            ]
        },
        {
            type: 'list',
            name: 'enum_list',
            group: 'enums',
            items: {
                type: 'enum',
                options: ['option-1', 'option-2', 'option-3']
            }
        },
        {
            type: 'list',
            name: 'enum_list_checkbox',
            group: 'enums',
            controlType: 'checkbox',
            items: {
                type: 'enum',
                options: ['option-1', 'option-2', 'option-3']
            }
        },
        {
            type: 'image',
            name: 'image_field',
            group: 'images'
        },
        {
            type: 'list',
            name: 'image_list',
            group: 'images',
            items: {
                type: 'image'
            }
        },
        {
            type: 'image',
            source: 'cloudinary',
            name: 'image_cloudinary',
            group: 'images'
        },
        {
            type: 'list',
            name: 'image_cloudinary_list',
            group: 'images',
            items: {
                type: 'image',
                source: 'cloudinary'
            }
        },
        {
            type: 'image',
            source: 'bynder',
            name: 'image_bynder',
            group: 'images'
        },
        {
            type: 'list',
            name: 'image_bynder_list',
            group: 'images',
            items: {
                type: 'image',
                source: 'bynder'
            }
        },
        {
            type: 'image',
            source: 'unsplash',
            name: 'image_unsplash',
            group: 'images'
        },
        {
            type: 'list',
            name: 'image_unsplash_list',
            group: 'images',
            items: {
                type: 'image',
                source: 'unsplash'
            }
        },
        {
            type: 'object',
            name: 'object_field',
            group: 'nested',
            actions: [
                {
                    type: 'object',
                    name: 'object_action',
                    label: 'Object Action',
                    run: async (options) => {
                        const logger = options.getLogger();
                        logger.debug('running object action');
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                logger.debug('resolving object action');
                                resolve(null);
                            }, 10000);
                        });
                        logger.debug('finished object action');
                    }
                },
                {
                    type: 'field',
                    name: 'object_field_action',
                    label: 'Object Field Action',
                    run: async (options) => {
                        const logger = options.getLogger();
                        logger.debug('running object field action');
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                logger.debug('resolving object field action');
                                resolve(null);
                            }, 10000);
                        });
                        logger.debug('finished object field action');
                    }
                }
            ],
            fields: [
                {
                    type: 'string',
                    name: 'string_field'
                },
                {
                    type: 'image',
                    name: 'image_field'
                },
                {
                    type: 'list',
                    name: 'string_list',
                    items: {
                        type: 'string'
                    }
                },
                {
                    type: 'object',
                    name: 'object_field',
                    fields: [
                        {
                            type: 'string',
                            name: 'string_required',
                            required: true
                        }
                    ]
                },
                {
                    type: 'list',
                    name: 'object_list',
                    items: {
                        type: 'object',
                        fields: [
                            {
                                type: 'string',
                                name: 'string_field'
                            }
                        ]
                    }
                },
                {
                    type: 'model',
                    name: 'model_single',
                    models: ['object_model_1']
                },
                {
                    type: 'model',
                    name: 'model_multiple',
                    models: ['object_model_1', 'object_model_2']
                },
                {
                    type: 'reference',
                    name: 'reference_data_single',
                    models: ['data_model_1']
                },
                {
                    type: 'reference',
                    name: 'reference_data_multiple',
                    models: ['data_model_1', 'data_model_2']
                },
                {
                    type: 'list',
                    name: 'model_single_list',
                    items: {
                        type: 'model',
                        models: ['object_model_1']
                    }
                },
                {
                    type: 'list',
                    name: 'model_multiple_list',
                    items: {
                        type: 'model',
                        models: ['object_model_1', 'object_model_2']
                    }
                }
            ]
        },
        {
            type: 'list',
            name: 'object_list',
            group: 'nested',
            items: {
                type: 'object',
                fields: [
                    {
                        type: 'string',
                        name: 'string_field'
                    }
                ]
            }
        },
        {
            type: 'model',
            name: 'model_single',
            group: 'nested',
            models: ['object_model_1'],
            actions: [
                {
                    name: 'model_field_action',
                    label: 'Model Field Action',
                    run: async (options) => {
                        const logger = options.getLogger();
                        logger.debug('running model field action');
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                logger.debug('resolving model field action');
                                resolve(null);
                            }, 10000);
                        });
                        logger.debug('finished model field action');
                    }
                }
            ]
        },
        {
            type: 'model',
            name: 'model_multiple',
            group: 'nested',
            models: ['object_model_1', 'object_model_2']
        },
        {
            type: 'list',
            name: 'model_single_list',
            group: 'nested',
            items: {
                type: 'model',
                models: ['object_model_1']
            }
        },
        {
            type: 'list',
            name: 'model_multiple_list',
            group: 'nested',
            items: {
                type: 'model',
                models: ['object_model_1', 'object_model_2']
            }
        },
        {
            type: 'reference',
            name: 'reference_data_single',
            group: 'references',
            models: ['data_model_1']
        },
        {
            type: 'reference',
            name: 'reference_data_multiple',
            group: 'references',
            models: ['data_model_1', 'data_model_2']
        },
        {
            type: 'reference',
            name: 'reference_page_single',
            group: 'references',
            models: ['page_model_1']
        },
        {
            type: 'reference',
            name: 'reference_page_multiple',
            group: 'references',
            models: ['page_model_1', 'page_model_2']
        },
        {
            type: 'list',
            name: 'reference_data_single_list',
            group: 'references',
            items: {
                type: 'reference',
                models: ['data_model_1']
            }
        },
        {
            type: 'list',
            name: 'reference_data_multiple_list',
            group: 'references',
            items: {
                type: 'reference',
                models: ['data_model_1', 'data_model_2']
            }
        },
        {
            type: 'list',
            name: 'reference_page_single_list',
            group: 'references',
            items: {
                type: 'reference',
                models: ['page_model_1']
            }
        },
        {
            type: 'list',
            name: 'reference_page_multiple_list',
            group: 'references',
            items: {
                type: 'reference',
                models: ['page_model_1', 'page_model_2']
            }
        }
    ]
};
