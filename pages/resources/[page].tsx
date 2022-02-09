import type { NextPage, GetStaticProps } from 'next';
import type { ResourcePageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';

const ResourcePage: NextPage<{
  readonly links: LinkBloks;
  readonly story: ResourcePageStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

  const { layout, title, body } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="resource-page content-center">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <main className="content">{render(body)}</main>
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
        in: 'resource_page'
      }
    }
  });

  return {
    paths: posts.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { page } }) => {
  return {
    props: await getPage({
      slug: `resources/${page}`,
      contentType: 'resource_page'
    })
  };
};

export default ResourcePage;
