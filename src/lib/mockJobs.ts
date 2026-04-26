import type { Job } from '@/types';

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior Solidity Developer',
    company: 'Ethereum Foundation',
    companyLogo: '⟠',
    location: 'Remote',
    salary: '$150,000 - $200,000',
    salaryMin: 150000,
    salaryMax: 200000,
    tags: ['Solidity', 'Smart Contracts', 'EVM', 'Web3'],
    postedAt: '2 days ago',
    description: 'We\'re looking for an experienced Solidity developer to join our team at Ethereum Foundation. You\'ll work on core protocol improvements, audit existing contracts, and help shape the future of decentralized applications. This is a unique opportunity to contribute to the world\'s leading smart contract platform.\n\nYou should have deep expertise in Solidity, understanding of EVM opcodes, and experience with formal verification. We value clean code, thorough testing, and excellent communication.',
    offerings: [
      'Competitive salary package with crypto options',
      'Flexible remote work arrangement',
      'Health insurance and wellness benefits',
      'Annual learning budget for conferences and courses',
      'Collaboration with top minds in the Web3 space',
      'Work on projects that shape the future of blockchain'
    ],
    isFeatured: true,
    isRemote: true,
    cardType: 'purple'
  },
  {
    id: 2,
    title: 'Frontend Web3 Engineer',
    company: 'OpenSea',
    companyLogo: '◊',
    location: 'San Francisco, CA',
    salary: '$130,000 - $180,000',
    salaryMin: 130000,
    salaryMax: 180000,
    tags: ['React', 'TypeScript', 'Web3.js', 'NFTs'],
    postedAt: '5 days ago',
    description: 'OpenSea is the world\'s largest marketplace for NFTs and digital collectibles. We\'re seeking a talented Frontend Engineer to help build the next generation of our marketplace interface. You\'ll work closely with designers and backend engineers to create intuitive, high-performance user experiences.\n\nExperience with React, modern JavaScript/TypeScript, and ideally familiarity with blockchain concepts is required. You should be comfortable working in a fast-paced startup environment and have a passion for user-centric design.',
    offerings: [
      'Competitive compensation and equity package',
      'Relocation assistance available',
      'Comprehensive health, dental, and vision coverage',
      'Free lunch and beverages in office',
      'Professional development opportunities',
      'Flexible PTO policy'
    ],
    isFeatured: false,
    isRemote: false,
    cardType: 'teal'
  },
  {
    id: 3,
    title: 'DeFi Protocol Engineer',
    company: 'Aave',
    companyLogo: '⬢',
    location: 'Remote',
    salary: '$140,000 - $190,000',
    salaryMin: 140000,
    salaryMax: 190000,
    tags: ['Solidity', 'DeFi', 'Hardhat', 'Cairo'],
    postedAt: '1 week ago',
    description: 'Aave is a leading decentralized lending protocol. We\'re hiring a Protocol Engineer to help design and implement new features, optimize gas efficiency, and maintain the security of our smart contracts. This role requires strong understanding of DeFi mechanics, financial mathematics, and blockchain security best practices.\n\nYou\'ll participate in code reviews, security audits, and architectural discussions. Previous experience with DeFi protocols or participation in governance is a plus.',
    offerings: [
      'Generous salary and token allocation',
      'Remote work with flexible hours',
      'Opportunities to shape protocol direction',
      'Exposure to top security auditors',
      'Annual conference attendance budget',
      'Collaborative international team'
    ],
    isFeatured: true,
    isRemote: true,
    cardType: 'yellow'
  },
  {
    id: 4,
    title: 'Blockchain Security Auditor',
    company: 'Trail of Bits',
    companyLogo: '⚔',
    location: 'Remote',
    salary: '$120,000 - $170,000',
    salaryMin: 120000,
    salaryMax: 170000,
    tags: ['Security', 'Solidity', 'Auditing', 'Formal Verification'],
    postedAt: '3 days ago',
    description: 'Trail of Bits is a world-renowned cybersecurity company specializing in blockchain security. We\'re looking for experienced security auditors to review and audit smart contracts, identify vulnerabilities, and work with clients to improve their security posture.\n\nStrong analytical skills, attention to detail, and knowledge of common smart contract vulnerabilities (reentrancy, overflow, etc.) are essential. You should be comfortable reading and analyzing complex code and explaining findings to non-technical stakeholders.',
    offerings: [
      'Competitive salary with annual bonuses',
      'Full remote flexibility',
      'Work with top blockchain projects',
      'Training in latest security techniques',
      'Health and wellness benefits',
      'Opportunities for publishing research'
    ],
    isFeatured: false,
    isRemote: true,
    cardType: 'default'
  },
  {
    id: 5,
    title: 'Smart Contract Developer',
    company: 'Polygon',
    companyLogo: '◀',
    location: 'Lisbon, Portugal',
    salary: '$100,000 - $150,000',
    salaryMin: 100000,
    salaryMax: 150000,
    tags: ['Solidity', 'Layer 2', 'Go', 'Rust'],
    postedAt: '1 week ago',
    description: 'Polygon is scaling Ethereum through multiple technologies. We\'re expanding our team and looking for talented smart contract developers to build and maintain our suite of smart contracts. You\'ll work on optimizations, new features, and help other developers build on our platform.\n\nExperience with Solidity and understanding of scaling solutions is important. We value problem-solving skills and willingness to learn new technologies.',
    offerings: [
      'Competitive European salary package',
      'Visa sponsorship provided',
      'Relocation package available',
      'Team retreats and social events',
      'Learning budget for courses',
      'Collaborative European hub office'
    ],
    isFeatured: false,
    isRemote: false,
    cardType: 'purple'
  },
  {
    id: 6,
    title: 'Full Stack Web3 Developer',
    company: 'MetaMask',
    companyLogo: '🦊',
    location: 'Remote',
    salary: '$130,000 - $190,000',
    salaryMin: 130000,
    salaryMax: 190000,
    tags: ['TypeScript', 'React', 'Web3', 'Extensions'],
    postedAt: '4 days ago',
    description: 'MetaMask is the world\'s leading self-custodial wallet and gateway to Web3. We\'re looking for Full Stack Web3 Developers to enhance our wallet and browser extension. You\'ll work on features that help millions of users interact with blockchain safely and securely.\n\nStrong JavaScript/TypeScript skills, experience with browser extensions, and understanding of Web3 concepts are required. You should be passionate about decentralization and user empowerment.',
    offerings: [
      'Highly competitive compensation',
      'Full remote worldwide',
      'Unlimited PTO',
      'Crypto grants and token allocation',
      'Conference and learning budget',
      'Supportive and innovative team culture'
    ],
    isFeatured: true,
    isRemote: true,
    cardType: 'teal'
  }
];
