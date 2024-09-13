import { ReactElement } from "react";
import { TranslatedElement } from "../../primitives/types";

export default function getGTProp(
    child: ReactElement | TranslatedElement
): { id: number, [key: string]: any } | null {
    if (child && child.props && child.props['data-generaltranslation']) {
        return child.props['data-generaltranslation'];
    } 
    return null;
}