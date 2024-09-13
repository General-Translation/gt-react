import { ReactElement } from "react";
import { TranslatedElement } from "../../primitives/types";
export default function getGTProp(child: ReactElement | TranslatedElement): {
    id: number;
    [key: string]: any;
} | null;
//# sourceMappingURL=getGTProp.d.ts.map