import type { NextPage, GetStaticProps } from 'next';
import type { InnerPageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory, getStories } from '@utils/api';
import Layout, { LayoutProps } from '@components/Layout/Layout';

const ResourcePage: NextPage<{
  story: InnerPageStoryblok;
  layout: LayoutProps;
}> = ({ story, layout }) => {
  story = useStoryBlok(story);

  console.log('story', story);

  const { title, body } = story.content;

  story.tag_list;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <main className="content">{render(body)}</main>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticPaths() {
  const stories = await getStories({
    filter_query: {
      component: {
        in: 'Resource Page'
      }
    }
  });

  return {
    paths: stories.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { story, layout } = await getStory(`resources/${context.params.slug}`);

  return {
    props: {
      story,
      layout
    }
  };
};

export default ResourcePage;
