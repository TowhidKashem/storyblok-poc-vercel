import type { NextPage } from 'next';
import type { LinkBlok } from './_data';
import Image from 'next/image';
import Link from '@components/Link';
import type { HeaderStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { navigationItems } from './_data';
import { getDropdownItems } from './_utils';

const Header: NextPage<{
  readonly links: LinkBlok[];
  readonly rightNav: HeaderStoryblok;
}> = ({ links, rightNav }) => {
  const quoteButton = rightNav.buttons[0];

  return (
    <header className="header content-center">
      <Link href="/">
        <Image
          src="https://docrdsfx76ssb.cloudfront.net/static/1642780665/pages/wp-content/uploads/2021/08/bitly_logo.svg"
          width={150}
          height={150}
          alt=""
        />
      </Link>
      <nav className="left-nav">
        <ul>
          {navigationItems.map(
            ({ storyblokFolderId, label, url, hasDropdown, dropdownItems }) => {
              if (hasDropdown && !dropdownItems) {
                dropdownItems = getDropdownItems(links, storyblokFolderId);
              }

              return (
                <li key={label}>
                  {url ? <Link href={url}>{label}</Link> : label}

                  {hasDropdown && dropdownItems.length > 0 && (
                    <nav className="dropdown">
                      <ul>
                        {dropdownItems.map(({ label, url, description }) => (
                          <li key={label}>
                            <Link href={url}>{label}</Link>
                            <p>
                              <small>{description}</small>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </li>
              );
            }
          )}
        </ul>
      </nav>
      <nav className="right-nav">
        <ul>
          {rightNav.links.map((link) => (
            <SbEditable key={link._uid} content={link}>
              <li>
                <Link href={link.url}>{link.label}</Link>
              </li>
            </SbEditable>
          ))}
          <SbEditable content={quoteButton}>
            <Link href={quoteButton.url} className="btn">
              {quoteButton.label}
            </Link>
          </SbEditable>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
