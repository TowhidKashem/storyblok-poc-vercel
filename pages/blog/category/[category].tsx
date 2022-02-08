import type { NextPage, GetStaticProps } from 'next';
import type { InnerPageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory, getStories } from '@utils/api';
import Layout, { LayoutProps } from '@components/Layout/Layout';

const CategoryPage: NextPage<{
  readonly story: InnerPageStoryblok;
  readonly layout: LayoutProps;
}> = ({ story, layout }) => {
  story = useStoryBlok(story);

  const { name } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{name}</h1>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticPaths() {
  const stories = await getStories({
    filter_query: {
      component: {
        in: 'blog_category'
      }
    }
  });

  return {
    paths: stories.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({
  params: { category }
}) => {
  const { story, layout } = await getStory(`blog/category/${category}`);

  return {
    props: {
      story,
      layout
    }
  };
};

export default CategoryPage;
