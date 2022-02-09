import { StoryParams, StoryData } from 'storyblok-js-client';
import Storyblok from '@storyblok/client';

export const getStoryblokOptions = (): StoryParams => {
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

export const getPage = async (
  slug: string,
  pageName: string,
  joinFields: string[] = []
): Promise<{
  links: LinkBloks;
  story: StoryData;
}> => {
  const options = getStoryblokOptions();

  const [links, home] = await Promise.all([
    Storyblok.get('cdn/links', options),
    Storyblok.get(`cdn/stories/${slug}`, {
      ...options,
      resolve_relations: [`${pageName}.layout`, ...joinFields].join(',')
    })
  ]);

  return {
    links: links.data.links,
    story: home.data.story
  };
};
