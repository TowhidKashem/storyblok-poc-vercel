import { LinkBlok, DropdownItem } from './_data';

// Get all items in a parent folder dynamically from storyblok
export const getDropdownItems = (
  links: LinkBlok[],
  storyblokFolderId: number
): DropdownItem[] => {
  return links
    .filter(({ parent_id }) => parent_id === storyblokFolderId)
    .map(({ name, path }) => ({
      label: name,
      url: path,
      description: ''
    }));
};