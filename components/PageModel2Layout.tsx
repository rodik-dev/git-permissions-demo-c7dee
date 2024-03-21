import React from 'react';
import { PageModel2 } from '../types/content';
import { Field } from './Field';

export type Props = {
    page: PageModel2;
};

export function PageModel2Layout({ page }: React.PropsWithChildren<Props>) {
    return (
        <div className="ml-12 mt-12 prose dark:prose-invert" data-sb-object-id={page.id}>
            <h1>Page Model 2 Layout</h1>
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
                <li>
                    <Field label="String Field" fieldName="string_field" stackbitType="string" value={page.string_field} />
                </li>
                <li>
                    <Field label="String Default" fieldName="string_default" stackbitType="string" value={page.string_default} />
                </li>
            </ul>
        </div>
    );
}
