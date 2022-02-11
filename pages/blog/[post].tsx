import type { NextPage, GetStaticProps } from 'next';
import type { BlogPostStoryblok } from 'storyblok.types';
import Image from 'next/image';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import { getPage, getOptions } from '@utils/api';
import { slugify } from '@utils/url';
import Storyblok from '@storyblok/client';
import useStoryBlok from '@hooks/useStoryBlok';
import Layout from '@components/Layout/Layout';
import Link from '@components/Link';
import Pill from '@components/Pill';

const BlogPost: NextPage<{
  readonly links: LinkBlok[];
  readonly story: BlogPostStoryblok;
}> = ({ links, story }) => {
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
      <Layout layout={layout.content} links={links}>
        <section className="resource-page blog-post content-center">
          <time dateTime="2011-08-28" title="August 28th, 2011">
            {publishDate}
          </time>
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <main className="content">{render(body)}</main>
          <footer>
            <section className="tags">
              <header>By tags:</header>
              <ul>
                <li>
                  {story.tag_list.map((tag: string) => (
                    <Link key={tag} href={`/tag/${slugify(tag)}`}>
                      <Pill label={tag} />
                    </Link>
                  ))}
                </li>
              </ul>
            </section>
            <section className="categories">
              <header>By category:</header>
              <ul>
                <li>
                  {categories.map((category: string) => (
                    <Link
                      key={category}
                      href={`/category/${slugify(category)}`}
                    >
                      <Pill label={category} />
                    </Link>
                  ))}
                </li>
              </ul>
            </section>
            <section className="author">
              <Link rel="author" href={`/author/${author.slug}`}>
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
  return {
    props: await getPage({
      slug: `blog/posts/${post}`,
      contentType: 'blog_post',
      joinFields: ['author']
    })
  };
};

export default BlogPost;
