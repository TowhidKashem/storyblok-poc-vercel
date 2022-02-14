import type { NextPage } from 'next';
import SbEditable from 'storyblok-react';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Hero from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

interface Props extends BaseProps<any> {
  readonly posts: any;
  readonly tags: any;
}

const SearchPage: NextPage<Props> = ({
  categoryLinks,
  blogCategoryLinks,
  story,
  posts,
  tags
}) => {
  story = useStoryBlok(story);

  const { layout, hero } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout
        layout={layout}
        categoryLinks={categoryLinks}
        blogCategoryLinks={blogCategoryLinks}
        isBlogSection
      >
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
  const options = getOptions();

  const props = await getPage({
    slug: 'resources/resource-index',
    contentType: 'search'
  });

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
