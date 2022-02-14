import type { NextPage } from 'next';
import Link from '@components/Link';
import { blogNavigationItems } from './_data';

const HeaderBlog: NextPage<{
  readonly blogCategoryLinks: BlogCategoryLink[];
}> = ({ blogCategoryLinks }) => {
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
        <form>
          <input type="search" placeholder="Search blog" />
        </form>
      </div>
    </header>
  );
};

export default HeaderBlog;
