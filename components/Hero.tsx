import type { NextPage } from 'next';
import type { HeroStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { truncate } from '@utils/string';

const Hero: NextPage<{ blok: HeroStoryblok }> = ({ blok }) => {
  const { title, description, image } = blok;
  const button = blok.button.first();

  return (
    <SbEditable content={blok}>
      <section
        className="hero px-10 py-24 mb-10 content-center"
        style={{ backgroundImage: `url(${image.filename})` }}
      >
        <h2 className="font-bold text-6xl mb-5">{title}</h2>
        <p className="text-2xl text-gray-500 mb-10 w-6/12">{description}</p>
        <a href={button.url} className="btn text-xl font-normal py-4 px-8 mb-3">
          {button.label}
        </a>
      </section>
    </SbEditable>
  );
};

export const BlogHero: NextPage<{ blok: HeroStoryblok }> = ({ blok }) => {
  const { title, body, image } = blok.content;

  const excerpt = body.content
    .find(({ type }: any) => type === 'paragraph')
    .content.first().text;

  return (
    <SbEditable content={blok}>
      <section
        className="hero px-10 py-24 mb-10 content-center"
        style={{ backgroundImage: `url(${image.filename})` }}
      >
        <h2 className="font-bold text-6xl mb-5">{title}</h2>
        <p className="text-2xl text-gray-500 mb-10 w-6/12">
          {truncate(excerpt, 200)}
        </p>
        <a
          href={`/blog/${blok.slug}`}
          className="btn text-xl font-normal py-4 px-8 mb-3"
        >
          Read More
        </a>
      </section>
    </SbEditable>
  );
};

export default Hero;
