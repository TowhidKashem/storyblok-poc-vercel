import type { NextPage } from 'next';
import type { BlogIndexStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import Storyblok from '@storyblok/client';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import { BlogHero } from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

interface Props extends BaseProps<BlogIndexStoryblok> {
  posts: any;
}

const BlogHome: NextPage<Props> = ({
  categoryLinks,
  blogCategoryLinks,
  story,
  posts
}) => {
  story = useStoryBlok(story);

  const { layout, featured_hero } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout
        layout={layout}
        categoryLinks={categoryLinks}
        blogCategoryLinks={blogCategoryLinks}
        isBlogSection
      >
        <section className="resources-index content-center">
          <BlogHero blok={featured_hero} />

          <section className="stage">
            <main className="post-list">
              {posts.map((post: any) => (
                <Link key={post.uuid} href={`/blog/${post.slug}`}>
                  <Card key={post.uuid} blok={post.content} />
                </Link>
              ))}
            </main>
          </section>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticProps() {
  const options = getOptions();

  const props = await getPage({
    slug: 'blog/blog_index',
    contentType: 'blog_index',
    joinFields: ['featured_hero']
  });

  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'blog_post'
      }
    }
  });

  return {
    props: {
      ...props,
      posts
    }
  };
}

export default BlogHome;
