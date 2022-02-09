import type { NextPage, GetStaticProps } from 'next';
import type { PageStoryblok } from 'storyblok';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import { getPage, getStoryblokOptions } from '@utils/api';
import Storyblok from '@lib/storyblok';
import useStoryBlok from '@hooks/useStoryBlok';
import Layout from '@components/Layout/Layout';

const BlogPost: NextPage<{
  readonly links: LinkBloks;
  readonly story: PageStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

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
  const options = getStoryblokOptions();

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
  const props = await getPage(`blog/posts/${post}`, 'blog_post', [
    'blog_post.author'
  ]);
  return { props };
};

export default BlogPost;
