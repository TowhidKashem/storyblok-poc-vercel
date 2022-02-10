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

  getWordPressPost(4349);
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

  return wordPressCategories.map(({ id, name }) => ({
    [id]: name
  }));
}

async function getWordPressTags(tags = [], page = 1) {
  const { data: wordPressTags } = await axios.get(`${BASE_URL}/tags`, {
    params: {
      per_page: 100,
      page
    }
  });

  if (wordPressTags.length > 0) {
    wordPressTags.forEach(({ id, name }) => {
      tags.push({ [id]: name });
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
  blocks,
  author,
  categories,
  tags,
  date
}) {
  const turndownService = new TurndownService();
  const richTextContent = MarkdownToRichtext.markdownToRichtext(
    turndownService.turndown(content.rendered)
  );

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
        body: richTextContent,
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
