declare type AlternateObject = import('storyblok-js-client').AlternateObject;

declare interface Array<T> {
  first(this: T[]): T;
}

declare interface LinkBlok extends Omit<AlternateObject, 'full_slug'> {
  is_startpage: boolean;
  path: string;
  position: number;
  real_path: string;
  uuid: string;
}

declare interface Window {
  StoryblokBridge: any;
}
