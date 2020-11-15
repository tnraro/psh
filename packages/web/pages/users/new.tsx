import Form from "@/comps/layouts/users/new/Form";
import Logo from "@/comps/Logo";
import { Box, Link, Text, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

const App = () => {
    return <>
        <Box w={{ base: "100%", md: 500 }} mx="auto" px={{ base: 1, md: 0}}>
            <Box py={10}>
                <Logo />
            </Box>
            <Heading size="md">회원가입</Heading>
            <Form />
            <Text textAlign="center">
                {"이미 아이디가 있으신가요? "}
                <NextLink href="/users/sign-in">
                    <Link>로그인</Link>
                </NextLink>
            </Text>
        </Box>
        <Box h="50vh" />
    </>;
}
export default App;