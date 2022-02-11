import type { NextPage, GetStaticProps } from 'next';
import type { BlogTagStoryblok } from 'storyblok.types';
import Storyblok from '@storyblok/client';
import { getPage, getOptions } from '@utils/api';
import { slugify, unslugify } from '@utils/url';
import Layout from '@components/Layout/Layout';
import Card from '@components/Card';
import Link from '@components/Link';

const TagPage: NextPage<{
  readonly links: LinkBlok[];
  readonly story: BlogTagStoryblok;
  tag: string;
  posts: any;
}> = ({ links, story, tag, posts }) => {
  const { layout } = story.content;

  return (
    <Layout layout={layout.content} links={links}>
      <section className="resource-page resources-index content-center">
        <h1 className="text-4xl font-bold mb-5">{unslugify(tag)}</h1>
        <section className="stage">
          <main className="post-list">
            {posts.map((post: any) => (
              <Link key={post.uuid} href={`/blog/${post.slug}`}>
                <Card key={post.uuid} blok={post.content} />
              </Link>
            ))}
          </main>
        </section>
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const options = getOptions();

  const tags = await Storyblok.getAll('cdn/tags', options);

  return {
    paths: tags.map(({ name }) => `/blog/tag/${slugify(name)}`),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { tag } }) => {
  const options = getOptions();

  const props = await getPage({
    slug: `blog/tag_index`,
    contentType: 'tag_index'
  });

  // get all posts that are tagged with this tag
  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    with_tag: tag
  });

  return {
    props: {
      ...props,
      tag,
      posts
    }
  };
};

export default TagPage;
