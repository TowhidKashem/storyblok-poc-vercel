import type { NextPage } from 'next';
import type { PageStoryblok } from 'storyblok';
import SbEditable from 'storyblok-react';
import Storyblok from '@lib/storyblok';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getStoryblokOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Hero from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

const SearchPage: NextPage<{
  readonly links: LinkBloks;
  readonly story: PageStoryblok;
  readonly tags: any;
  readonly posts: any;
}> = ({ links, story, tags, posts }) => {
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
  const options = getStoryblokOptions();

  const props = await getPage('resources/resource-index', 'search');

  // get tags
  const {
    data: { tags }
  } = await Storyblok.get('cdn/tags', options);

  // get all posts in the resources folder
  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'resource_page'
      }
    }
  });

  return {
    props: {
      ...props,
      tags,
      posts
    }
  };
}

export default SearchPage;
