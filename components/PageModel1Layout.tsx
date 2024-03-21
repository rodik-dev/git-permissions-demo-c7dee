import React from 'react';
import { PageModel1 } from '../types/content';
import { Field } from './Field';

export type Props = {
    page: PageModel1;
};

export function PageModel1Layout({ page }: React.PropsWithChildren<Props>) {
    return (
        <div className="ml-12 mt-12 prose dark:prose-invert" data-sb-object-id={page.id}>
            <h1>Page Model 1 Layout</h1>
            <ul className="list-none pl-0">
                <li>
                    page type: <span
                  className="text-orange-800 font-bold font-mono">{page.type}</span>
                </li>
                <li>
                    page id: <span
                  className="text-orange-800 font-bold font-mono">{page.id}</span>
                </li>
                <li>
                    page filePath: <span
                  className="text-orange-800 font-bold font-mono">{page.__filePath}</span>
                </li>
                <li>
                    page urlPath: <span
                  className="text-orange-800 font-bold font-mono">{page.__urlPath}</span>
                </li>
                <li>
                    <Field label="Title" fieldName="title" stackbitType="string"
                           value={page.title} />
                </li>
                <li>
                    <Field label="Slug" fieldName="slug" stackbitType="slug"
                           validation="required" value={page.slug} />
                </li>
                <li>
                    <Field label="Date" fieldName="date" stackbitType="date"
                           validation="required" value={page.date} />
                </li>
                <li>
                    <Field label="Content" fieldName="markdown_content"
                           stackbitType="markdown"
                           validation="required"
                           value={page.body?.trim()} />
                </li>
            </ul>
        </div>
    );
}
