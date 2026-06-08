export type UtilitySubcategory =
  | 'Electricity'
  | 'Gas Utilities'
  | 'Water Utilities'
  | 'Telecom Providers'
  | 'Internet Service Providers (ISP)'
  | 'Mobile Recharge'
  | 'Bill Payment Platforms'
  | 'Government Utility Services'
  | 'Cable & TV Services'
  | 'Digital Utility Payments'
  | 'Customer Support Portals';

export interface UtilityProvider {
  id: string;
  name: string;
  slug: string;
  website: string;
  category: 'Utilities & Bill Payment';
  subcategory: UtilitySubcategory;
  description: string;
  country: string;
  province: string;
  city: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  logo: string;
  tags: string[];
  useCase: string;
}
