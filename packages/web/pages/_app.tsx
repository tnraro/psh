import config from "@/.env/config";
import "@/styles/styles.css";
import theme from "@/styles/theme";
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const httpLink = createHttpLink({
    uri: config.endpoint
});
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("access-token");
    return {
        headers: {
            ...headers,
            authorization: token || ""
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </ChakraProvider>
    );
};

export default App;
