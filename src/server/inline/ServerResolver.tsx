'use client'

import { useEffect, useState } from "react";

export default function NewResolver({
  promise,
  loadingFallback,
  errorFallback,
}: any) {

    const [translation, setTranslation] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const resolvedPromise = await promise;
                setTranslation(resolvedPromise);
            } catch (error) {
                console.error(error);
                setHasError(true);
            }
        })();
    }, [promise]);

    if (hasError) {
        return errorFallback;
    }

    if (translation) {
        return translation;
    }

    return loadingFallback;
}
