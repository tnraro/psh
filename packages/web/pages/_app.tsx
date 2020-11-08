import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/core";
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from "@apollo/client";
import "@/styles/styles.css";
import theme from "@/styles/theme";
import {  } from "@apollo/client";
import config from "@/.env/config";

const client = new ApolloClient({
    uri: config.endpoint,
    cache: new InMemoryCache()
});

const App = ({ Component, pageProps }: AppProps) => {
    return <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    </ChakraProvider>;
}

export default App;