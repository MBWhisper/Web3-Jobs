export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  tags: string[];
  postedAt: string;
  description: string;
  offerings?: string[];
  isFeatured?: boolean;
  isRemote: boolean;
  cardType?: 'default' | 'purple' | 'teal' | 'yellow';
}

export interface Company {
  name: string;
  logo: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}
