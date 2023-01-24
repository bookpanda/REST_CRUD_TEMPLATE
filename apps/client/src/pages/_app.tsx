import type { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "@org/apollo";

import { AppProvider } from "$core/contexts/appProvider";
import "$styles/global.scss";

const client = createApolloClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>REST Template</title>
        <meta content="REST Template" name="description" />
      </Head>

      <ApolloProvider client={client}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
