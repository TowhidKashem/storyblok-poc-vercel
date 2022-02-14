interface NavigationItem {
  storyblokFolderId: number;
  label: string;
  url: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

export interface DropdownItem
  extends Omit<
    NavigationItem,
    'storyblokFolderId' | 'hasDropdown' | 'dropdownItems'
  > {
  description: string;
}

export const navigationItems: NavigationItem[] = [
  {
    storyblokFolderId: 102322417,
    label: 'Why Bitly?',
    url: null,
    hasDropdown: true
  },
  {
    storyblokFolderId: 102322447,
    label: 'Solutions',
    url: null,
    hasDropdown: true
  },
  {
    storyblokFolderId: 102322516,
    label: 'Features',
    url: null,
    hasDropdown: true
  },
  {
    storyblokFolderId: null,
    label: 'Pricing',
    url: '/pricing',
    hasDropdown: false
  },
  {
    storyblokFolderId: 103429440,
    label: 'Resources',
    url: '/resources',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Blog',
        url: '/blog',
        description: 'Tips, best practices and more'
      },
      {
        label: 'Developers',
        url: 'https://dev.bitly.com/',
        description: 'API documentation and resources'
      },
      {
        label: 'Resources Library',
        url: '/resources',
        description: 'Ebooks and webinars'
      },
      {
        label: 'Support',
        url: 'https://support.bitly.com/hc/en-us',
        description: 'FAQs and help articles'
      }
    ]
  }
];

export const blogNavigationItems = [
  {
    label: 'Digital Marketing',
    url: '/blog/category/digital-marketing'
  },
  {
    label: 'Social Media Marketing',
    url: '/blog/category/social-media-marketing'
  },
  {
    label: 'Customer Service',
    url: '/blog/category/customer-service'
  },
  {
    label: 'Branding',
    url: '/blog/category/branding'
  }
];
