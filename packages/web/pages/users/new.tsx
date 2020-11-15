import Form from "@/comps/layouts/users/new/Form";
import Logo from "@/comps/Logo";
import { Box, Link, Text, Heading } from "@chakra-ui/react";

const App = () => {
    return <>
        <Box w={{ base: "100%", md: 500 }} mx="auto" px={{ base: 1, md: 0}}>
            <Logo />
            <Form />
            <p>이미 아이디가 있으신가요? <Link href="/users/sign-in">로그인</Link></p>
        </Box>
        <Box h="50vh" />
    </>;
}
export default App;