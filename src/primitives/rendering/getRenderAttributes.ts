import { getLanguageDirection } from "generaltranslation";

export default function getRenderAttributes({locale, ...options}: {
    locale: string;
    [key: string]: any;
}) {
    let renderAttributes: any = {};
    const dir = getLanguageDirection(locale);
    if (dir === 'rtl') renderAttributes = { ...renderAttributes, dir }
    return renderAttributes;
}