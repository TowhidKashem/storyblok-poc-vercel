import type { StoryParams, StoryData } from 'storyblok-js-client';
import Storyblok from '@storyblok/client';

export const getOptions = (): StoryParams => {
  const isPreview = process.env.ENVIRONMENT === 'development';

  if (isPreview) {
    return {
      version: 'draft',
      cv: Date.now()
    };
  }

  return {
    version: 'published'
  };
};

export const getPage = async ({
  slug,
  contentType,
  joinFields = []
}: {
  slug: string;
  contentType: string;
  joinFields?: string[];
}): Promise<{
  categoryLinks: CategoryLink[];
  blogCategoryLinks: CategoryLink[];
  story: StoryData;
}> => {
  const options = getOptions();
  const resolveFields = ['layout', ...joinFields]
    .map((field) => `${contentType}.${field}`)
    .join(',');

  const [categoryLinks, blogCategoryLinks, story] = await Promise.all([
    // Category nav
    Storyblok.getAll('cdn/links', options),

    // Blog category nav
    Storyblok.getAll('cdn/datasource_entries', {
      ...options,
      datasource: 'blog-categories'
    }),

    // Pages in category dropdown
    Storyblok.get(`cdn/stories/${slug}`, {
      ...options,
      resolve_relations: resolveFields
    })
  ]);

  return {
    categoryLinks,
    blogCategoryLinks,
    story: story.data.story
  };
};
