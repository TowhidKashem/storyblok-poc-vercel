import type { NextPage } from 'next';
import type { LayoutStoryblok } from 'storyblok.types';
import Head from 'next/head';
import Header from '@components/Layout/Header';
import HeaderBlog from '@components/Layout/HeaderBlog';
import Footer from '@components/Layout/Footer';
import CTA from '@components/Layout/CTA';

const Layout: NextPage<{
  readonly categoryLinks: CategoryLink[];
  readonly blogCategoryLinks: BlogCategoryLink[];
  readonly layout: LayoutStoryblok;
  readonly isBlogSection?: boolean;
}> = ({
  categoryLinks,
  blogCategoryLinks,
  layout,
  isBlogSection,
  children
}) => {
  const { header, bottom_cta } = layout.content;

  return (
    <div className="bitly">
      <Head>
        <title>Bitly global title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header categoryLinks={categoryLinks} rightNav={header.first()} />

      {isBlogSection && <HeaderBlog blogCategoryLinks={blogCategoryLinks} />}

      <main className="content">{children}</main>

      <CTA bottom_cta={bottom_cta.first()} />

      <Footer categoryLinks={categoryLinks} />
    </div>
  );
};

export default Layout;
