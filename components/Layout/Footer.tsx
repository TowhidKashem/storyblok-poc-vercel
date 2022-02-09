import type { NextPage } from 'next';
import Image from 'next/image';
import Link from '@components/Link';
import { navigationItems } from './_data';
import { getDropdownItems } from './_utils';

const Footer: NextPage<{
  readonly links: LinkBloks;
}> = ({ links }) => {
  return (
    <footer className="footer content-center">
      <nav>
        {navigationItems.map(
          ({ storyblokFolderId, label, hasDropdown, dropdownItems }) => {
            if (hasDropdown && !dropdownItems) {
              dropdownItems = getDropdownItems(links, storyblokFolderId);
            }

            return (
              <ul key={label}>
                <li>
                  <strong>{label}</strong>

                  {hasDropdown && dropdownItems.length > 0 && (
                    <ul>
                      {dropdownItems.map(({ label, url }) => (
                        <li key={label}>
                          <Link href={url}>{label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            );
          }
        )}
      </nav>
      <div>
        <Image
          src="https://docrdsfx76ssb.cloudfront.net/static/1642780665/pages/wp-content/uploads/2021/08/bitly_logo.svg"
          width={85}
          height={40}
          alt=""
        />
        <p>
          <span dangerouslySetInnerHTML={{ __html: '&copy;' }} />{' '}
          {new Date().getFullYear()} Bitly | Handmade in San Francisco, Denver,
          New York City, Bielefeld, and all over the world.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
