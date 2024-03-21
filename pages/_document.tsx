import { Html, Head, Main, NextScript } from 'next/document'

const theme = `
  document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
`;
 
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: theme }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
