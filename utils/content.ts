import fs from 'fs';
import path from 'path';
import glob from 'glob';
import frontmatter from 'front-matter';

const PAGES_DIR = 'content/pages';
const DATA_DIR = 'content/data';
const SUPPORTED_FILE_EXTENSIONS = ['md', 'json'];

export type PageData = {
    __filePath: string;
    __urlPath: string;
    [key: string]: any;
};

export function getPageUrls() {
    const pageFiles = getContentFilePathsInDir(PAGES_DIR);
    return pageFiles.map(filePathToPageUrl);
}

export function getData() {
    const dataFilePaths = getContentFilePathsInDir(DATA_DIR);
    return dataFilePaths.map(readContent);
}

export function getPages(): PageData[] {
    const pageFiles = getContentFilePathsInDir(PAGES_DIR);
    return pageFiles.map(readPage);
}

export function getPageBySlug(slug: string): PageData | null {
    const pageFiles = getContentFilePathsInDir(PAGES_DIR);
    for (const pageFile of pageFiles) {
        const pageSlug = filePathToPageUrl(pageFile);
        if (slug === pageSlug) {
            return readPage(pageFile);
        }
    }
    return null;
}

export async function getPageFromStackbit(stackbitApiKey: string, page: PageData): Promise<PageData | null> {
    if (!page.id) {
        return null;
    }
    try {
        // Get the document with pending draft changes from "stackbit dev" server
        const { getCSIDocuments } = await import('@stackbit/utils');
        const result = await getCSIDocuments({
            stackbitApiKey,
            documentSpecs: [
                {
                    // the srcType and the srcProjectId are printed
                    // when starting `stackbit dev`
                    srcType: 'git',
                    srcProjectId: '9a0364b9',
                    srcDocumentId: page.id
                }
            ],
            flatDocuments: true
        });

        // Remap the documents into pages expected by the website
        const mappedDocuments = result.documents.map((document) => {
            const { markdown_content, __metadata, ...rest } = document;
            return {
                __filePath: page.__filePath,
                __urlPath: page.__urlPath,
                type: __metadata.modelName,
                id: __metadata.id,
                ...rest,
                ...(markdown_content ? { body: markdown_content } : null)
            };
        });
        return mappedDocuments[0];
    } catch (error: any) {
        console.error(
          'Error getting document from stackbit dev, using original document. ' +
          'Check that "stackbit dev" is running. Error: ' + error.message
        );
        return page;
    }
}

function getContentFilePathsInDir(dir: string): string[] {
    const globPattern = `${dir}/**/*.{${SUPPORTED_FILE_EXTENSIONS.join(',')}}`;
    return glob.sync(globPattern);
}

function readPage(filePath: string): PageData {
    const pageData = readContent(filePath);
    return {
        __urlPath: filePathToPageUrl(filePath),
        ...pageData
    };
}

function readContent(filePath: string): Record<string, any> & { __filePath: string } {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    let content = null;
    switch (path.extname(filePath).substring(1)) {
        case 'md':
            const parsedMd = frontmatter<any>(rawContent);
            content = {
                ...parsedMd.attributes,
                body: parsedMd.body
            };
            break;
        case 'json':
            content = JSON.parse(rawContent);
            break;
        default:
            throw Error(`Unhandled file type: ${filePath}`);
    }

    content.__filePath = filePath;
    return content;
}

export function filePathToPageUrl(filePath: string): string {
    const pathObject = path.parse(filePath.substring(PAGES_DIR.length));
    return (pathObject.name === 'index' ? pathObject.dir : path.join(pathObject.dir, pathObject.name)) || '/';
}
