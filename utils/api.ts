import { StoryParams, StoryData, StoriesParams } from 'storyblok-js-client';
import Storyblok from '@lib/storyblok';
import type { LayoutProps } from '@components/Layout/Layout';

export const makeParams = (): StoryParams => {
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

export const getLayout = async (): Promise<LayoutProps> => {
  const options = makeParams();

  try {
    const links = await Storyblok.get('cdn/links', options); // nav links
    const story = await Storyblok.get('cdn/stories/layout', options); // header, bottom cta

    return {
      links: links.data.links,
      story: story.data.story
    };
  } catch (error) {
    throw error;
  }
};

export const getStory = async (
  slug: string
): Promise<{
  story: StoryData;
  layout: LayoutProps;
}> => {
  const options = makeParams();

  try {
    const layout = await getLayout();
    const story = await Storyblok.get('cdn/stories/' + slug, options);

    return {
      story: story.data.story,
      layout
    };
  } catch (error) {
    throw error;
  }
};

export const getStories = async (
  query: StoriesParams['filter_query']
): Promise<StoryData[]> => {
  const options = makeParams();

  try {
    const stories = await Storyblok.getAll('cdn/stories', {
      ...options,
      ...query
    });

    return stories;
  } catch (error) {
    throw error;
  }
};
