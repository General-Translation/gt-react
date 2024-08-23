import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import addGTIdentifier from "../../../index/addGTIdentifier";
import getEntryMetadata from "../../../primitives/getEntryMetadata";
import getRenderAttributes from "../../../primitives/getRenderAttributes";
import renderClientChildren from "./renderClientChildren";
export default function renderClientDictionary({ result, dictionary, locales }) {
    const renderAttributes = getRenderAttributes(locales[0]);
    let translatedDictionary = {};
    for (const id of Object.keys(dictionary)) {
        if (result[id]) {
            let { entry, metadata } = getEntryMetadata(dictionary[id]);
            metadata = Object.assign({ locales, renderAttributes }, metadata);
            translatedDictionary[id] = renderClientChildren({
                source: addGTIdentifier(_jsx(_Fragment, { children: entry })), // fragment wrapper so that it is consistent with the server-side
                target: result[id].t,
                metadata
            });
        }
    }
    return translatedDictionary;
}
//# sourceMappingURL=renderClientDictionary.js.map