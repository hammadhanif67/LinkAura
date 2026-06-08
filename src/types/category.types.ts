export type CategorySlug = string;

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  websiteCount: number;
}
