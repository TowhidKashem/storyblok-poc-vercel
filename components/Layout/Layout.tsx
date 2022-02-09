import type { NextPage } from 'next';
import type { LayoutStoryblok } from 'storyblok.types';
import Head from 'next/head';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import CTA from '@components/Layout/CTA';

const Layout: NextPage<{
  readonly links: LinkBlok[];
  readonly layout: LayoutStoryblok;
}> = ({ links, layout, children }) => {
  const { header, bottom_cta } = layout;

  return (
    <div className="bitly">
      <Head>
        <title>Bitly global title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header links={links} rightNav={header.first()} />

      <main className="content">{children}</main>

      <CTA bottom_cta={bottom_cta.first()} />

      <Footer links={links} />
    </div>
  );
};

export default Layout;
