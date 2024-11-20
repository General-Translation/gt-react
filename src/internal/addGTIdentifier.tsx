import React, { ReactNode, ReactElement, isValidElement } from 'react';
import { isAcceptedPluralForm } from '../primitives/primitives';

type Child = ReactNode;
type Children = Child[] | Child;
type GTProp = {
  id: number;
  transformation?: string;
  [key: string]: any;
};

// Recursively adds GT identifiers to the children of a React element
export default function addGTIdentifier(
  children: Children,
  outerID?: string | undefined, // Prevents errors with mapping
  startingIndex: number = 0
): any {
  // Object to keep track of the current index for GT IDs
  let index = startingIndex;

  /**
   * Function to create a GTProp object for a ReactElement
   * Adds all GT info to the object
   * (This is used to reconstruct the JSX tree post-translation)
   * @param child - The ReactElement for which the GTProp is created
   * @returns - The GTProp object
   */
  const createGTProp = (child: ReactElement): GTProp => {
    const { type, props } = child;
    index += 1;
    let result: GTProp = { id: index };
    let transformation: string;
    try {
      transformation =
        typeof type === 'function' ? (type as any).gtTransformation || '' : '';
    } catch (error) {
      console.error(error);
      transformation = '';
    }
    if (transformation) {
      const transformationParts = transformation.split('-');
      if (transformationParts[0] === 'variable') {
        result.variableType = transformationParts?.[1] || 'variable';
      }
      if (transformationParts[0] === 'plural') {
        const pluralBranches = Object.entries(props).reduce(
          (acc, [branchName, branch]) => {
            if (isAcceptedPluralForm(branchName)) {
              (acc as Record<string, any>)[branchName] = addGTIdentifier(
                branch as any,
                branchName,
                index
              );
            }
            return acc;
          },
          {}
        );
        if (Object.keys(pluralBranches).length)
          result.branches = pluralBranches;
      }
      if (transformationParts[0] === 'branch') {
        const { children, branch, ...branches } = props;
        const resultBranches = Object.entries(branches).reduce(
          (acc, [branchName, branch]) => {
            (acc as Record<string, any>)[branchName] = addGTIdentifier(
              branch as any,
              branchName,
              index
            );
            return acc;
          },
          {}
        );
        if (Object.keys(resultBranches).length)
          result.branches = resultBranches;
      }
      result.transformation = transformationParts[0];
    }
    return result;
  };

  function handleSingleChild(child: any) {
    if (isValidElement(child)) {
      const { props } = child as ReactElement;
      // Create new props for the element, including the GT identifier and a key
      let generaltranslation = createGTProp(child);
      let newProps = {
        ...props,
        'data-_gt': generaltranslation,
      };
      if (outerID) {
        newProps.key = outerID;
        outerID = undefined;
      }
      // Recursively add IDs to children
      if (props.children) {
        newProps.children = handleChildren(props.children);
      }
      return React.cloneElement(child, newProps);
    }
    return child;
  }

  function handleChildren(children: Children) {
    if (Array.isArray(children)) {
      outerID = undefined;
      return React.Children.map(children, handleSingleChild);
    } else {
      return handleSingleChild(children);
    }
  }

  return handleChildren(children);
}
