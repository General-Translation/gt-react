import { getNextDomain } from "../next/getNextDomain";

let getMetadataFunction: () => Record<string, any>;

export default function getMetadata(): Record<string, any> {
    if (getMetadataFunction) return getMetadataFunction();
    try {
        const customRequestConfig = require('gt-next/_request');
        const customGetMetadata = customRequestConfig?.default?.getMetadata || customRequestConfig.getMetadata;
        const metadata = customGetMetadata();
        getMetadataFunction = customGetMetadata();
        return metadata;
    } catch {
        getMetadataFunction = () => { return {
            domain: getNextDomain()
        }};
        return getMetadataFunction();
    };
        
}
