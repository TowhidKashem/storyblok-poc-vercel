import type { NextPage } from 'next';
import type { PageStoryblok } from 'storyblok';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import Storyblok from '@lib/storyblok';
import { getPage, getStoryblokOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Hero from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

const BlogHome: NextPage<{
  readonly links: LinkBloks;
  readonly story: PageStoryblok;
  posts: any;
}> = ({ links, story, posts }) => {
  story = useStoryBlok(story);

  const { layout, hero } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="resources-index content-center">
          <Hero blok={hero.first()} />

          <section className="stage">
            <main className="flex">
              {posts.map((post: any) => (
                <Link key={post.uuid} href={`/blog/${post.slug}`}>
                  <Card key={post.uuid} blok={post.content} />
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
  const options = getStoryblokOptions();

  const props = await getPage('blog/blog_index', 'blog_index');

  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'blog_post'
      }
    }
  });

  return {
    props: {
      ...props,
      posts
    }
  };
}

export default BlogHome;
