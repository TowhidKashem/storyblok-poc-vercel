import type { NextPage } from 'next';
import type { PageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import Storyblok from '@lib/storyblok';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory, getStories, makeParams } from '@utils/api';
import Layout, { LayoutProps } from '@components/Layout/Layout';
import Hero from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

const Resources: NextPage<{
  story: PageStoryblok;
  layout: LayoutProps;
  tags: any;
  posts: any;
}> = ({ story, layout, tags, posts }) => {
  story = useStoryBlok(story);

  const { hero } = story.content;

  console.log('posts', posts);

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

            <aside>
              <header className="font-bold mb-5">Filter Resources</header>
              <ul>
                {tags.map((tag: any) => (
                  <li key={tag.name}>
                    <span className="tag">{tag.name}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticProps() {
  // get index page's story and base layout
  const { story, layout } = await getStory('resource-index');

  // get tags
  const {
    data: { tags }
  } = await Storyblok.get('cdn/tags', makeParams());

  // get all posts in the resources folder
  const posts = await getStories({
    filter_query: {
      component: {
        in: 'Resource Page'
      }
    }
  });

  return {
    props: {
      story,
      layout,
      tags,
      posts
    }
  };
}

export default Resources;
