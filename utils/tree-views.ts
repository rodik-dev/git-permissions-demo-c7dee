import { DocumentWithSource, StackbitConfig } from '@stackbit/types';

export const treeViews: StackbitConfig['treeViews'] = async ({ getDocuments }) => {
    const documents = getDocuments();
    return [{ label: 'All Pages', children: getAllPages(documents), stableId: 'pages-tree' }];
};

function getAllPages(documents: DocumentWithSource[]) {
    const children = [];
    for (const document of documents) {
        switch (document.modelName) {
            case 'page_model_1':
                children.push({
                    stableId: 'page-model-1-tree',
                    label: 'Page Model 1',
                    children: documents.filter((document) => document.modelName === 'page_model_1').map((document) => ({ document }))
                });
                break;
            case 'page_model_2':
                children.push({
                    stableId: 'page-model-2-tree',
                    label: 'Page Model 2',
                    children: documents.filter((document) => document.modelName === 'page_model_2').map((document) => ({ document }))
                });
                break;
            case 'page_kitchen_sink':
                children.push({
                    stableId: 'page-kitchen-sink-tree',
                    label: 'Page Kitchen Sink',
                    document: documents.find((document) => document.modelName === 'page_kitchen_sink'),
                    children: documents.filter((document) => document.modelName === 'page_kitchen_sink').map((document) => ({ document }))
                });
                break;
        }
    }
    return children;
}
