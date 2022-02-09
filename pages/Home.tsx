import type { NextPage } from 'next';
import type { PageStoryblok } from 'storyblok';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage } from '@utils/api';
import Feature from '@components/Feature';
import Layout from '@components/Layout/Layout';
import Hero from '@components/Hero';

const Home: NextPage<{
  readonly links: LinkBloks;
  readonly story: PageStoryblok;
}> = ({ links, story }) => {
  story = useStoryBlok(story);

  const { layout, hero, card_spotlight, faq } = story.content;
  const { title, answers } = faq.first();

  return (
    <SbEditable content={story.content}>
      <Layout layout={layout.content} links={links}>
        <section className="home content-center">
          <Hero blok={hero.first()} />

          <Feature blok={card_spotlight.first()} />

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
  const props = await getPage('home', 'home_page');
  return { props };
}

export default Home;
