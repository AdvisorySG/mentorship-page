import "../styles/index.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
