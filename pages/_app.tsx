import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { getStories } from '@utils/api';
import Script from 'next/script';
import '@styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const stories = await getStories({
  //         filter_query: {
  //           component: {
  //             in: 'Inner Page'
  //           }
  //         }
  //       });

  //       console.log('wow', stories);

  //       console.log('test', stories);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <Component {...pageProps} />
      <Script
        src="//app.storyblok.com/f/storyblok-v2-latest.js"
        strategy="beforeInteractive"
      />
    </>
  );
}

export default App;
