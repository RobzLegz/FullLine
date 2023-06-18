import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="lv">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="author" content="quickstack.lv" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
