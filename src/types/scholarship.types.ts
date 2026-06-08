export type ScholarshipSubcategory =
  | 'Fully Funded Scholarships'
  | 'Partial Scholarships'
  | 'Government Scholarships'
  | 'International Scholarships'
  | 'Pakistan Scholarships'
  | 'Undergraduate Scholarships'
  | 'Masters Scholarships'
  | 'PhD Scholarships'
  | 'Exchange Programs'
  | 'Fellowships'
  | 'Study Abroad Resources'
  | 'Admissions Portals'
  | 'Student Visa Resources'
  | 'Research Funding';

export type FundingType =
  | 'Fully Funded'
  | 'Partial Funded'
  | 'Government Funded'
  | 'Fellowship'
  | 'Research Funding'
  | 'Admissions Resource'
  | 'Study Abroad Resource'
  | 'Visa Resource';

export type DegreeLevel = 'Undergraduate' | 'Masters' | 'PhD' | 'Postdoctoral' | 'Exchange' | 'All';

export interface Scholarship {
  id: string;
  name: string;
  slug: string;
  website: string;
  category: 'Scholarships & Study Abroad';
  subcategory: ScholarshipSubcategory;
  description: string;
  country: string;
  fundingType: FundingType;
  degreeLevel: DegreeLevel;
  deadline: string;
  featured: boolean;
  verified: boolean;
  logo: string;
  tags: string[];
}
