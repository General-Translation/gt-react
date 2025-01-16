import { TranslatedChildren, TranslatedContent, TranslationError } from "../types/types";


export function isTranslationError(target: unknown): target is TranslationError {
    if (typeof target !== 'object' || target === null) {
      return false;
    }

    const hasError = 'error' in target && typeof target.error === 'string';
    const hasCode = 'code' in target ? typeof target.code === 'number' : true;

    return hasError && hasCode;
}


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