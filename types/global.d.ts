declare type AlternateObject = import('storyblok-js-client').AlternateObject;

declare interface Array<T> {
  first(this: T[]): T;
}

declare interface Window {
  StoryblokBridge: any;
}

declare interface CategoryLink extends Omit<AlternateObject, 'full_slug'> {
  is_startpage: boolean;
  path: string;
  position: number;
  real_path: string;
  uuid: string;
}

declare interface BlogCategoryLink {
  id: number;
  name: string;
  value: string;
  dimension_value: None;
}

declare interface BaseProps<T> {
  readonly categoryLinks: CategoryLink[];
  readonly blogCategoryLinks: BlogCategoryLink[];
  readonly story: T;
}
