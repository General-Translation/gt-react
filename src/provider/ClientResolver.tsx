'use client'

import { useEffect, useState } from "react";

export default function ClientResolver({
  promise,
  loadingFallback,
  errorFallback,
  renderTranslation,
}: any) {

    const [translationData, setTranslationData] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        promise
        .then((data: any) => {
            setTranslationData(data);
        })
        .catch((error: any) => {
            console.error(error);
            setHasError(true);
        });
    }, [promise]);

    if (hasError) {
        return errorFallback;
    }

    if (translationData) {
        return renderTranslation(translationData);
    }

    return loadingFallback;
}
