import { ReactNode } from 'react';
import { Range } from '../../primitives/variables/getPluralBranch';
declare const Plural: {
    ({ locales, children, n, ranges, zero, one, two, few, many, other, singular, plural, dual, values, ...props }: {
        locales: string[];
        children?: any;
        n: number;
        ranges?: Range[];
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        many?: any;
        other?: any;
        singular?: any;
        dual?: any;
        plural?: any;
        values?: Record<string, any>;
        "data-generaltranslation"?: any;
    }): ReactNode;
    gtTransformation: string;
};
export default Plural;
//# sourceMappingURL=InnerPlural.d.ts.map