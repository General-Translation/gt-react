import I18NConfiguration from "./config/I18NConfiguration";
import defaultInitGTProps from "./primitives/defaultInitGTProps";
import InitGTProps from "./primitives/InitGTProps";
import path from 'path';
import { NextConfig } from "next";

export function initGT({
    i18n, dictionary,
    apiKey = defaultInitGTProps.apiKey, 
    projectID = defaultInitGTProps.projectID,
    baseURL = defaultInitGTProps.baseURL,
    cacheURL = defaultInitGTProps.cacheURL,
    locales,
    defaultLocale = locales?.[0] || defaultInitGTProps.defaultLocale,
    renderSettings = defaultInitGTProps.renderSettings,
    dictionaryName = defaultInitGTProps.dictionaryName,
    _maxConcurrentRequests = defaultInitGTProps._maxConcurrectRequests,
    _batchInterval = defaultInitGTProps._batchInterval,
    ...metadata
}: InitGTProps = defaultInitGTProps) {

    // Error checks
    if (!projectID && ((cacheURL === defaultInitGTProps.cacheURL) || (baseURL === defaultInitGTProps.baseURL)))
        throw new Error('Project ID missing! Set projectID as GT_PROJECT_ID in the environment or by passing the projectID parameter to initGT(). Find your project ID: www.generaltranslation.com/dashboard.')

    if ((!apiKey || !projectID) && (baseURL === defaultInitGTProps.baseURL)) {
        throw new Error("API key is required for automatic translation! Create an API key: www.generaltranslation.com/dashboard/api-keys. (Or, turn off automatic translation by setting baseURL to an empty string.)")
    }

    // Save the I18N config object
    if (!(globalThis as any).__GENERALTRANSLATION__) {
        (globalThis as any).__GENERALTRANSLATION__ = new I18NConfiguration({
            apiKey, projectID, baseURL, cacheURL, locales, defaultLocale,
            renderSettings, dictionaryName,
            maxConcurrentRequests: _maxConcurrentRequests,
            batchInterval: _batchInterval, ...metadata
        });
    }

    // Use i18n and dictionary values as file paths if they are provided as such
    const resolvedI18NFilePath = typeof i18n === 'string' ? i18n : resolveConfigFilepath('i18n');
    const resolvedDictionaryFilePath = typeof dictionary === 'string' ? dictionary : resolveConfigFilepath('dictionary');

    return (config: NextConfig = {}): NextConfig => {
        return {
            ...config,
            webpack: function webpack(
                ...[webpackConfig, options]: Parameters<NonNullable<NextConfig['webpack']>>
            ) {
                if (resolvedI18NFilePath) {
                    // Add alias for importing request handler
                    webpackConfig.resolve.alias['gt-next/_request'] = path.resolve(
                        webpackConfig.context,
                        resolvedI18NFilePath
                    );
                }
                if (resolvedDictionaryFilePath) {
                    // Add alias for importing dictionary via webpack
                    webpackConfig.resolve.alias['gt-next/_dictionary'] = path.resolve(
                        webpackConfig.context,
                        resolvedDictionaryFilePath
                    );
                }
                if (typeof config?.webpack === 'function') {
                    return config.webpack(webpackConfig, options);
                }
                return webpackConfig;
            }
        }
    }
}

// Function to search for both i18n.js and dictionary.js
function resolveConfigFilepath(fileName: string, cwd?: string): string | undefined {
    function resolvePath(pathname: string) {
        const parts = [];
        if (cwd) parts.push(cwd);
        parts.push(pathname);
        return path.resolve(...parts);
    }

    function pathExists(pathname: string) {
        return require('fs').existsSync(resolvePath(pathname));
    }

    // Check for file existence in the root and src directories with supported extensions
    for (const candidate of [
        ...withExtensions(`./${fileName}`),
        ...withExtensions(`./src/${fileName}`)
    ]) {
        if (pathExists(candidate)) {
            return candidate;
        }
    }

    // Return undefined if no file is found
    return undefined;
}

// Helper function to handle multiple extensions
function withExtensions(localPath: string) {
    return [
        `${localPath}.ts`,
        `${localPath}.tsx`,
        `${localPath}.js`,
        `${localPath}.jsx`
    ];
}
