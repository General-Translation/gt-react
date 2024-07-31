'use client'

import React, { ReactNode, useState, useEffect } from 'react';
import { Suspense } from 'react';

interface I18NResolverProps {
    children: ReactNode | Promise<ReactNode>;
    fallback: ReactNode;
}

/**
 * A function that removes all text from a React component's children.
 * @param {React.ReactNode} children - The children of the component.
 * @returns {React.ReactNode} The children without text nodes.
 */
function removeText(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
        return null; // Remove text nodes
    }
    if (React.isValidElement(child)) {
      // Recursively process children
      return React.cloneElement(
        child,
        {},
        removeText(child.props.children)
      );
    }
    return child; // Return non-text elements as they are
  });
}

/**
 * I18NResolver component handles the rendering of children which may be a promise.
 * If the promise resolves, the children are rendered inside a Suspense component.
 * If the promise fails, the fallback is rendered permanently.
 * 
 * @param {I18NResolverProps} props - The properties for the component.
 * @returns {JSX.Element} - The rendered component.
 */
export default function SkeletonResolver({ children, fallback }: I18NResolverProps): JSX.Element {
    
    const [resolvedChildren, setResolvedChildren] = useState<ReactNode>(removeText(fallback));
    
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {

        let isMounted = true;

        const resolveChildren = async () => {
            try {
                const resolved = await Promise.resolve(children);
                if (isMounted) {
                    setResolvedChildren(resolved);
                }
            } catch (error) {
                console.error(error)
                if (isMounted) {
                    setHasError(true);
                }
            }
        };

        if (children instanceof Promise) {
            resolveChildren();
        } else {
            setResolvedChildren(children);
        }

        return () => {
            isMounted = false;
        };

    }, [children]);

    if (hasError) {
        return <>{fallback}</>;
    }

    return (
        <Suspense fallback={removeText(fallback)}>
            {resolvedChildren}
        </Suspense>
    );
}