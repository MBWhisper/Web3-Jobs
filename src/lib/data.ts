import type { Job, NavItem, FooterColumn } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Web3 Jobs', href: '#job-listings', hasDropdown: true },
  { label: 'Salaries', href: '#job-listings', hasDropdown: true },
  { label: 'Internships', href: '#job-listings', hasDropdown: true },
  { label: 'Learn Web3', href: '#hero', hasDropdown: true },
  { label: 'TOP Web3 Jobs', href: '#job-listings', hasDropdown: true },
];

export const skillTags = [
  'ai', 'analyst', 'backend', 'bitcoin', 'blockchain', 'community manager', 'crypto', 
  'cryptography', 'cto', 'customer support', 'dao', 'data science', 'defi', 'design',
  'developer relations', 'devops', 'discord', 'economy designer', 'entry level', 'erc',
  'erc 20', 'evm', 'front end', 'full stack', 'gaming', 'ganache', 'golang', 'hardhat',
  'intern', 'java', 'javascript', 'layer 2', 'marketing', 'mobile', 'moderator', 'nft',
  'node', 'non tech', 'open source', 'openzeppelin', 'pay in crypto', 'product manager',
  'project manager', 'react', 'refi', 'research', 'ruby', 'rust', 'sales', 'smart contract',
  'solana', 'solidity', 'truffle', 'web3 py', 'web3js', 'zero knowledge'
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Blockchain Developer',
    company: 'Lemon.io',
    companyLogo: 'S',
    location: 'Canada, the U.S., LATAM, Europe, Asia, Oceania',
    salary: '$70k - $172k',
    salaryMin: 70000,
    salaryMax: 172000,
    tags: ['dev', 'senior', 'blockchain', 'angular', 'golang'],
    postedAt: '10h',
    isRemote: true,
    cardType: 'default',
    description: 'Are you a talented Senior Developer looking for a remote job that lets you showcase your skills and earn competitive compensation? Look no further than Lemon.io — the marketplace that connects you with hand-picked startups in the US and Europe.',
    offerings: [
      'The rate depends on your seniority level, skills and experience. We\'ve already paid out over $11M to our engineers.',
      'No more hunting for clients or negotiating rates — let us handle the business side of things so you can focus on what you do best.',
      'We\'ll manually find the best project for you according to your skills and preferences.',
      'Choose a schedule that works best for you. It\'s possible to communicate async or minimally overlap within team working hours.',
      'We respect your seniority so you can expect no micromanagement or screen trackers.',
      'Communicate directly with the clients. Most of them have technical backgrounds. Sounds good, yeah?',
      'We will support you from the time you submit the application throughout all cooperation.'
    ]
  },
  {
    id: '2',
    title: 'Web3 Solidity Bootcamp - Job Guaranteed',
    company: 'Metana',
    companyLogo: 'M',
    location: 'Remote',
    salary: '',
    tags: ['bootcamp', 'solidity', 'web3', 'job guarantee'],
    postedAt: '1d',
    isRemote: true,
    isFeatured: true,
    cardType: 'yellow',
    description: 'Learn job-ready web3 skills on your schedule with 1-on-1 support & get a job, or your money back.',
    offerings: [
      'Comprehensive Solidity curriculum',
      '1-on-1 mentorship from industry experts',
      'Job guarantee or money back',
      'Flexible learning schedule',
      'Portfolio projects'
    ]
  },
  {
    id: '3',
    title: 'Product Security Engineer',
    company: 'Hashgraph',
    companyLogo: 'H',
    location: 'Remote from within Europe',
    salary: '',
    tags: ['engineer', 'security', 'remote', 'aws', 'blockchain'],
    postedAt: '1d',
    isRemote: true,
    cardType: 'purple',
    description: 'Join our security team to help build and maintain secure blockchain infrastructure. You will be responsible for identifying vulnerabilities, implementing security measures, and ensuring the integrity of our distributed systems.',
    offerings: [
      'Competitive salary package',
      'Remote-first culture',
      'Professional development budget',
      'Health and wellness benefits',
      'Stock options'
    ]
  },
  {
    id: '4',
    title: 'Senior Software Engineer - Trading Infrastructure Team',
    company: 'Gravity Team',
    companyLogo: 'G',
    location: 'Riga, Amsterdam, Remote with frequent travel',
    salary: '',
    tags: ['infrastructure', 'engineer', 'senior', 'dev', 'api'],
    postedAt: '1d',
    isRemote: true,
    cardType: 'default',
    description: 'We are looking for a Senior Software Engineer to join our Trading Infrastructure Team. You will work on high-performance trading systems, optimizing latency and throughput for our crypto trading operations.',
    offerings: [
      'Work with cutting-edge trading technology',
      'Competitive compensation',
      'Travel opportunities',
      'Professional growth',
      'Collaborative team environment'
    ]
  },
  {
    id: '5',
    title: 'VP Engineering',
    company: 'Genius',
    companyLogo: 'G',
    location: 'Remote',
    salary: '$200k - $300k',
    salaryMin: 200000,
    salaryMax: 300000,
    tags: ['executive', 'remote', 'rust', 'solana', 'typescript'],
    postedAt: '2d',
    isRemote: true,
    cardType: 'purple',
    description: 'Lead our engineering team and drive technical strategy. We are building the next generation of decentralized applications on Solana and need an experienced leader to guide our engineering efforts.',
    offerings: [
      'Executive compensation package',
      'Equity stake in the company',
      'Remote-first environment',
      'Build and lead world-class team',
      'Shape technical direction'
    ]
  },
  {
    id: '6',
    title: 'Senior Project Manager',
    company: 'Yield.xyz',
    companyLogo: 'Y',
    location: 'Remote (US)',
    salary: '',
    tags: ['project manager', 'non tech', 'senior', 'agile', 'scrum'],
    postedAt: '5d',
    isRemote: true,
    cardType: 'default',
    description: 'Manage complex DeFi projects from conception to launch. You will coordinate cross-functional teams, manage timelines, and ensure successful delivery of our yield optimization products.',
    offerings: [
      'Competitive salary',
      'Remote work flexibility',
      'DeFi industry exposure',
      'Professional development',
      'Token incentives'
    ]
  },
  {
    id: '7',
    title: 'Business Development Lead (US)',
    company: 'Yield.xyz',
    companyLogo: 'Y',
    location: 'Remote (US)',
    salary: '',
    tags: ['business development', 'lead', 'us', 'sales', 'partnerships'],
    postedAt: '5d',
    isRemote: true,
    cardType: 'teal',
    description: 'Drive business growth and strategic partnerships in the US market. You will identify opportunities, build relationships with key stakeholders, and expand our presence in the DeFi ecosystem.',
    offerings: [
      'Uncapped commission structure',
      'Remote work',
      'Travel budget',
      'Networking opportunities',
      'Career advancement'
    ]
  },
  {
    id: '8',
    title: 'ZIGChain Blockchain Engineer',
    company: 'ZIGChain',
    companyLogo: 'Z',
    location: 'Remote',
    salary: '$120k - $160k',
    salaryMin: 120000,
    salaryMax: 160000,
    tags: ['engineer', 'blockchain', 'cosmos', 'golang', 'python'],
    postedAt: '15d',
    isRemote: true,
    cardType: 'teal',
    description: 'Build the future of blockchain infrastructure on ZIGChain. We are developing a Cosmos SDK-based blockchain and need talented engineers to join our core development team.',
    offerings: [
      'Competitive salary',
      'Token allocation',
      'Remote-friendly',
      'Cutting-edge technology',
      'Growth opportunities'
    ]
  },
  {
    id: '9',
    title: 'Backend Engineer',
    company: 'Blockwing',
    companyLogo: 'B',
    location: 'Williamsburg, Brooklyn (Hybrid)',
    salary: '$160k - $250k',
    salaryMin: 160000,
    salaryMax: 250000,
    tags: ['backend', 'engineer', 'crypto', 'rust', 'golang'],
    postedAt: '17d',
    isRemote: false,
    cardType: 'purple',
    description: 'Join our backend team building high-performance crypto infrastructure. You will work on distributed systems, APIs, and data pipelines that power our trading and analytics platforms.',
    offerings: [
      'Top-tier compensation',
      'Hybrid work model',
      'NYC office perks',
      'Learning budget',
      'Health benefits'
    ]
  },
  {
    id: '10',
    title: 'Front End Engineer',
    company: 'Blockwing',
    companyLogo: 'B',
    location: 'Williamsburg, Brooklyn (Hybrid)',
    salary: '$130k - $250k',
    salaryMin: 130000,
    salaryMax: 250000,
    tags: ['engineer', 'front end', 'crypto', 'defi', 'nextjs'],
    postedAt: '17d',
    isRemote: false,
    cardType: 'purple',
    description: 'Create beautiful and intuitive user interfaces for our DeFi products. You will work with React, Next.js, and Web3 technologies to build seamless user experiences.',
    offerings: [
      'Competitive salary',
      'Hybrid flexibility',
      'Modern tech stack',
      'Design collaboration',
      'Career growth'
    ]
  }
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Remote',
    links: [
      { label: 'Remote Web3 Jobs', href: '#' },
      { label: 'Remote Non-Tech Web3 Jobs', href: '#' },
      { label: 'Web3 Salaries', href: '#' },
      { label: 'Web3 Non-Tech Salaries', href: '#' },
      { label: 'Top Web3 Cities', href: '#' },
      { label: 'Learn Web3', href: '#' },
      { label: 'Hire Web3 Developers', href: '#' },
    ]
  },
  {
    title: 'Regions',
    links: [
      { label: 'Asia', href: '#' },
      { label: 'Europe', href: '#' },
      { label: 'Africa', href: '#' },
      { label: 'Oceania', href: '#' },
      { label: 'North America', href: '#' },
    ]
  },
  {
    title: 'Other',
    links: [
      { label: 'What is Web3?', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Web3 Companies', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'Advertise', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Crypto Events', href: '#' },
      { label: 'Podcast', href: '#' },
      { label: 'Web3 Jobs API', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Login', href: '#' },
      { label: 'Sign Up', href: '#' },
    ]
  }
];

export const companyLogos = [
  'unicef', 'polygon', 'stripe', 'buildspace', 'ethereum', 'solana', 'aave', 'uniswap'
];
