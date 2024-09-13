'use client'

import { useEffect, useState } from "react"

export default function ClientResolver({
    promise, loadingFallback, errorFallback, renderTranslation
}: any) {

    const [renderedChildren, setRenderedChildren] = useState(
        loadingFallback 
    );

    const resolvePromise = async () => {
        try {
            const translation = renderTranslation(await promise);
            setRenderedChildren(translation);
        } catch (error) {
            console.error(error);
            setRenderedChildren(errorFallback)
        }
    }

    useEffect(() => {
        resolvePromise()
    }, [])

    return renderedChildren;

}
