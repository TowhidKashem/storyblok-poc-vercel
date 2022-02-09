import type { NextPage, GetStaticProps } from 'next';
import type { BlogAuthorStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';

const AuthorPage: NextPage<{
  readonly links: LinkBloks;
  readonly story: BlogAuthorStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

  const { layout, name, bio } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{name}</h1>
          <main className="content">{bio}</main>
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
  return {
    props: await getPage({
      slug: `blog/author/${author}`,
      contentType: 'blog_author'
    })
  };
};

export default AuthorPage;
