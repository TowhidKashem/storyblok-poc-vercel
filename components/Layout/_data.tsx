import Link from '@components/Link';

export interface LinkBlok {
  id: number;
  is_folder: boolean;
  is_startpage: boolean;
  name: string;
  parent_id: number;
  path: string;
  position: number;
  published: boolean;
  real_path: string;
  slug: string;
  uuid: string;
}

export interface LinkBloks {
  [key: string]: LinkBlok;
}

export const resourcesDropdown = (
  <nav className="dropdown">
    <ul>
      <li>
        <Link href="https://bitly.com/blog/">Blog</Link>
      </li>
      <li>
        <Link href="https://dev.bitly.com/">Developers</Link>
      </li>
      <li>
        <Link href="/Resources">Resource Library</Link>
      </li>
      <li>
        <Link href="https://support.bitly.com/hc/en-us">Support</Link>
      </li>
    </ul>
  </nav>
);
