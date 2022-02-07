export interface LinkBlok {
  id: number;
  is_folder: boolean;
  is_startpage: boolean;
  name: string;
  parent_id: number;
  path: string;
  position: number;
  published: boolean;
  real_path: string;
  slug: string;
  uuid: string;
}

export interface LinkBloks {
  [key: string]: LinkBlok;
}

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
    url: '/pages/pricing/pricing',
    hasDropdown: false
  },
  {
    storyblokFolderId: 103429440,
    label: 'Resources',
    url: '/Resources',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Blog',
        url: '/Blog',
        description: 'Tips, best practices and more'
      },
      {
        label: 'Developers',
        url: 'https://dev.bitly.com/',
        description: 'API documentation and resources'
      },
      {
        label: 'Resources Library',
        url: '/Resources',
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
