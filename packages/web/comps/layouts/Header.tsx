import { Box, Button, Divider, Flex, Link, Spacer } from "@chakra-ui/react";
import Logo from "@/comps/Logo";
import React from "react";
import { ApolloClient } from "@apollo/client";
import { MeQuery } from "@psh/schema/dist/generated/operations";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface IProps {
    client: ApolloClient<any>;
    me: MeQuery["me"];
}

const Header = (props: IProps) => {
    const router = useRouter();
    const handleLogout = () => {
        props.client.clearStore();
        localStorage.setItem("access-token", "");
        location.replace("/");
    }
    return <>
        <Flex py={{ base: 2, md: 5 }} px={{ base: 1, md: 5 }}>
            <Logo />
            <Spacer />
            <Box as="nav">
                {props.me
                    && <>
                        <NextLink href="/home">
                            <Link mx={1} py={5} px={{ base: 1, md: 5 }}>우리 집</Link>
                        </NextLink>
                        <NextLink href="devices">
                            <Link mx={1} py={5} px={{ base: 1, md: 5 }}>내 장치</Link>
                        </NextLink>
                    </>
                }
            </Box>
            <Spacer />
            <Box>
                {props.me
                    ? 
                        <Link mx={1} p={5} onClick={handleLogout}>로그아웃</Link>
                    : <>
                        <NextLink href="/users/sign-in">
                            <Link mx={1} p={5}>로그인</Link>
                        </NextLink>
                        <NextLink href="/users/new">
                            <Link mx={1} p={5}>회원가입</Link>
                        </NextLink>
                    </>
                } 
            </Box>
        </Flex>
        <Divider />
    </>;
}

export default Header;