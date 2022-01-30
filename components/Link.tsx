import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const CustomLink: NextPage<
  {
    href: string;
  } & React.LinkHTMLAttributes<HTMLAnchorElement>
> = ({ href, children, ...anchorTagProps }) => {
  return (
    <Link href={href} passHref>
      <a {...anchorTagProps}>{children}</a>
    </Link>
  );
};

export default CustomLink;
