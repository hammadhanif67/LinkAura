export type EntertainmentPricing = 'Free' | 'Freemium' | 'Paid';

export type EntertainmentSubcategory =
  | 'Movie Streaming'
  | 'TV Shows'
  | 'Anime Streaming'
  | 'Sports Streaming'
  | 'Music Streaming'
  | 'Live TV'
  | 'Movie Reviews'
  | 'Movie Databases'
  | 'Entertainment News'
  | 'Celebrity & Film Information'
  | 'Trailers & Videos'
  | 'Podcast Platforms';

export interface EntertainmentPlatform {
  id: string;
  name: string;
  slug: string;
  website: string;
  category: 'Entertainment & Streaming';
  subcategory: EntertainmentSubcategory;
  description: string;
  country: string;
  pricing: EntertainmentPricing;
  verified: boolean;
  featured: boolean;
  rating: number;
  logo: string;
  tags: string[];
  contentType: string;
}
