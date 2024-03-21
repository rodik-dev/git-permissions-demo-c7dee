export interface BaseModel {
    __filePath: string;
    type: string;
    id: string;
}

export interface BasePageModel extends BaseModel {
    __urlPath: string;
}

export interface KitchenSinkPage extends BasePageModel {
    type: 'page_kitchen_sink';
    string_field?: string;
    string_required: string;
    json_custom: string;
    string_list?: string[];
    color?: string;
    multiline_text_field?: string;
    markdown_field?: string;
    boolean_field?: string;
    number_integer?: number;
    number_float?: number;
    number_slider?: number;
    number_list?: number[];
    date_field?: string;
    datetime_field?: string;
    enum_dropdown?: 'option_1' | 'option_2' | 'option_3';
    enum_button_group?: 'option_1' | 'option_2' | 'option_3';
    enum_palette?: 'option_1' | 'option_2' | 'option_3';
    enum_list?: ('option_1' | 'option_2' | 'option_3')[];
    enum_list_checkbox?: ('option_1' | 'option_2' | 'option_3')[];
    image_field?: string;
    image_list?: string[];
    image_cloudinary?: string;
    image_cloudinary_list?: string[];
    image_bynder?: any;
    image_bynder_list?: any[];
    object_field?: {
        string_field?: string;
        string_list?: string[];
        object_field?: {
            string_required: string;
        };
        object_list?: {
            string_field?: string;
        }[];
        model_single?: ObjectModel1;
        model_multiple?: ObjectModel1 | ObjectModel2;
        reference_data_single?: string;
        reference_data_multiple?: string;
        model_single_list?: ObjectModel1[];
        model_multiple_list?: (ObjectModel1 | ObjectModel2)[];
    };
    object_list?: {
        string_field?: string;
    }[];
    model_single?: ObjectModel1;
    model_multiple?: ObjectModel1 | ObjectModel2;
    model_single_list?: ObjectModel1[];
    model_multiple_list?: (ObjectModel1 | ObjectModel2)[];
    reference_data_single?: string;
    reference_data_multiple?: string;
    reference_page_single?: string;
    reference_page_multiple?: string;
    reference_data_single_list?: string[];
    reference_data_multiple_list?: string[];
    reference_page_single_list?: string[];
    reference_page_multiple_list?: string[];
}

export interface PageModel1 extends BasePageModel {
    type: 'page_model_1';
    title?: string;
    slug: string;
    date?: string;
    body?: stirng;
}

export interface PageModel2 extends BasePageModel {
    type: 'page_model_2';
    string_field?: string;
    string_default?: string;
}

export interface DataModel1 extends BaseModel {
    type: 'data_model_1';
    string_required: string;
}

export interface DataModel2 extends BaseModel {
    type: 'data_model_2';
    string_field?: string;
    string_default?: string;
}

export interface ObjectModel1 extends BaseModel {
    type: 'object_model_1';
    string_required: string;
}

export interface ObjectModel2 extends BaseModel {
    type: 'object_model_2';
    string_field?: string;
    string_default?: string;
}
