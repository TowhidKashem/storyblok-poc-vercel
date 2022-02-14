import type { NextPage, GetStaticProps } from 'next';
import type { BlogPostStoryblok } from 'storyblok.types';
import Image from 'next/image';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import { getPage, getOptions } from '@utils/api';
import { slugify } from '@utils/url';
import { getRandomArrayValues } from '@utils/array';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import Layout from '@components/Layout/Layout';
import Link from '@components/Link';
import Pill from '@components/Pill';
import Card from '@components/Card';

interface Props extends BaseProps<BlogPostStoryblok> {
  relatedPosts: any;
}

const BlogPost: NextPage<Props> = ({
  categoryLinks,
  blogCategoryLinks,
  story,
  relatedPosts
}) => {
  story = useStoryBlok(story);

  const { layout, title, body, image, author, categories } = story.content;

  const publishDate = new Date(story.first_published_at).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  );

  return (
    <SbEditable content={story.content}>
      <Layout
        layout={layout}
        categoryLinks={categoryLinks}
        blogCategoryLinks={blogCategoryLinks}
        isBlogSection
      >
        <section className="resource-page blog-post content-center">
          <article className="post-hero">
            <time dateTime="2011-08-28" title="August 28th, 2011">
              {publishDate}
            </time>
            <section>
              <h1 className="text-4xl font-bold mb-5">{title}</h1>
              <Image src={image.filename} width={700} height={350} alt="" />
            </section>
          </article>
          <main className="content">{render(body)}</main>
          <footer>
            {story.tag_list.length > 0 && (
              <section className="tags">
                <header>By tags:</header>
                <ul>
                  <li>
                    {story.tag_list.map((tag: string) => (
                      <Link key={tag} href={`/blog/tag/${slugify(tag)}`}>
                        <Pill label={tag} />
                      </Link>
                    ))}
                  </li>
                </ul>
              </section>
            )}
            {categories.length > 0 && (
              <section className="categories">
                <header>By category:</header>
                <ul>
                  <li>
                    {categories.map((category: string) => (
                      <Link
                        key={category}
                        href={`/blog/category/${slugify(category)}`}
                      >
                        <Pill label={category} />
                      </Link>
                    ))}
                  </li>
                </ul>
              </section>
            )}
            <section className="author">
              <Link rel="author" href={`/blog/author/${author.slug}`}>
                <Image
                  src={author.content.image.filename}
                  alt={author.content.image.alt}
                  width={200}
                  height={200}
                />
              </Link>
              <address>
                <h4>{author.content.name}</h4>
                <p>{author.content.bio}</p>
              </address>
            </section>
          </footer>
          {relatedPosts.length > 0 && (
            <section className="related-posts resources-index">
              <h3>Related Articles</h3>
              <main className="post-list">
                {relatedPosts.map((post: any) => (
                  <Link key={post.uuid} href={`/blog/${post.slug}`}>
                    <Card key={post.uuid} blok={post.content} />
                  </Link>
                ))}
              </main>
            </section>
          )}
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
        in: 'blog_post'
      }
    }
  });

  return {
    paths: posts.map(({ slug }) => `/blog/${slug}`),
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { post } }) => {
  const options = getOptions();

  const props = await getPage({
    slug: `blog/posts/${post}`,
    contentType: 'blog_post',
    joinFields: ['author']
  });

  // 1. pick one of the categories this post belongs to at random
  // 2. get 100 posts from that category or the max number that exists (which ever is smaller)
  // 3. pick 6 posts from this set at random
  const relatedPosts = await Storyblok.get('cdn/stories', {
    ...options,
    starts_with: 'blog/posts/',
    per_page: 100,
    filter_query: {
      categories: {
        in_array: getRandomArrayValues(props.story.content.categories, 1)[0]
      }
    }
  });

  return {
    props: {
      ...props,
      relatedPosts: getRandomArrayValues(relatedPosts.data.stories, 6)
    }
  };
};

export default BlogPost;
