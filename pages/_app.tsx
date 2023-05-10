import "../styles/index.css";

import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Advisory Mentorship Programme</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <meta name="description" content="The Advisory Mentorship Programme" />
        // Google
        <meta itemprop="name" content="Advisory Mentorship Programme" />
        <meta
          itemprop="description"
          content="The Advisory Mentorship Programme"
        />
        <meta
          itemprop="image"
          content="%PUBLIC_URL%/advisory-mentorship-logo.jpg"
        />
        // Facebook / OpenGraph
        <meta property="og:url" content="https://mentorship.advisory.sg" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Advisory Mentorship Programme" />
        <meta
          property="og:description"
          content="The Advisory Mentorship Programme"
        />
        <meta
          property="og:image"
          content="%PUBLIC_URL%/advisory-mentorship-logo.jpg"
        />
        // Twitter
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advisory Mentorship Programme" />
        <meta
          name="twitter:description"
          content="The Advisory Mentorship Programme"
        />
        <meta
          name="twitter:image"
          content="%PUBLIC_URL%/advisory-mentorship-logo.jpg"
        />
        <script
          async
          src="https://umami.advisory.sg/script.js"
          data-website-id="2f694eab-769e-420a-bb31-4efcb3662bf5"
        ></script>
      </Head>
      <style>
        {`
      .sui-result + .sui-result {
        margin-top: 0px;
      }
      `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
