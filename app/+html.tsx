import { ScrollViewStyleReset } from 'expo-router/html';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
html,
body {
  min-height: 100%;
}

body {
  margin: 0;
  background-color: #E6EEF9;
  display: flex;
  justify-content: center;
}

#root,
body > div:first-child {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  background-color: #F5F8FF;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

@media (max-width: 430px) {
  #root,
  body > div:first-child {
    max-width: none;
    box-shadow: none;
  }
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
  }
}`;
