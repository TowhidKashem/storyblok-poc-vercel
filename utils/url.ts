export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s/gi, '-')
    .replace(/[^a-z0-9\-]+/gi, '');
};

export const unslugify = (slug: string) => {
  const result = slug.replace(/\-/g, ' ');
  return result.replace(/\w\S*/g, function (txt: any) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
