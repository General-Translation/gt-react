import React, { ReactNode } from 'react';

type PrivateProps = {
    children?: ReactNode;
    label?: string;
    'data-generaltranslation': any;
}

/**
 * Marks any children as private, excluding them from translation.
 * 
 * @param {ReactNode} children
 * @param {string} label - used as a translation aid, as children are not sent to server.
 * @returns {ReactNode}
 */
const Private = ({ children, label = '', ...params }: PrivateProps): any => {
    
    const { 'data-generaltranslation': generaltranslation }: any = params;
    
    return (
        <span data-label={label} data-generaltranslation={generaltranslation}>
            {children}
        </span>
    );
}

Private.gtTransformation = "private";

export default Private;