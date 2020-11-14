import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/core";
import { ApolloProvider, ApolloClient, InMemoryCache, gql, createHttpLink } from "@apollo/client";
import "@/styles/styles.css";
import theme from "@/styles/theme";
import config from "@/.env/config";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: config.endpoint
});
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("access-token");
    return {
        headers: {
            ...headers,
            authorization: token || "",
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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