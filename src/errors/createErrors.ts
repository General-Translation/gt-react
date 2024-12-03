// ---- ERRORS ---- //

export const projectIdMissingError = 'gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.'

export const createPluralMissingError = (children: any) => `<Plural> component with children "${children}" requires "n" option.`

export const createClientSideTWithoutIDError = (children: any) => `Client-side <T> with no provided 'id' prop. Children: "${children}"`

export const createStringTranslationError = (content: string, id?: string) => `gt-next string translation error. tx("${content}")${id ? ` with id "${id}"` : '' } failed.`

export const createClientSideTDictionaryCollisionError = (id: string) => `<T id="${id}">, "${id}" is also used as a key in the dictionary. Don't give <T> components the same ID as dictionary entries.`

export const createClientSideTHydrationError = (id: string) => `<T id="${id}"> is used in a client component without a valid saved translation. This can cause hydration errors.`
    + `\n\nTo fix this error, consider using a dictionary with useGT() or pushing translations from the command line in advance.`

export const createNestedDataGTError = (child: any) => `General Translation: data-_gt prop already in use on child "${child}". This usually occurs when you nest <T> components within the same file. Remove one of the <T> components to continue.`

// ---- WARNINGS ---- //

export const createLibraryNoEntryWarning = (id: string) => `gt-react: No dictionary entry found for id: "${id}"`

export const createNoEntryWarning = (id: string, prefixedID: string) => `t('${id}') finding no translation for dictionary item ${prefixedID} !`
