export interface BottomCtaStoryblok {
  title?: string;
  button?: ButtonStoryblok[];
  _uid: string;
  component: "bottom_cta";
  [k: string]: any;
}

export interface ButtonStoryblok {
  label: string;
  url: string;
  style?: string;
  _uid: string;
  component: "button";
  [k: string]: any;
}

export interface CardStoryblok {
  title?: string;
  description?: string;
  thumbnail: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  };
  tag?: string;
  _uid: string;
  component: "card";
  [k: string]: any;
}

export interface FaqStoryblok {
  title?: string;
  answers?: FaqListItemStoryblok[];
  _uid: string;
  component: "faq";
  [k: string]: any;
}

export interface FaqListItemStoryblok {
  title: string;
  description: string;
  button?: ButtonStoryblok[];
  _uid: string;
  component: "faq_list_item";
  [k: string]: any;
}

export interface FeatureStoryblok {
  title?: string;
  description?: string;
  cards: CardStoryblok[];
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface HeaderStoryblok {
  links?: LinkStoryblok[];
  buttons?: ButtonStoryblok[];
  _uid: string;
  component: "header";
  [k: string]: any;
}

export interface HeroStoryblok {
  title?: string;
  description?: string;
  image: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  };
  button?: ButtonStoryblok[];
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface HeroDetailStoryblok {
  title?: string;
  description?: string;
  button?: ButtonStoryblok[];
  thumbnail: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  };
  _uid: string;
  component: "hero_detail";
  [k: string]: any;
}

export interface InnerPageStoryblok {
  hero?: HeroStoryblok[];
  detail_cards?: HeroDetailStoryblok[];
  _uid: string;
  component: "Inner Page";
  [k: string]: any;
}

export interface LayoutStoryblok {
  header?: HeaderStoryblok[];
  bottom_cta?: BottomCtaStoryblok[];
  _uid: string;
  component: "Layout";
  [k: string]: any;
}

export interface LinkStoryblok {
  label: string;
  url: string;
  _uid: string;
  component: "link";
  [k: string]: any;
}

export interface PageStoryblok {
  hero?: HeroStoryblok[];
  card_spotlight?: FeatureStoryblok[];
  faq?: FaqStoryblok[];
  _uid: string;
  component: "Page";
  [k: string]: any;
}
