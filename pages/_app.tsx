import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import "../styles/App.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Advisory Mentorship Programme</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="The Advisory Mentorship Programme" />

        {/* Google */}
        <meta itemProp="name" content="Advisory Mentorship Programme" />
        <meta
          itemProp="description"
          content="The Advisory Mentorship Programme"
        />
        <meta itemProp="image" content="/advisory-mentorship-logo.jpg" />

        {/* Facebook / OpenGraph */}
        <meta property="og:url" content="https://mentorship.advisory.sg" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Advisory Mentorship Programme" />
        <meta
          property="og:description"
          content="The Advisory Mentorship Programme"
        />
        <meta property="og:image" content="/advisory-mentorship-logo.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advisory Mentorship Programme" />
        <meta
          name="twitter:description"
          content="The Advisory Mentorship Programme"
        />
        <meta name="twitter:image" content="/advisory-mentorship-logo.jpg" />
      </Head>
      <Script
        async
        src="https://umami.advisory.sg/script.js"
        data-website-id="2f694eab-769e-420a-bb31-4efcb3662bf5"
      />
      <Component {...pageProps} />
    </>
  );
}
