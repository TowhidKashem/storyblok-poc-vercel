import type { NextPage } from 'next';
import type { HeroDetailStoryblok } from 'storyblok.types';
import classNames from 'classnames';
import Image from 'next/image';
import SbEditable from 'storyblok-react';

const HeroDetail: NextPage<{
  readonly blok: HeroDetailStoryblok;
  readonly alignImageLeft: boolean;
}> = ({ blok, alignImageLeft }) => {
  const { title, description, thumbnail, button } = blok;

  return (
    <SbEditable content={blok}>
      <section
        className={classNames('hero-detail mb-20', {
          'left-align-thumbnail': alignImageLeft
        })}
      >
        <div className="left">
          <h2 className="font-bold text-2xl mb-5">{title}</h2>
          <p className="text-md text-gray-500 mb-10">{description}</p>
          {button.length > 0 && (
            <a
              href={button[0].url}
              className="btn text-xl font-normal py-4 px-8 mb-3"
            >
              {button[0].label}
            </a>
          )}
        </div>
        <div className="right">
          <Image src={thumbnail.filename} alt="" width={470} height={210} />
        </div>
      </section>
    </SbEditable>
  );
};

export default HeroDetail;
