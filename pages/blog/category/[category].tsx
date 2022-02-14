import type { NextPage, GetStaticProps } from 'next';
import type { BlogCategoryStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Card from '@components/Card';
import Link from '@components/Link';
import { BlogHero } from '@components/Hero';

interface Props extends BaseProps<BlogCategoryStoryblok> {
  posts: any;
}

const BlogCategory: NextPage<Props> = ({
  categoryLinks,
  blogCategoryLinks,
  story,
  posts
}) => {
  story = useStoryBlok(story);

  const { layout, name, featured_hero } = story.content;

  return (
    <SbEditable content={story.content}>
      <Layout
        layout={layout}
        categoryLinks={categoryLinks}
        blogCategoryLinks={blogCategoryLinks}
        isBlogSection
      >
        <section className="resource-page resources-index content-center">
          <h1 className="text-4xl font-bold mb-5">{name}</h1>

          {featured_hero && <BlogHero blok={featured_hero} />}

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

export async function getStaticPaths() {
  const options = getOptions();

  const posts = await Storyblok.getAll('cdn/stories', {
    ...options,
    filter_query: {
      component: {
        in: 'blog_category'
      }
    }
  });

  return {
    paths: posts.map(({ full_slug }) => '/' + full_slug),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({
  params: { category }
}) => {
  const options = getOptions();

  // get category page
  const props = await getPage({
    slug: `blog/category/${category}`,
    contentType: 'blog_category',
    joinFields: ['featured_hero']
  });

  // get all posts that belong in category
  const posts = await Storyblok.get('cdn/stories', {
    ...options,
    page: 1,
    per_page: 12,
    filter_query: {
      categories: {
        in_array: category.toString()
      }
    }
  });

  return {
    props: {
      ...props,
      posts: posts.data.stories
    }
  };
};

export default BlogCategory;
