import React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../styles/App.css";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta itemProp="name" content="Advisory Mentorship Programme" />
        <meta
          itemProp="description"
          content="The Advisory Mentorship Programme"
        />
        <meta itemProp="image" content="/advisory-mentorship-logo.jpg" />
      </head>
      <Script
        async
        src="https://umami.advisory.sg/script.js"
        data-website-id="2f694eab-769e-420a-bb31-4efcb3662bf5"
      />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  // See https://nextjs.org/docs/app/api-reference/functions/generate-viewport for configuration info
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  // See https://nextjs.org/docs/app/api-reference/functions/generate-metadata for configuration info
  title: "Advisory Mentorship Programme",
  description: "The Advisory Mentorship Programme",

  // Icons
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/logo192.png" }],
  },

  // Manifest
  manifest: "/manifest.json",

  // Facebook / OpenGraph
  openGraph: {
    url: "https://mentorship.advisory.sg",
    type: "website",
    title: "Advisory Mentorship Programme",
    description: "The Advisory Mentorship Programme",
    images: [{ url: "/advisory-mentorship-logo.jpg" }],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Advisory Mentorship Programme",
    description: "The Advisory Mentorship Programme",
    images: [{ url: "/advisory-mentorship-logo.jpg" }],
  },
};
