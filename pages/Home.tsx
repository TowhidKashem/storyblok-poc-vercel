import type { NextPage } from 'next';
import type { PageStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import { getStory } from '@utils/api';
import Feature from '@components/Feature';
import Layout, { LayoutProps } from '@components/Layout/Layout';
import Hero from '@components/Hero';

const Home: NextPage<{ story: PageStoryblok; layout: LayoutProps }> = ({
  story,
  layout
}) => {
  story = useStoryBlok(story);

  const { hero, card_spotlight, faq } = story.content;

  const { title, answers } = faq[0];

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout}>
        <section className="home content-center">
          <Hero blok={hero[0]} />

          <Feature blok={card_spotlight[0]} />

          <SbEditable content={faq}>
            <section className="faq">
              <header className="text-3xl text-center font-bold mb-3">
                {title}
              </header>
              {answers.map((answer: any) => (
                <SbEditable key={answer.title} content={answer}>
                  <details className="mb-8">
                    <summary className="text-2xl font-bold">
                      {answer.title}
                    </summary>
                    {answer.description}
                  </details>
                </SbEditable>
              ))}
            </section>
          </SbEditable>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticProps() {
  const { story, layout } = await getStory('home');

  return {
    props: {
      story,
      layout
    }
  };
}

export default Home;
