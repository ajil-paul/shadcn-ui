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

export { renderIcon, renderLabel };
