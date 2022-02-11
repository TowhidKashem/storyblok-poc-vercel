import type { NextPage, GetStaticProps } from 'next';
import type { BlogAuthorStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Card from '@components/Card';
import Link from '@components/Link';

const AuthorPage: NextPage<{
  readonly links: LinkBlok[];
  readonly story: BlogAuthorStoryblok;
  posts: any;
}> = ({ links, story, posts }) => {
  story = useStoryBlok(story);

  const { layout, name, bio } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="resource-page resources-index content-center">
          <h1 className="text-4xl font-bold mb-5">Posts by {name}</h1>
          <p>{bio}</p>
          <br />
          <br />
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
    </SbEditable>
  );
};

export async function getStaticPaths() {
  const options = getOptions();

  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'blog_author'
      }
    }
  });

  return {
    paths: posts.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({
  params: { author }
}) => {
  const options = getOptions();

  const props = await getPage({
    slug: `blog/author/${author}`,
    contentType: 'blog_author',
    joinFields: ['author']
  });

  // get all posts by this author
  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      author: {
        in: props.story.uuid
      }
    }
  });

  return {
    props: {
      ...props,
      posts
    }
  };
};

export default AuthorPage;
