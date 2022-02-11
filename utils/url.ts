export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s/gi, '-')
    .replace(/[^a-z0-9\-]+/gi, '');
};
