import React from 'react';
import { KitchenSinkPage } from '../types/content';
import { Field } from './Field';

const ENUM_OPTIONS_VALIDATION = 'enum options: option-1, option-2, option3';

export type Props = {
    page: KitchenSinkPage;
};

export function PageKitchenSinkLayout({ page }: React.PropsWithChildren<Props>) {
    return (
        <div className="ml-12 my-12 prose dark:prose-invert" data-sb-object-id={page.id}>
            <h1>Kitchen Sink Page</h1>
            <ul className="list-none pl-0">
                <li>
                    page type: <span className="text-orange-800 font-bold font-mono">{page.type}</span>
                </li>
                <li>
                    page id: <span className="text-orange-800 font-bold font-mono">{page.id}</span>
                </li>
                <li>
                    page filePath: <span className="text-orange-800 font-bold font-mono">{page.__filePath}</span>
                </li>
                <li>
                    page urlPath: <span className="text-orange-800 font-bold font-mono">{page.__urlPath}</span>
                </li>
            </ul>
            <h2>Test instructions</h2>
            <p>
                For every field, start the test when the field&#39;s value is empty, the value of that field on the page should be{' '}
                <span className="text-orange-800 font-bold font-mono">undefined</span>. Then set any value and validate that the page was updated with the
                correct value. Delete the value to go back to the <span className="text-orange-800 font-bold font-mono">undefined</span> state. This test
                validates that Stackbit removes data fields when removing their values.
            </p>
            <p>
                For any &quot;list&quot; fields, start the test when the list is empty, then add at least 3 values, reorder them, and then remove them to get
                back to the <span className="text-orange-800 font-bold font-mono">undefined</span> state.
            </p>
            <h2>Simple Fields</h2>
            <ul className="list-none pl-0">
                <li>
                    <Field label="String Field" fieldName="string_field" stackbitType="string" value={page.string_field} />
                </li>
                <li>
                    <Field label="String Required" fieldName="string_required" stackbitType="slug" validation="required" value={page.string_required} />
                </li>
                <li>
                    <Field label="JSON Custom" fieldName="json_custom" stackbitType="json" value={page.json_custom} />
                </li>
                <li>
                    <Field label="String List" fieldName="string_list" stackbitType="list of strings" value={page.string_list} />
                </li>
                <li>
                    <Field label="Color" fieldName="color" stackbitType="color" value={page.color} />
                </li>
                <li>
                    <Field label="Text Field" fieldName="multiline_text_field" stackbitType="text" value={page.multiline_text_field} />
                </li>
                <li>
                    <Field label="Markdown Field" fieldName="markdown_field" stackbitType="markdown" value={page.markdown_field} />
                </li>
                <li>
                    <Field label="Boolean Field" fieldName="boolean_field" stackbitType="boolean" value={page.boolean_field} />
                </li>
                <li>
                    <Field label="Number Integer" fieldName="number_integer" stackbitType="number" value={page.number_integer} />
                </li>
                <li>
                    <Field label="Number Float" fieldName="number_float" stackbitType="number" value={page.number_float} />
                </li>
                <li>
                    <Field label="Number Slider" fieldName="number_slider" stackbitType="number" stackbitControlType="slider" value={page.number_slider} />
                </li>
                <li>
                    <Field label="Number List" fieldName="number_list" stackbitType="list of numbers" value={page.number_list} />
                </li>
                <li>
                    <Field label="Date Field" fieldName="date_field" stackbitType="date" value={page.date_field} />
                </li>
                <li>
                    <Field label="Datetime Field" fieldName="datetime_field" stackbitType="datetime" value={page.datetime_field} />
                </li>
            </ul>
            <h2>Enum Fields</h2>
            <ul>
                <li>
                    <Field
                        label="Enum Dropdown"
                        fieldName="enum_dropdown"
                        stackbitType="enum"
                        stackbitControlType="dropdown"
                        validation={ENUM_OPTIONS_VALIDATION}
                        value={page.enum_dropdown}
                    />
                </li>
                <li>
                    <Field
                        label="Enum Button Group"
                        fieldName="enum_button_group"
                        stackbitType="enum"
                        stackbitControlType="button-group"
                        validation={ENUM_OPTIONS_VALIDATION}
                        value={page.enum_button_group}
                    />
                </li>
                <li>
                    <Field
                        label="Enum Palette"
                        fieldName="enum_palette"
                        stackbitType="enum"
                        stackbitControlType="palette"
                        validation={ENUM_OPTIONS_VALIDATION}
                        value={page.enum_palette}
                    />
                </li>
                <li>
                    <Field label="Enum List" fieldName="enum_list" stackbitType="list of enums" validation={ENUM_OPTIONS_VALIDATION} value={page.enum_list} />
                </li>
                <li>
                    <Field
                        label="Enum List Checkboxes"
                        fieldName="enum_list_checkbox"
                        stackbitType="list of enums"
                        stackbitControlType="checkbox"
                        validation={ENUM_OPTIONS_VALIDATION}
                        value={page.enum_list_checkbox}
                    />
                </li>
            </ul>
            <h2>Images</h2>
            <p>
                Before testing Cloudinary support, make sure that your Stackbit project is connected to Cloudinary.
                Bynder integration is added via adding its into stackbit.config assetSource array.
            </p>
            <ul>
                <li>
                    <Field label="Image" fieldName="image_field" stackbitType="image" value={page.image_field} />
                </li>
                <li>
                    <Field label="Image List" fieldName="image_list" stackbitType="list of images" value={page.image_list} />
                </li>
                <li>
                    <Field
                        label="Image Cloudinary"
                        fieldName="image_cloudinary"
                        stackbitType={`image with source: \"cloudinary\"`}
                        value={page.image_cloudinary}
                    />
                </li>
                <li>
                    <Field
                        label="Image Cloudinary List"
                        fieldName="image_cloudinary_list"
                        stackbitType="list of cloudinary images"
                        value={page.image_cloudinary_list}
                    />
                </li>
                <li>
                    <Field
                        label="Image Bynder"
                        fieldName="image_bynder"
                        stackbitType={`image with source: \"bynder\"`}
                        value={page.image_bynder}
                    />
                </li>
                <li>
                    <Field
                        label="Image Bynder List"
                        fieldName="image_bynder_list"
                        stackbitType="list of bynder images"
                        value={page.image_bynder_list}
                    />
                </li>
            </ul>

            <h2>Nested Objects</h2>
            <ul>
                <li>
                    <Field label="Object Field" fieldName="object_field" stackbitType="object" value={page.object_field} />
                </li>
                <li>
                    <Field label="Object List" fieldName="object_list" stackbitType="list of objects" value={page.object_list} />
                </li>
                <li>
                    <Field
                        label="Model Single"
                        fieldName="model_single"
                        stackbitType="model with single type"
                        validation="model of type object_model_1"
                        value={page.model_single}
                    />
                </li>
                <li>
                    <Field
                        label="Model Multiple"
                        fieldName="model_multiple"
                        stackbitType="model with multi-type"
                        validation="models of type object_model_1 and object_model_2"
                        value={page.model_multiple}
                    />
                </li>
                <li>
                    <Field
                        label="Model Single List"
                        fieldName="model_single_list"
                        stackbitType="list of single type models"
                        validation="model of type object_model_1"
                        value={page.model_single_list}
                    />
                </li>
                <li>
                    <Field
                        label="Model Multiple List"
                        fieldName="model_multiple_list"
                        stackbitType="list of multi-type models"
                        validation="models of type object_model_1 and object_model_2"
                        value={page.model_multiple_list}
                    />
                </li>
            </ul>

            <h2>Reference Fields</h2>
            <ul>
                <li>
                    <Field
                        label="Reference Data Single"
                        fieldName="reference_data_single"
                        stackbitType="reference"
                        validation="model of type data_model_1"
                        value={page.reference_data_single}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Data Multiple"
                        fieldName="reference_data_multiple"
                        stackbitType="reference"
                        validation="models of type data_model_1 and data_model_2"
                        value={page.reference_data_multiple}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Page Single"
                        fieldName="reference_page_single"
                        stackbitType="reference"
                        validation="model of type page_model_1"
                        value={page.reference_page_single}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Page Multiple"
                        fieldName="reference_page_multiple"
                        stackbitType="reference"
                        validation="models of type page_model_1 and page_model_2"
                        value={page.reference_page_multiple}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Data Single List"
                        fieldName="reference_data_single_list"
                        stackbitType="list of references"
                        validation="model of type data_model_1"
                        value={page.reference_data_single_list}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Data Multiple List"
                        fieldName="reference_data_multiple_list"
                        stackbitType="list of references"
                        validation="models of type data_model_1 and data_model_2"
                        value={page.reference_data_multiple_list}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Page Single List"
                        fieldName="reference_page_single_list"
                        stackbitType="list of references"
                        validation="model of type page_model_1"
                        value={page.reference_page_single_list}
                    />
                </li>
                <li>
                    <Field
                        label="Reference Page Multiple List"
                        fieldName="reference_page_multiple_list"
                        stackbitType="list of references"
                        validation="models of type page_model_1 and page_model_2"
                        value={page.reference_page_multiple_list}
                    />
                </li>
            </ul>
            <h2>Creating pages and data</h2>
            <p>This site has three page models and two data models:</p>
            <ul>
                <li>
                    <span className="text-orange-800 font-bold font-mono">page_kitchen_sink</span> - a page model you are looking at
                </li>
                <li>
                    <span className="text-orange-800 font-bold font-mono">page_model_1</span> - a page model with two string fields, one of which is required
                </li>
                <li>
                    <span className="text-orange-800 font-bold font-mono">page_model_2</span> - a page model with two string fields, one of which has a default
                    value value
                </li>
                <li>
                    <span className="text-orange-800 font-bold font-mono">data_model_1</span> - a data model with two string fields, one of which is required
                </li>
                <li>
                    <span className="text-orange-800 font-bold font-mono">data_model_2</span> - a data model with two string fields, one of which has a default
                    value value
                </li>
            </ul>
            <p>
                When creating pages or data with required fields, Stackbit should present a modal to fill in the required fields before creating these
                documents.
            </p>
            <p>When creating pages or data with default fields and without required fields, Stackbit should creating these documents with default values.</p>
            <h2>Presets</h2>
            <p>
                The <code>stackbit.yaml</code> of this project has the following configuration:
            </p>
            <pre>
                <code>{`presetReferenceBehavior: copyReference\nduplicatableModels: [data_model_2]`}</code>
            </pre>
            <p>
                This means that when creating a preset from a document and then creating new documents from a preset, the values of the <code>reference</code>{' '}
                fields will be preserved, except for the documents types included in the <code>duplicatableModels</code> array. The document types that are
                included in <code>duplicatableModels</code> array will be cloned, unless there is a cyclic reference, in which case the cycle will be broken by
                cloning the last object that causes the cycle.
            </p>
            <p>
                In this site, the <code>data_model_2</code> model is included in <code>duplicatableModels</code>, meaning that when creating documents from
                presets, links to documents of type <code>data_model_2</code> will be cloned. All other links will be preserved.
            </p>
            <h3>Test duplicatable models</h3>
            <ol>
                <li>
                    Add a new object of type <code>Data Model 1</code> to the <code>Reference Data Single</code> field on this page. Set both string fields of
                    the new object to <code>Root Data Model 1</code>
                </li>
                <li>
                    Inside the new object, create two nested objects:
                    <ul>
                        <li>
                            Add new object of type <code>Data Model 1</code> to the <code>Reference Single to Non Duplicatable</code> field. Set both string
                            fields to <code>Nested Data Model 1</code>.
                        </li>
                        <li>
                            Add new object of type <code>Data Model 2</code> to the <code>Reference Single to Duplicatable</code> field. Set both string fields
                            to <code>Nested Data Model 2</code>.
                        </li>
                    </ul>
                </li>
                <li>
                    Then create a preset from the root <code>Data Model 1</code> object.
                </li>
            </ol>
            <p>
                The data of the created preset should have a <code>referenceSingleToNonDuplicatable</code> field with an object with a <code>$$ref</code>
                field holding the ID of the existing object of type <code>data_model_1</code>. And a <code>referenceSingleToDuplicatable</code> field with a
                fully cloned <code>data_model_2</code> object.
            </p>
            <pre>
                <code>{`{
    "model": "data_model_1",
    "presets": [
        {
            "label": "Test Preset",
            "thumbnail": "images/data-model-1-test-preset-c3f0.png",
            "metadata": {
                "categories": [
                    "Test Presets"
                ],
                "canDelete": true
            },
            "data": {
                "string_field": "Root Data Model 1",
                "string_required": "Root Data Model 1",
                "referenceSingleToNonDuplicatable": {
                    "$$ref": "content/data/data_model_1-uii2a9p2s.md",
                    "$$type": "data_model_1"
                },
                "referenceSingleToDuplicatable": {
                    "string_field": "Nested Data Model 2",
                    "string_default": "Nested Data Model 2",
                    "referenceSingleToNonDuplicatable": null,
                    "referenceSingleToDuplicatable": null,
                    "$$type": "data_model_2"
                }
            }
        }
    ]
}
`}</code>
            </pre>
            <p>
                Test this preset by creating a new object from it. The <code>referenceSingleToNonDuplicatable</code> field should reference the previously
                created object. While the <code>referenceSingleToDuplicatable</code> field should contain a new object.
            </p>

            <h3>Duplicatable models with cyclic references</h3>
            <p>
                Like previously, create a new object of type <code>Data Model 1</code> to the <code>Reference Data Single</code> field. Inside the new object,
                add another object of type
                <code>Data Model 2</code> to the <code>Reference Single to Duplicatable</code> field. And inside that object add a link to itself using the{' '}
                <code>Reference Single to Duplicatable</code> field. Then create a preset from the root <code>Data Model 1</code> object.
            </p>
            <p>
                The created preset should have a <code>referenceSingleToDuplicatable</code> field with a fully cloned <code>data_model_2</code> object. That
                object should have a <code>$$ref</code> field linking to itself.
            </p>
            <pre>
                <code>{`{
    "model": "data_model_1",
    "presets": [
        {
            "label": "Test Preset",
            "thumbnail": "images/data-model-1-test-preset-c3f0.png",
            "metadata": {
                "categories": [
                    "Test Presets"
                ],
                "canDelete": true
            },
            "data": {
                "string_field": "Root Data Model 1",
                "string_required": "Root Data Model 1",
                "referenceSingleToNonDuplicatable": null,
                "referenceSingleToDuplicatable": {
                    "string_field": "Nested Data Model 2",
                    "string_default": "Nested Data Model 2",
                    "referenceSingleToNonDuplicatable": null,
                    "referenceSingleToDuplicatable": {
                        "$$ref": "content/data/data_model_2-jmotporn6.md",
                        "$$type": "data_model_2"
                    },
                    "$$type": "data_model_2"
                }
            }
        }
    ]
}
`}</code>
            </pre>
            <p>
                Test this preset by creating a new object from it. You should have a new object inside the <code>referenceSingleToDuplicatable</code>, and a
                link to a nested object within that object.
            </p>
        </div>
    );
}
