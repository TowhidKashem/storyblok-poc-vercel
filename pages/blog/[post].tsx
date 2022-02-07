import type { NextPage, GetStaticProps } from 'next';
import type { InnerPageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory, getStories } from '@utils/api';
import Layout, { LayoutProps } from '@components/Layout/Layout';
import Hero from '@components/Hero';
import HeroDetail from '@components/HeroDetail';

const Post: NextPage<{ story: InnerPageStoryblok; layout: LayoutProps }> = ({
  story,
  layout
}) => {
  story = useStoryBlok(story);

  const { hero, detail_cards } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout}>
        <section className="page content-center">
          <Hero blok={hero[0]} />

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
  const stories = await getStories({
    filter_query: {
      component: {
        in: 'Inner Page'
      }
    }
  });

  return {
    paths: stories.map(({ full_slug }) => '/pages/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const [category, page] = context.params.slug as string[];
  const { story, layout } = await getStory(`${category}/${page}`);

  return {
    props: {
      story,
      layout
    }
  };
};

export default Post;
