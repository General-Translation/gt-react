import React from "react";
import { GTTranslationError, TaggedElement, TaggedElementProps, TranslatedContent, TranslationError } from "../types/types";

export function isTranslatedContent(target: unknown): target is TranslatedContent {
  if (typeof target === 'string') {
    return true;
  }

  if (!Array.isArray(target)) {
    return false;
  }

  return target.every(item => {
    if (typeof item === 'string') {
      return true;
    }

    if (typeof item === 'object' && item !== null) {
      const hasKey = 'key' in item && typeof item.key === 'string';
      const hasValidVariable = item.variable === undefined || typeof item.variable === 'string';
      return hasKey && hasValidVariable;
    }

    return false;
  });
}

export function isValidTaggedElement(target: unknown): target is TaggedElement {
  return React.isValidElement<TaggedElementProps>(target)
}



export function errorToTranlsationError(error: Error): TranslationError {
  if (error instanceof GTTranslationError) {
    return {
      state: 'error',
      error: error.error,
      code: error.code
    }
  }
  return {
    state: 'error',
    error: `${error.name}: ${error.message}`,
    code: 500
  }
}