import React from 'react';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const renderIcon = (icon: React.ReactNode | React.ElementType, props = {}) => {
  if (React.isValidElement(icon)) {
    // If the icon is already a React element, render it as-is
    return icon;
  }

  if (typeof icon === 'function' || typeof icon === 'object') {
    // If the icon is a component, render it with default props
    const IconComponent = icon as React.ElementType; // Assert icon as ElementType
    return <IconComponent className="w-4 h-4" {...props} />;
  }

  return null; // No icon provided
};

const renderLabel = (label: string | React.ReactNode) => {
  if (!label) return null;

  if (typeof label === 'string') {
    return <span>{label}</span>;
  }

  return label;
};

const humanize = (str: string) => {
  if (!str) return '';

  let result = str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // e.g., "firstName" -> "first Name"
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // e.g., "ABSStatus" -> "ABS Status"
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // e.g., "SBSEnabled" -> "SBS Enabled"

  return result
    .split(' ')
    .map(
      (word, index) =>
        /^[A-Z]+$/.test(word) // Check if the word is a full abbreviation
          ? word // Keep abbreviations as they are
          : index === 0
            ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first word
            : word.toLowerCase() // Convert other words to lowercase
    )
    .join(' ');
};

const hyphenize = (input) => {
  const fallbackString = 'nui';

  if (typeof input === 'number') return String(input);

  if (input && typeof input === 'string' && input.replace) {
    return input
      .replace(/[\s_]/g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/-+/g, '-')
      .toLowerCase();
  }

  return fallbackString;
};

const noop = () => {};

export { renderIcon, renderLabel, humanize, hyphenize, noop };
