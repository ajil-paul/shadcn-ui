export interface BreadcrumbItemProps {
  name: string;
  path: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
}
