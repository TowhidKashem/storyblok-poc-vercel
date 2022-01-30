import type { NextPage } from 'next';
import type { LinkBlok } from './_data';
import Image from 'next/image';
import Link from '@components/Link';
import type { HeaderStoryblok } from 'storyblok.types';
import SbEditable from 'storyblok-react';
import { resourcesDropdown } from './_data';

const Header: NextPage<{
  readonly leftNav: LinkBlok[];
  readonly rightNav: HeaderStoryblok;
}> = ({ leftNav, rightNav }) => {
  const leftNavLinks = leftNav.filter(({ is_folder, parent_id, slug }) => {
    const isTopLevelPage = parent_id === 0 && !is_folder;
    const hideFolders = ['legal', 'company'];
    const hidePages = ['layout', 'home', 'resource-index'];

    return (
      (is_folder && !hideFolders.includes(slug)) ||
      (isTopLevelPage && !hidePages.includes(slug))
    );
  });

  const { buttons, links } = rightNav;

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
          {leftNavLinks
            .sort((a, b) => b.position - a.position)
            .map((parentLink) => {
              const dropdownLinks = leftNav.filter(
                (childLink) => childLink.parent_id === parentLink.id
              );
              const hasDropdown = dropdownLinks.length > 0;

              return (
                <li key={parentLink.uuid}>
                  {parentLink.is_folder ? (
                    parentLink.name
                  ) : (
                    <Link href={parentLink.slug}>{parentLink.name}</Link>
                  )}

                  {parentLink.slug === 'resources' ? (
                    resourcesDropdown
                  ) : hasDropdown ? (
                    <nav className="dropdown">
                      <ul>
                        {dropdownLinks
                          .sort((a, b) => b.position - a.position)
                          .map(({ uuid, name, slug }) => (
                            <li key={uuid}>
                              <Link href={'/pages/' + slug}>{name}</Link>
                            </li>
                          ))}
                      </ul>
                    </nav>
                  ) : null}
                </li>
              );
            })}
        </ul>
      </nav>
      <nav className="right-nav">
        <ul>
          {links.map((link) => (
            <SbEditable key={link._uid} content={link}>
              <li>
                <Link href={link.url}>{link.label}</Link>
              </li>
            </SbEditable>
          ))}
          <SbEditable content={buttons[0]}>
            <Link href={buttons[0].url} className="btn">
              {buttons[0].label}
            </Link>
          </SbEditable>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
