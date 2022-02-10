import type { NextPage, GetStaticProps } from 'next';
import type { BlogPostStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import { getPage, getOptions } from '@utils/api';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import Layout from '@components/Layout/Layout';

const BlogPost: NextPage<{
  readonly links: LinkBlok[];
  readonly story: BlogPostStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

  console.log('story', story);

  const { layout, title, body, thumbnail, author } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <main className="content">{render(body)}</main>
          <section className="byline">
            <address className="author">
              By{' '}
              <a rel="author" href="/author/john-doe">
                {author.name}
              </a>
            </address>
            on{' '}
            <time dateTime="2011-08-28" title="August 28th, 2011">
              {story.first_published_at}
            </time>
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
        in: 'blog_post'
      }
    }
  });

  return {
    paths: posts.map(({ slug }) => `/blog/${slug}`),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { post } }) => {
  return {
    props: await getPage({
      slug: `blog/posts/${post}`,
      contentType: 'blog_post',
      joinFields: ['author']
    })
  };
};

export default BlogPost;
