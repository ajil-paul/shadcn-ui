import React from 'react';

import clsx from 'clsx';

import { HtmlTags, TypographyProps, TypographyTypes } from './types';

const componentMap: Record<TypographyTypes, HtmlTags> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
};

const Typography: React.FC<TypographyProps> = ({
  type = 'body2',
  as,
  className,
  children,
}) => {
  const typographyClass = clsx({
    'text-4xl font-extrabold lg:text-5xl': type === 'h1',
    'text-3xl font-semibold': type === 'h2',
    'text-2xl font-semibold': type === 'h3',
    'text-xl font-semibold': type === 'h4',
    'text-lg font-medium': type === 'h5',
    'text-base font-medium': type === 'h6',
    'leading-8 text-lg font-normal': type === 'body1',
    'leading-7 text-base font-normal': type === 'body2',
    'leading-5 text-xs font-normal': type === 'body3',
  });

  const Component = as ?? (componentMap[type] || 'p');

  return (
    <Component className={clsx(className, typographyClass)}>
      {children}
    </Component>
  );
};

export { Typography };
