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
            setRenderedChildren(renderTranslation(await promise));
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
