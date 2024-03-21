import { defineStackbitConfig, SiteMapEntry, Document, SiteMapOptions } from '@stackbit/types';
import { GitContentSource, DocumentContext } from '@stackbit/cms-git';
import { createContentSourceWithDrafts } from '@stackbit/utils';

import { models } from './.stackbit/models';
import { treeViews } from './utils/tree-views';
import { filePathToPageUrl } from './utils/content';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content'],
    setFileIdsOnStart: true,
    useFileIds: true,
    models: models,
    assetsConfig: {
        referenceType: 'static',
        assetsDir: 'content',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
    }
});

const contentSources = process.env.ENABLE_DRAFTS
    ? [
          createContentSourceWithDrafts<GitContentSource>({
              contentSource: gitContentSource
          })
      ]
    : [gitContentSource];

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    postInstallCommand: './build-custom-controls.sh',
    presetReferenceBehavior: 'copyReference',
    duplicatableModels: ['data_model_2'],
    contentSources: contentSources,
    assetSources: [
        {
            name: 'unsplash',
            type: 'iframe',
            url: 'https://unsplash-asset-source.netlify.app',
            preview: ({ assetData }: { assetData: { unsplashImageUrl: string } | string }) => {
                // for backward compatibility with older images stored as files
                if (typeof assetData === 'string') {
                    return {
                        title: 'image',
                        image: assetData
                    };
                }
                return {
                    title: 'image',
                    image: assetData.unsplashImageUrl
                };
            }
        },
        {
            type: 'bynder'
        }
    ],
    sitemap: ({ documents }: SiteMapOptions): SiteMapEntry[] => {
        return (documents as Document<DocumentContext>[])
            .filter((document) => ['page_kitchen_sink', 'page_model_1', 'page_model_2'].includes(document.modelName))
            .map((document) => {
                const filePath = document.context?.['filePath'] ?? document.id;
                return {
                    stableId: document.id,
                    label: filePath,
                    urlPath: filePathToPageUrl(filePath),
                    document: document
                };
            });
    },
    treeViews: treeViews
});
