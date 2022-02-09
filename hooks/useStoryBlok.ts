import { useEffect, useState } from 'react';
import Storyblok from '@storyblok/client';

const useStoryBlok = (originalStory: any) => {
  const [story, setStory] = useState(originalStory);

  useEffect(() => {
    const isPreview = process.env.ENVIRONMENT === 'development';

    if (isPreview) {
      const { StoryblokBridge } = window;
      if (typeof StoryblokBridge !== 'undefined') {
        // initialize the bridge with your token
        const storyblokInstance = new StoryblokBridge();

        // reload on Next.js page on save or publish event in the Visual Editor
        storyblokInstance.on(['change', 'published'], () =>
          // @ts-ignore: firefox accepts a boolean arg to bypass cache and force reload
          location.reload(true)
        );

        // live update the story on input events
        storyblokInstance.on('input', (event: any) => {
          // check if the ids of the event and the passed story match
          if (story && event.story.content._uid === story.content._uid) {
            // change the story content through the setStory function
            setStory(event.story);
          }
        });

        storyblokInstance.on('enterEditmode', (event: any) => {
          // loading the draft version on initial enter of editor
          Storyblok.get(`cdn/stories/${event.storyId}`, {
            version: 'draft'
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalStory, setStory]);

  useEffect(() => {
    setStory(originalStory);
  }, [originalStory]);

  return story;
};

export default useStoryBlok;
