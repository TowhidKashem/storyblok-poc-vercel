import type { NextPage, GetStaticProps } from 'next';
import type { InnerPageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory, getStories } from '@utils/api';
import Layout, { LayoutProps } from '@components/Layout/Layout';

const BlogPost: NextPage<{
  story: InnerPageStoryblok;
  layout: LayoutProps;
}> = ({ story, layout }) => {
  story = useStoryBlok(story);

  const { title, body, thumbnail, author } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <main className="content">{render(body)}</main>
          <section className="byline">
            <address className="author">
              By{' '}
              <a rel="author" href="/author/john-doe">
                John Doe - {author}
              </a>
            </address>
            on{' '}
            <time dateTime="2011-08-28" title="August 28th, 2011">
              8/28/11
            </time>
          </section>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticPaths() {
  const stories = await getStories({
    filter_query: {
      component: {
        in: 'blog_post'
      }
    }
  });

  console.log('stories', stories);

  return {
    paths: stories.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { post } }) => {
  const { story, layout } = await getStory(`blog/posts/${post}`);

  return {
    props: {
      story,
      layout
    }
  };
};

export default BlogPost;
