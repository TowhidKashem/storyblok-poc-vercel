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

let categoriesMap, tagsMap;
(async () => {
  categoriesMap = await getWordPressCategories();
  tagsMap = await getWordPressTags();

  getWordPressPost(4335);
  // getWordPressPosts();
})();

async function getWordPressCategories() {
  const { data: wordPressCategories } = await axios.get(
    `${BASE_URL}/categories`,
    {
      params: {
        per_page: 100
      }
    }
  );

  const categories = {};
  wordPressCategories.forEach(({ id, name }) => {
    categories[id] = name;
  });

  return categories;
}

async function getWordPressTags(tags = {}, page = 1) {
  const { data: wordPressTags } = await axios.get(`${BASE_URL}/tags`, {
    params: {
      per_page: 100,
      page
    }
  });

  if (wordPressTags.length > 0) {
    wordPressTags.forEach(({ id, name }) => {
      tags[id] = name;
    });
    return getWordPressTags(tags, page + 1);
  }

  return tags;
}

async function getWordPressPost(postId) {
  try {
    const { data: post } = await axios.get(`${BASE_URL}/posts`, {
      params: {
        'include[]': postId,
        per_page: 1
      }
    });

    makeStoryblokPost(post[0]);
  } catch (err) {
    console.error(err);
  }
}

async function getWordPressPosts(page = 1) {
  try {
    const { data: posts } = await axios.get(`${BASE_URL}/posts`, {
      params: {
        per_page: 100,
        page
      }
    });

    makeStoryblokPost(posts[0]);
  } catch (err) {
    console.error(err);
  }
}

async function makeStoryblokPost({
  title,
  slug,
  content,
  yoast_head,
  author,
  categories,
  tags,
  date
}) {
  const turndownService = new TurndownService();
  const richTextContent = MarkdownToRichtext.markdownToRichtext(
    turndownService.turndown(content.rendered)
  );

  categories = categories.map((categoryId) => categoriesMap[categoryId]);
  tags = tags.map((tagId) => tagsMap[tagId]);

  const og_image = yoast_head
    .match(/<meta property=\"og:image\" content=\"(.+?)" \/>/g)[0]
    .split(/content="(.+?)"/)[1];

  Storyblok.post(`spaces/${SPACE_ID}/stories`, {
    publish: 1,
    story: {
      name: title.rendered,
      // created_at: '2022-02-08T03:11:31.689Z',
      // published_at: '2022-02-08T03:15:47.452Z',
      first_published_at: '2022-02-08T03:15:47.000Z',
      slug,
      full_slug: `blog/posts/${slug}`,
      tag_list: tags,
      is_startpage: false,
      parent_id: 106950118,
      meta_data: null,
      group_id: 'e1fe91fd-80cb-46d5-bd9f-3ba8204a69f1',
      release_id: null,
      lang: 'default',
      path: '',
      alternates: [],
      content: {
        body: richTextContent,
        slug,
        title: title.rendered,
        categories,
        author: 'd7ce1ef8-1ef6-4865-bb1d-77a1f6e6029a',
        layout: '5348e268-0dd1-496a-8beb-5304e85e7e13',
        component: 'blog_post',
        image: {
          alt: '',
          name: '',
          focus: null,
          title: '',
          filename: og_image,
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
