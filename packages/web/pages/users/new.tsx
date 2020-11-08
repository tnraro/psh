import Logo from "@/comps/Logo";
import Form from "@/comps/layouts/users/new/Form";
import {
    Box,
    Link
} from "@chakra-ui/core";

const App = () => {
    return <>
        <Box>
            <Logo />
        </Box>
        <Box w={[600, "100%", "48em"]} mx="auto" px="1em">
            <h1>회원가입</h1>
            <p>SNS계정으로 간편하게 회원가입</p>
            <ol>
                <li><a href="">달달소</a></li>
            </ol>
            <Form />
            <p>이미 아이디가 있으신가요? <Link href="/users/sign-in">로그인</Link></p>
        </Box>
    </>;
}
export default App;