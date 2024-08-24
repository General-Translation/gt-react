'use client'

import { Suspense } from "react";
import isValidReactNode from "../../primitives/rendering/isValidReactNode";
import RenderClientVariable from "../value/RenderClientVariable";
import ClientResolver from "./ClientResolver";
import renderClientChildren from "./renderClientChildren";

function isPromise(value: any): value is Promise<any> {
    return !!value && typeof value.then === 'function';
}

export default function handleRender({
    source, target, renderAttributes, ...metadata
}: any) {

    let targetContent; let targetFallbacks;
    if (Array.isArray(target)) {
        if (target.length === 2) {
            targetFallbacks = target[1];
        }
        targetContent = target[0];
    } else {
        targetContent = target;
    }

    if (isPromise(targetContent)) {
        const translationPromise = (async () => {
            const resolved = await targetContent;
            return renderClientChildren({
                source, target: resolved, renderAttributes, ...metadata
            })
        })();
        return (
            <Suspense fallback={targetFallbacks.loadingFallback}>
                <ClientResolver promise={translationPromise} fallback={targetFallbacks.errorFallback} />
            </Suspense>
        )
    }

    return renderClientChildren({
        source, target: targetContent, renderAttributes, ...metadata
    });

}