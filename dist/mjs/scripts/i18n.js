#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import 'dotenv/config';
import path from 'path';
import React from 'react';
import { program } from 'commander';
import { default as GT, getLanguageName, isValidLanguageCode, getLanguageCode } from 'generaltranslation';
import fs from 'fs';
import flattenDictionary from '../primitives/dictionary/flattenDictionary';
import writeChildrenAsObjects from '../primitives/translation/writeChildrenAsObjects';
import addGTIdentifier from '../primitives/translation/addGTIdentifier';
require('@babel/register')({
    presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-env'
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    ignore: [/(node_modules)/],
});
function processDictionaryFile(dictionaryFilePath, options) {
    const absoluteDictionaryFilePath = path.resolve(dictionaryFilePath);
    let dictionary;
    try {
        dictionary = require(absoluteDictionaryFilePath).default || require(absoluteDictionaryFilePath);
    }
    catch (error) {
        console.error('Failed to load the dictionary file:', error);
        process.exit(1);
    }
    dictionary = flattenDictionary(dictionary);
    const apiKey = options.apiKey || process.env.GT_API_KEY;
    const projectID = options.projectID || process.env.GT_PROJECT_ID;
    const dictionaryName = options.dictionaryName;
    const defaultLanguage = options.defaultLanguage;
    const languages = (options.languages || [])
        .map(language => isValidLanguageCode(language) ? language : getLanguageCode(language))
        .filter(language => language ? true : false);
    const override = options.override ? true : false;
    if (!(apiKey && projectID)) {
        throw new Error('GT_API_KEY and GT_PROJECT_ID environment variables or provided arguments are required.');
    }
    let templateUpdates = [];
    for (const key in dictionary) {
        let entry = dictionary[key];
        let metadata = { id: key, dictionaryName };
        if (defaultLanguage) {
            metadata.defaultLanguage = defaultLanguage;
        }
        let props = {};
        if (Array.isArray(entry)) {
            if (typeof entry[1] === 'object') {
                props = entry[1];
            }
            entry = entry[0];
        }
        if (React.isValidElement(entry)) {
            let wrappedEntry;
            const { singular, plural, dual, zero, one, two, few, many, other, ranges } = props, tMetadata = __rest(props, ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other", "ranges"]);
            const pluralProps = Object.fromEntries(Object.entries({ singular, plural, dual, zero, one, two, few, many, other, ranges }).filter(([_, value]) => value !== undefined));
            if (Object.keys(pluralProps).length) {
                const Plural = (pluralProps) => React.createElement(React.Fragment, pluralProps, entry);
                Plural.gtTransformation = 'plural';
                wrappedEntry = React.createElement(Plural, pluralProps, entry);
            }
            else {
                wrappedEntry = React.createElement(React.Fragment, null, entry);
            }
            ;
            const entryAsObjects = writeChildrenAsObjects(addGTIdentifier(wrappedEntry)); // simulate gt-react's t() function
            templateUpdates.push({
                type: "react",
                data: {
                    children: entryAsObjects,
                    metadata: Object.assign(Object.assign({}, metadata), tMetadata)
                }
            });
        }
        else if (typeof entry === 'string') {
            templateUpdates.push({
                type: "intl",
                data: {
                    content: entry,
                    metadata: Object.assign(Object.assign({}, metadata), props)
                }
            });
        }
    }
    if (templateUpdates.length) {
        const gt = new GT({ apiKey, projectID });
        const sendUpdates = () => __awaiter(this, void 0, void 0, function* () {
            const resultLanguages = yield gt.updateRemoteDictionary(templateUpdates, languages, projectID, override);
            if (resultLanguages) {
                console.log(`Remote dictionary updated: ${resultLanguages.length ? true : false}.`, (`Languages: ${resultLanguages.length ? `[${resultLanguages.map(language => `"${getLanguageName(language)}"`).join(', ')}]` + '.' : 'None.'}`), resultLanguages.length ? 'Translations are usually live within a minute.' : '');
            }
            else {
                throw new Error('500: Internal Server Error.');
            }
            process.exit(0);
        });
        sendUpdates();
    }
    setTimeout(() => {
        process.exit(0);
    }, 4000);
}
function resolveFilePath(filePath, defaultPaths) {
    if (filePath) {
        return filePath;
    }
    for (const possiblePath of defaultPaths) {
        if (fs.existsSync(possiblePath)) {
            return possiblePath;
        }
    }
    throw new Error('File not found in default locations.');
}
program
    .name('update')
    .description('Process React dictionary files and send translations to General Translation services')
    .version('1.0.0')
    .argument('[dictionaryFilePath]', 'Path to the dictionary file')
    .option('--apiKey <apiKey>', 'Specify your GT API key')
    .option('--projectID <projectID>', 'Specify your GT project ID')
    .option('--dictionaryName <name>', 'Optionally specify a dictionary name for metadata purposes')
    .option('--languages <languages...>', 'List of target languages for translation')
    .option('--override', 'Override existing translations')
    .option('--defaultLanguage <defaultLanguage>', 'Specify a default language code or name for metadata purposes')
    .action((dictionaryFilePath, options) => {
    const resolvedDictionaryFilePath = resolveFilePath(dictionaryFilePath, [
        './dictionary.js',
        './dictionary.jsx',
        './dictionary.ts',
        './dictionary.tsx',
        './src/dictionary.js',
        './src/dictionary.jsx',
        './src/dictionary.ts',
        './src/dictionary.tsx'
    ]);
    processDictionaryFile(resolvedDictionaryFilePath, options);
});
program.parse(process.argv);
//# sourceMappingURL=i18n.js.map