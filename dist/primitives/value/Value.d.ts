import 'server-only';
import { ReactNode } from 'react';
type ValueProps = {
    locale: string;
    children?: any;
    branches?: Record<string, any>;
    values?: Record<string, any>;
    [key: string]: any;
};
/**
 * Value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {JSX.Element}
 */
declare const Value: {
    ({ children, branches, values, locale, ...props }: ValueProps): ReactNode;
    gtTransformation: string;
};
export default Value;
//# sourceMappingURL=Value.d.ts.map