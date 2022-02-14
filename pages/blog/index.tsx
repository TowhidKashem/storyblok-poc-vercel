import type { NextPage } from 'next';
import type { BlogIndexStoryblok } from 'storyblok.types';
import { useState } from 'react';
import SbEditable from 'storyblok-react';
import useStoryBlok from '@hooks/useStoryBlok';
import Storyblok from '@storyblok/client';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import { BlogHero } from '@components/Hero';
import Card from '@components/Card';
import Link from '@components/Link';

interface Props extends BaseProps<BlogIndexStoryblok> {
  initialPosts: any;
}

const options = getOptions();

async function fetchPosts(page: number) {
  const posts = await Storyblok.get('cdn/stories', {
    ...options,
    page,
    per_page: 12,
    filter_query: {
      component: {
        in: 'blog_post'
      }
    }
  });

  return posts.data.stories;
}

const BlogHome: NextPage<Props> = ({
  categoryLinks,
  blogCategoryLinks,
  story,
  initialPosts
}) => {
  story = useStoryBlok(story);

  const { layout, featured_hero } = story.content;

  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    const newPosts = await fetchPosts(page + 1);
    setPosts((prevPosts: any) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

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
          <button onClick={loadMore} className="btn btn-light-blue load-more">
            Load More
          </button>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticProps() {
  const props = await getPage({
    slug: 'blog/blog_index',
    contentType: 'blog_index',
    joinFields: ['featured_hero']
  });

  const posts = await fetchPosts(1);

  return {
    props: {
      ...props,
      initialPosts: posts
    }
  };
}

export default BlogHome;
