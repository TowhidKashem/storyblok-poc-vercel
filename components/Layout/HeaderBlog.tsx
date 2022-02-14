import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import Link from '@components/Link';
import { blogNavigationItems } from './_data';

const HeaderBlog: NextPage<{
  readonly blogCategoryLinks: BlogCategoryLink[];
}> = ({ blogCategoryLinks }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const searchBlog = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/blog/search',
      query: {
        q: query.trim()
      }
    });
  };

  return (
    <header className="blog-header">
      <div className="content-center">
        <nav>
          <ul>
            <li>
              <h3>Latest Articles</h3>
            </li>
            {blogNavigationItems.map(({ label, url }) => (
              <li key={url}>
                <Link href={url}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <form onSubmit={searchBlog}>
          <input
            type="search"
            placeholder="Search blog"
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default HeaderBlog;
