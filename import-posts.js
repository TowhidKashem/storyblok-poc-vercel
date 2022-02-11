const dotenv = require('dotenv');
const axios = require('axios').default;
const StoryblokClient = require('storyblok-js-client');
const MarkdownToRichtext = require('storyblok-markdown-richtext');
const TurndownService = require('turndown');

dotenv.config({ path: '.env.local' });

const storyblokBlogPostFolderId = 108205241;
const storyblokLayoutStoryId = '5348e268-0dd1-496a-8beb-5304e85e7e13';
const wordpressAuthorSlugToStoryblokAuthorIdMap = {
  trupti: '59af6b8f-c79e-4677-a022-06f4dc522b7e', // 63
  tfowell: 'f8278dba-4e06-4cf3-8282-1a5b340caa13', // 47
  'desiree-johnsonbit-ly': 'd7ce1ef8-1ef6-4865-bb1d-77a1f6e6029a' // 65
};

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_API_TOKEN
});

const SPACE_ID = 143303;
const BASE_URL = 'https://bitly.com/blog/wp-json/wp/v2';

let usersMap, categoriesMap, tagsMap;
(async () => {
  usersMap = await getWordPressUsers();
  categoriesMap = await getWordPressCategories();
  tagsMap = await getWordPressTags();

  // getWordPressPost(4335);
  // getWordPressPosts();
})();

async function getWordPressUsers() {
  const { data: wordPressUsers } = await axios.get(`${BASE_URL}/users`, {
    params: {
      per_page: 100
    }
  });

  const users = {};
  wordPressUsers.forEach(({ id, slug }) => {
    users[id] = wordpressAuthorSlugToStoryblokAuthorIdMap[slug];
  });

  return users;
}

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
  console.log(
    `<<-----------------------*** Fetching page: ${page} ***------------------------->>`
  );

  try {
    const { data: posts } = await axios.get(`${BASE_URL}/posts`, {
      params: {
        per_page: 100,
        page
      }
    });

    const promises = posts.map((post) => makeStoryblokPost(post));
    await Promise.all(promises);

    // There are no more posts after page 4 - https://bitly.com/blog/wp-json/wp/v2/posts?per_page=100&page=5
    if (page !== 4) {
      return getWordPressPosts(page + 1);
    }
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
  date,
  modified
}) {
  const turndownService = new TurndownService();
  const richTextContent = MarkdownToRichtext.markdownToRichtext(
    turndownService.turndown(content.rendered)
  );

  categories = categories.map((categoryId) => categoriesMap[categoryId]);
  tags = tags.map((tagId) => tagsMap[tagId]);

  // TODO: figure out better way to extract main image
  let og_image;
  try {
    og_image = yoast_head
      .match(/<meta property=\"og:image\" content=\"(.+?)" \/>/g)[0]
      .split(/content="(.+?)"/)[1];
  } catch (err) {
    const image = yoast_head.match(/#primaryimage(.+?)\.png/);

    og_image = image
      ? image[0].split('"url":"').pop()
      : 'https://s17233.pcdn.co/blog/wp-content/uploads/2020/09/Marketing_get-started_Site_0901.png';
  }

  Storyblok.post(`spaces/${SPACE_ID}/stories`, {
    publish: 1,
    story: {
      name: title.rendered,
      created_at: date,
      published_at: modified,
      slug,
      full_slug: `blog/posts/${slug}`,
      tag_list: tags,
      parent_id: storyblokBlogPostFolderId,
      meta_data: null,
      content: {
        body: richTextContent,
        slug,
        title: title.rendered,
        categories,
        author: usersMap[author] || '',
        layout: storyblokLayoutStoryId,
        component: 'blog_post',
        image: {
          alt: '',
          filename: og_image,
          fieldtype: 'asset'
        }
      }
    }
  })
    .then((response) => console.log(response.data.story.name))
    .catch((error) => console.error(error.response.data));
}
