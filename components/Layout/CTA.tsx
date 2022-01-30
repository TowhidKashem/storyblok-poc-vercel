import type { NextPage } from 'next';
import type { BottomCtaStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import Link from '@components/Link';

const CTA: NextPage<{
  readonly bottom_cta: BottomCtaStoryblok;
}> = ({ bottom_cta }) => {
  const { url, label } = bottom_cta.button[0];
  return (
    <SbEditable content={bottom_cta}>
      <section className="spotlight center text-center py-16">
        <section className="content-center">
          <h2 className="font-semibold text-3xl text-white mb-5">
            <span>{bottom_cta.title}</span>
          </h2>
          <SbEditable content={bottom_cta.button[0]}>
            <Link href={url} className="btn">
              {label}
            </Link>
          </SbEditable>
        </section>
      </section>
    </SbEditable>
  );
};

export default CTA;
