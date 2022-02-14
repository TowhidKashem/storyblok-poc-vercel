import { DropdownItem } from './_data';

// Get all items in a parent folder dynamically from storyblok
export const getDropdownItems = (
  links: CategoryLink[],
  storyblokFolderId: number
): DropdownItem[] => {
  return links
    .filter(({ parent_id }) => parent_id === storyblokFolderId)
    .map(({ name, slug }) => ({
      label: name,
      url: `/${slug}`,
      description: ''
    }));
};
