const dotenv = require('dotenv');
const axios = require('axios').default;
const StoryblokClient = require('storyblok-js-client');
const MarkdownToRichtext = require('storyblok-markdown-richtext');
const TurndownService = require('turndown');

dotenv.config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_API_TOKEN
});

const SPACE_ID = 143303;
const BASE_URL = 'https://bitly.com/blog/wp-json/wp/v2';

const categoriesMap = getWordPressCategories();
const tagsMap = getWordPressTags();

async function getWordPressCategories() {
  const categories = await axios.get(`${BASE_URL}/categories`);
  return categories.data.map(({ id, name }) => ({ [id]: name }));
}

async function getWordPressTags() {
  const tags = await axios.get(`${BASE_URL}/tags?per_page=100`);
  return tags.data.map(({ id, name }) => ({ [id]: name }));
}

async function getWordPressPost() {
  try {
    const response = await axios.get(
      'https://bitly.com/blog/wp-json/wp/v2/posts?per_page=10'
    );
    post = response.data[3];
    makeStoryblokPost(post);
  } catch (err) {
    console.error(err);
  }
}

async function makeStoryblokPost(post) {
  const { title, slug, content, blocks, author, categories, tags, date } = post;

  const turndownService = new TurndownService();
  const richtextData = MarkdownToRichtext.markdownToRichtext(
    turndownService.turndown(content.rendered)
  );

  // console.log(tagsMap);
  // return;

  Storyblok.post(`spaces/${SPACE_ID}/stories`, {
    publish: 1,
    story: {
      name: title.rendered,
      // created_at: '2022-02-08T03:11:31.689Z',
      // published_at: '2022-02-08T03:15:47.452Z',
      first_published_at: '2022-02-08T03:15:47.000Z',
      slug,
      full_slug: `blog/posts/${slug}`,
      tag_list: tags.map((tagId) => tagsMap[tagId]),
      is_startpage: false,
      parent_id: 106950118,
      meta_data: null,
      group_id: 'e1fe91fd-80cb-46d5-bd9f-3ba8204a69f1',
      release_id: null,
      lang: 'default',
      path: '',
      alternates: [],
      content: {
        body: richtextData,
        slug,
        title: title.rendered,
        categories: categories.map((categoryId) => categoriesMap[categoryId]),
        author: 'd7ce1ef8-1ef6-4865-bb1d-77a1f6e6029a',
        layout: '5348e268-0dd1-496a-8beb-5304e85e7e13',
        component: 'blog_post',
        thumbnail: {
          id: 3796808,
          alt: '',
          name: '',
          focus: null,
          title: '',
          filename:
            'https://a.storyblok.com/f/143303/800x450/f93de196fc/bitly_egoditor_blog.png',
          copyright: '',
          fieldtype: 'asset'
        }
      }
    },
    cv: 1644467273,
    rels: [],
    links: []
  })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error.response.data));
}

getWordPressPost();
