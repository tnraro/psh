import { Box, Button, Divider, Flex, Link, Spacer } from "@chakra-ui/react";
import Logo from "@/comps/Logo";
import React from "react";
import { ApolloClient } from "@apollo/client";
import { MeQuery } from "@psh/schema/dist/generated/operations";

interface IProps {
    client: ApolloClient<any>;
    me: MeQuery["me"];
}

const Header = (props: IProps) => {
    const handleLogout = () => {
        props.client.clearStore();
        localStorage.setItem("access-token", "");
        location.reload();
    }
    return <>
        <Flex py={{ base: 2, md: 5 }} px={{ base: 1, md: 5 }}>
            <Logo />
            <Spacer />
            <Box as="nav">
                {props.me
                    && <>
                        <Link mx={1} py={5} px={{ base: 1, md: 5 }} href="/home">우리 집</Link>
                        <Link mx={1} py={5} px={{ base: 1, md: 5 }} href="/devices">내 장치</Link>
                    </>
                }
            </Box>
            <Spacer />
            <Box>
                {props.me
                    ? <Link mx={1} p={5} onClick={handleLogout}>로그아웃</Link>
                    : <>
                        <Link mx={1} p={5} href="/users/sign-in">로그인</Link>
                        <Link mx={1} p={5} href="/users/new">회원가입</Link>
                    </>
                } 
            </Box>
        </Flex>
        <Divider />
    </>;
}

export default Header;