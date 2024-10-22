import I18NConfiguration from "../config/I18NConfiguration";
import defaultInitGTProps from "../primitives/defaultInitGTProps";
import getDefaultFromEnv from "./getDefaultFromEnv";

let I18NConfig: I18NConfiguration;

export default function getI18NConfig(): I18NConfiguration {
    if (I18NConfig) return I18NConfig;
    const I18NConfigParams = process.env._GENERALTRANSLATION_I18N_CONFIG_PARAMS;
    const env = getDefaultFromEnv('NODE_ENV') || 'production';
    
    if (I18NConfigParams) {
        I18NConfig = new I18NConfiguration({
            ...JSON.parse(I18NConfigParams),
            env,
        })
    } 
    
    else {
        console.warn('Unable to access gt-next configuration. Using defaults.')

        // Defaults and checks
        const projectID = process.env.GT_PROJECT_ID;
        if (!projectID)
            throw new Error('Project ID missing! Set projectID as GT_PROJECT_ID in the environment or by passing the projectID parameter to initGT(). Find your project ID: www.generaltranslation.com/dashboard.')
        
        const apiKey = process.env.GT_API_KEY;
        if (!apiKey)
            throw new Error("API key is required for automatic translation! Create an API key: www.generaltranslation.com/dashboard/api-keys. (Or, turn off automatic translation by setting baseURL to an empty string.)")

        I18NConfig = new I18NConfiguration({
            ...defaultInitGTProps, 
            maxConcurrentRequests: defaultInitGTProps._maxConcurrectRequests,
            batchInterval: defaultInitGTProps._batchInterval,
            apiKey, projectID,
            env
        })  
    }
    
    return I18NConfig;
}