import React, { ReactNode } from 'react';
type Child = ReactNode;
type Children = Child[] | Child;
/**
 * Add data-generaltranslation props, with identifiers, to React children
 * @param children - The children elements to which GT identifiers will be added
 * @returns - The children with added GT identifiers
 */
export default function addGTIdentifier(children: Children): string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined;
export {};
//# sourceMappingURL=addGTIdentifier.d.ts.map