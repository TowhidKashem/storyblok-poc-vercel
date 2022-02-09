import type { NextPage, GetStaticProps } from 'next';
import type { PageStoryblok } from 'storyblok';
import Storyblok from '@lib/storyblok';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getStoryblokOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';

const TagPage: NextPage<{
  readonly links: LinkBloks;
  readonly story: PageStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

  const { layout, name } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{name}</h1>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticPaths() {
  const options = getStoryblokOptions();

  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'blog_category'
      }
    }
  });

  return {
    paths: posts.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({
  params: { category }
}) => {
  const props = await getPage(`blog/category/${category}`, 'blog_category');
  return { props };
};

export default TagPage;
