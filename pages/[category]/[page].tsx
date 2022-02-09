import type { NextPage, GetStaticProps } from 'next';
import SbEditable from 'storyblok-react';
import type { PageStoryblok } from 'storyblok';
import useStoryBlok from '@hooks/useStoryBlok';
import Storyblok from '@lib/storyblok';
import { getPage, getStoryblokOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Hero from '@components/Hero';
import HeroDetail from '@components/HeroDetail';

const CategoryPage: NextPage<{
  readonly links: LinkBloks;
  readonly story: PageStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

  const { layout, hero, detail_cards } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="page content-center">
          <Hero blok={hero.first()} />

          {detail_cards.map((card: any, index: number) => (
            <HeroDetail
              key={card._uid}
              blok={card}
              alignImageLeft={index % 2 !== 0}
            />
          ))}
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticPaths() {
  const options = getStoryblokOptions();

  const pages = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'category_page'
      }
    }
  });

  return {
    paths: pages.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({
  params: { category, page }
}) => {
  const props = await getPage(`${category}/${page}`, 'category_page');
  return { props };
};

export default CategoryPage;
