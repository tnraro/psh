import Body from "@/comps/layouts/Body";
import Form from "@/comps/layouts/users/new/Form";
import Logo from "@/comps/Logo";
import { Box, Link, Text, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

const App = () => {
    return (
        <>
            <Body>
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
            </Body>
            <Box h="50vh" />
        </>
    );
};
export default App;
