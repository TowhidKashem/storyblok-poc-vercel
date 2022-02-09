import { useEffect, useState } from 'react';
import Storyblok from '@storyblok/client';

export function useStoryblok(originalStory: any) {
  const isPreview = process.env.ENVIRONMENT === 'development';

  const [story, setStory] = useState(originalStory);

  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  function initEventListeners() {
    const { StoryblokBridge } = window;
    if (typeof StoryblokBridge !== 'undefined') {
      // initialize the bridge with your token
      const storyblokInstance = new StoryblokBridge({
        resolveRelations: [`home_page.layout`]
      });

      // reload on Next.js page on save or publish event in the Visual Editor
      storyblokInstance.on(['change', 'published'], () =>
        // @ts-ignore: firefox accepts a boolean arg to bypass cache and force reload
        location.reload(true)
      );

      // live update the story on input events
      storyblokInstance.on('input', (event: any) => {
        if (story && event.story._uid === story._uid) {
          setStory(event.story);
        }
      });

      storyblokInstance.on('enterEditmode', (event: any) => {
        // loading the draft version on initial enter of editor
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: 'draft',
          resolveRelations: [`home_page.layout`]
        })
          .then(({ data }) => {
            if (data.story) {
              setStory(data.story);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  useEffect(() => {
    // only load inside preview mode
    if (isPreview) {
      // first load the bridge, then initialize the event listeners
      initEventListeners();
    }
  }, []);

  useEffect(() => {
    setStory(originalStory);
  }, [originalStory]);

  return story;
}

export default useStoryblok;
