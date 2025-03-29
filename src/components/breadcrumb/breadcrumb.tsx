import React from 'react';

import { Link } from 'react-router-dom';

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as ShadBreadcrumb,
} from '@base/breadcrumb';

import { BreadcrumbProps } from './types';

export const Breadcrumb = ({ items = [] }: BreadcrumbProps) => {
  const lastItemIndex = items.length - 1;

  return (
    <ShadBreadcrumb>
      <BreadcrumbList>
        {items.map(({ path, name }, index) => (
          <React.Fragment key={path}>
            <BreadcrumbItem>
              {lastItemIndex === index ? (
                <BreadcrumbPage>{name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={path}>{name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {lastItemIndex !== index && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </ShadBreadcrumb>
  );
};
