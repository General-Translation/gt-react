import { ReactNode } from 'react';
type Child = ReactNode | Record<string, any>;
type Children = Child | Child[];
/**
 * Transforms children elements into objects, processing each child recursively if needed.
 * @param {Children} children - The children to process.
 * @returns {object} - The processed children as objects.
*/
export default function writeChildrenAsObjects(children: Children): any;
export {};
//# sourceMappingURL=writeChildrenAsObjects.d.ts.map