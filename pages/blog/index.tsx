import type { NextPage } from 'next';
import type { PageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory, getStories } from '@utils/api';
import Layout, { LayoutProps } from '@components/Layout/Layout';
import Hero from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

const BlogIndex: NextPage<{
  story: PageStoryblok;
  layout: LayoutProps;
  posts: any;
}> = ({ story, layout, posts }) => {
  story = useStoryBlok(story);

  const { hero } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout}>
        <section className="resources-index content-center">
          <Hero blok={hero[0]} />

          <section className="stage">
            <main className="flex">
              {posts.map((post: any) => (
                <Link key={post.uuid} href={post.full_slug}>
                  <Card blok={post.content} />
                </Link>
              ))}
            </main>
          </section>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticProps() {
  const { story, layout } = await getStory('blog/blog-index');

  const posts = await getStories({
    filter_query: {
      component: {
        in: 'Blog Post'
      }
    }
  });

  return {
    props: {
      story,
      layout,
      posts
    }
  };
}

export default BlogIndex;
