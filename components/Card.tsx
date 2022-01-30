import type { NextPage } from 'next';
import type { CardStoryblok } from 'storyblok.types';
import Image from 'next/image';
import SbEditable from 'storyblok-react';

const Card: NextPage<{ blok: CardStoryblok }> = ({ blok }) => {
  const { thumbnail, title, description } = blok;

  return (
    <SbEditable content={blok}>
      <article className="card w-1/3 p-4">
        <Image src={thumbnail.filename} alt="" width={330} height={180} />
        <header className="font-bold font-lg mb-3">{title}</header>
        <p>{description}</p>
      </article>
    </SbEditable>
  );
};

export default Card;
