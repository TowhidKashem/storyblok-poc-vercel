const dotenv = require('dotenv');
const axios = require('axios').default;
const StoryblokClient = require('storyblok-js-client');

dotenv.config({ path: '.env.local' });

const SPACE_ID = 143303;

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_API_TOKEN
});

axios
  .get('https://bitly.com/blog/wp-json/wp/v2/posts?per_page=10')
  .then((response) => {
    post = response.data[1];

    const { title, slug, content, author, categories, tags, date } = post;

    Storyblok.post(`spaces/${SPACE_ID}/stories`, {
      publish: 1,
      story: {
        name: title.rendered,
        created_at: '2022-02-08T03:11:31.689Z',
        published_at: '2022-02-08T03:15:47.452Z',
        id: 106450115,
        uuid: '51ca1154-365c-4a41-9ed4-e3c982d591f8',
        content: {
          _uid: '6caca1c6-ed8b-4b1b-90fb-adc4485b2943',
          body: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ text: 'Hello world', type: 'text' }]
              }
            ]
          },
          slug,
          title: title.rendered,
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
          },
          _editable:
            '\u003c!--#storyblok#{"name": "blog_post", "space": "143303", "uid": "6caca1c6-ed8b-4b1b-90fb-adc4485b2943", "id": "106450115"}--\u003e'
        },
        slug,
        full_slug: `blog/posts/${slug}`,
        sort_by_date: null,
        position: 10,
        tag_list: [],
        is_startpage: false,
        parent_id: 106950118,
        meta_data: null,
        group_id: 'e1fe91fd-80cb-46d5-bd9f-3ba8204a69f1',
        first_published_at: '2022-02-08T03:15:47.000Z',
        release_id: null,
        lang: 'default',
        path: '',
        alternates: [],
        default_full_slug: null,
        translated_slugs: null
      },
      cv: 1644467273,
      rels: [],
      links: []
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error.response.data));
  })
  .catch((error) => console.error(error));
