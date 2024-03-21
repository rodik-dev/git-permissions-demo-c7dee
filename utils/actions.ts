import { CustomActionField, DocumentStringLikeFieldNonLocalized } from '@stackbit/types';
import { generateTopic, translate } from './chatgpt';

export const generateAction: CustomActionField = {
    name: 'generate_action',
    label: 'Generate',
    icon: 'text',
    inputFields: [
        {
            type: 'string',
            name: 'topic',
            label: 'Topic',
            required: true
        },
        {
            type: 'number',
            name: 'sentence_count',
            label: 'Sentence Count',
            required: true
        }
    ],
    run: async (options) => {
        const logger = options.getLogger();
        logger.debug('running generate action');

        // Send the current field value and the selected language to ChatGPT to translate
        const newValue = await generateTopic(options.inputData?.topic, options.inputData?.sentence_count);

        // Update the document field with the translated value
        await options.contentSourceActions.updateDocument({
            document: options.parentDocument,
            userContext: options.getUserContextForContentSourceType(options.parentDocument.srcType),
            operations: [
                {
                    opType: 'set',
                    fieldPath: options.fieldPath,
                    modelField: options.modelField,
                    field: {
                        type: 'string',
                        value: newValue
                    }
                }
            ]
        });

        logger.debug('finished generate action');
    }
};

export const translateAction: CustomActionField = {
    name: 'translate_action',
    label: 'Translate',
    icon: 'globe',
    inputFields: [
        {
            type: 'enum',
            name: 'language',
            label: 'Language',
            default: 'english',
            required: true,
            options: [
                { label: 'English', value: 'english' },
                { label: 'French', value: 'french' },
                { label: 'Spanish', value: 'spanish' }
            ]
        }
    ],
    state: async (options) => {
        // Get the current document field and its value.
        // We can safely cast the field to DocumentStringLikeFieldNonLocalized
        const docField = options.documentField as DocumentStringLikeFieldNonLocalized | undefined;
        const value = docField?.value;
        return value?.length ? 'enabled' : 'disabled';
    },
    run: async (options) => {
        const logger = options.getLogger();
        logger.debug('running translate action');

        // Get the current document field and its value.
        // We can safely cast the field to DocumentStringLikeFieldNonLocalized
        const docField = options.documentField as DocumentStringLikeFieldNonLocalized | undefined;
        const value = docField?.value;

        // If value is not set, return an error. Generally, this shouldn't happen because
        // if the value is empty, the state of the action would be disabled.
        if (!value?.length) {
            return {
                error: 'The field value is empty'
            };
        }

        // If the language wasn't provided, return an error
        if (!options.inputData?.language) {
            return {
                error: 'The language was not provided value is empty'
            };
        }

        // Send the current field value and the selected language to ChatGPT to translate
        const newValue = await translate(value, options.inputData?.language);

        // Update the document field with the translated value
        await options.contentSourceActions.updateDocument({
            document: options.parentDocument,
            userContext: options.getUserContextForContentSourceType(options.parentDocument.srcType),
            operations: [
                {
                    opType: 'set',
                    fieldPath: options.fieldPath,
                    modelField: options.modelField,
                    field: {
                        type: 'string',
                        value: newValue
                    }
                }
            ]
        });

        logger.debug('finished translate action');
    }
};
