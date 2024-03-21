import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { KitchenSinkPage, PageModel1, PageModel2 } from '../types/content';
import { BaseLayout } from '../components/BaseLayout';
import { getPageBySlug, getPageUrls, getPageFromStackbit } from '../utils/content';
import { PageKitchenSinkLayout } from '../components/PageKitchenSinkLayout';
import { PageModel1Layout } from '../components/PageModel1Layout';
import { PageModel2Layout } from '../components/PageModel2Layout';

const TypeToPageLayoutMap = {
    page_kitchen_sink: PageKitchenSinkLayout,
    page_model_1: PageModel1Layout,
    page_model_2: PageModel2Layout
};

type PageLayoutProps = KitchenSinkPage | PageModel1 | PageModel2;

type PageProps<PageProps = PageLayoutProps> = {
    slug: string;
    page: PageProps;
};

const Page: NextPage<PageProps> = (props) => {
    const { page } = props;
    const type = page.type;

    if (!type) {
        throw new Error(`page has no layout, page '${props.slug}'`);
    }
    const PageLayoutComponent = TypeToPageLayoutMap[type] as (props: PageProps) => JSX.Element;
    if (!PageLayoutComponent) {
        throw new Error(`no page layout matching the layout: ${type}`);
    }
    return (
        <BaseLayout {...props}>
            <PageLayoutComponent {...props} />
        </BaseLayout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getPageUrls();
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = '/' + ((params?.slug as string[]) || []).join('/');
    let page = getPageBySlug(slug);
    if (process.env.STACKBIT_API_KEY && process.env.ENABLE_DRAFTS && page?.id) {
        page = await getPageFromStackbit(process.env.STACKBIT_API_KEY, page);
    }
    return { props: { page, slug } };
};
