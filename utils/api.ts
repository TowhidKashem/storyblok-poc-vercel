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
  links: LinkBloks;
  story: StoryData;
}> => {
  const options = getOptions();
  const resolveFields = ['layout', ...joinFields]
    .map((field) => `${contentType}.${field}`)
    .join(',');

  const [links, story] = await Promise.all([
    Storyblok.get('cdn/links', options),
    Storyblok.get(`cdn/stories/${slug}`, {
      ...options,
      resolve_relations: resolveFields
    })
  ]);

  return {
    links: links.data.links,
    story: story.data.story
  };
};
