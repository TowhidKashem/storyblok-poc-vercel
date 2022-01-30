import type { NextPage } from 'next';
import type { HeroStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';

const Hero: NextPage<{ blok: HeroStoryblok }> = ({ blok }) => {
  const { title, description, image, button } = blok;

  return (
    <SbEditable content={blok}>
      <section
        className="hero px-10 py-24 mb-10 content-center"
        style={{ backgroundImage: `url(${image.filename})` }}
      >
        <h2 className="font-bold text-6xl mb-5">{title}</h2>
        <p className="text-2xl text-gray-500 mb-10 w-6/12">{description}</p>
        <a
          href={button[0].url}
          className="btn text-xl font-normal py-4 px-8 mb-3"
        >
          {button[0].label}
        </a>
      </section>
    </SbEditable>
  );
};

export default Hero;
