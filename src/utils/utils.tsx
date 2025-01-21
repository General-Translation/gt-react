import { TranslatedContent } from "../types/types";

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