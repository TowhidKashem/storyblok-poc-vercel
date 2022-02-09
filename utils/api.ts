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
  links: LinkBlok[];
  story: StoryData;
}> => {
  const options = getOptions();
  const resolveFields = ['layout', ...joinFields]
    .map((field) => `${contentType}.${field}`)
    .join(',');

  const [links, story] = await Promise.all([
    Storyblok.getAll('cdn/links', {
      ...options
    }),
    Storyblok.get(`cdn/stories/${slug}`, {
      ...options,
      resolve_relations: resolveFields
    })
  ]);

  return {
    links,
    story: story.data.story
  };
};
