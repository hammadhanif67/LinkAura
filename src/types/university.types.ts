export type UniversityType = 'Public' | 'Private';

export type UniversityCategory =
  | 'Pakistani Government Universities'
  | 'Pakistani Private Universities'
  | 'Engineering Universities'
  | 'Medical Universities'
  | 'Business Universities'
  | 'Islamic Universities'
  | 'International Universities'
  | 'Ivy League Universities'
  | 'Top Asian Universities'
  | 'Top European Universities'
  | 'Top Australian Universities'
  | 'Top Canadian Universities';

export interface University {
  id: string;
  slug: string;
  name: string;
  website: string;
  description: string;
  logo: string;
  country: string;
  city: string;
  type: UniversityType;
  category: UniversityCategory;
  subcategories: UniversityCategory[];
  ranking: string;
  establishedYear?: number;
  verified: boolean;
  tags: string[];
  featured: boolean;
}
