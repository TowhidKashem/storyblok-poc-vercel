declare interface Array<T> {
  first(this: T[]): T;
}

declare interface LinkBlok {
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

declare interface LinkBloks {
  [key: string]: LinkBlok;
}
