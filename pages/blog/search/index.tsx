import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SbEditable from 'storyblok-react';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import { getPage, getOptions } from '@utils/api';
import Layout from '@components/Layout/Layout';
import Card from '@components/Card';
import Link from '@components/Link';

const SearchPage: NextPage<BaseProps<any>> = ({
  categoryLinks,
  blogCategoryLinks,
  story
}) => {
  story = useStoryBlok(story);

  const { layout, headline } = story.content;

  const [posts, setPosts] = useState([]);

  const { query } = useRouter();

  useEffect(() => {
    if (query.q) {
      loadSearchResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const loadSearchResults = async () => {
    const options = getOptions();

    const posts = await Storyblok.getAll('cdn/stories', {
      ...options,
      search_term: query.q,
      filter_query: {
        component: {
          in: 'blog_post'
        }
      }
    });

    setPosts(posts);
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
          <h1 className="search-header">
            {headline} - &quot;{query.q}&quot;
          </h1>

          <section className="stage">
            <main className="post-list">
              {posts.length > 0 ? (
                <>
                  {posts.map((post: any) => (
                    <Link key={post.uuid} href={`/blog/${post.slug}`}>
                      <Card blok={post.content} />
                    </Link>
                  ))}
                </>
              ) : (
                <p>Nothing found..</p>
              )}
            </main>
          </section>
        </section>
      </Layout>
    </SbEditable>
  );
};

export async function getStaticProps() {
  const props = await getPage({
    slug: 'search_index',
    contentType: 'search_index'
  });
  return { props };
}

export default SearchPage;
