import Logo from "@/comps/Logo";
import { ApolloClient } from "@apollo/client";
import { Box, Divider, Flex, Link, Spacer } from "@chakra-ui/react";
import * as operations from "@psh/schema/dist/operations.gen";
import NextLink from "next/link";
import React from "react";

interface IProps {
    client: ApolloClient<any>;
    me: operations.MeQuery["me"];
}

const Header = (props: IProps) => {
    const handleLogout = () => {
        props.client.clearStore();
        localStorage.setItem("access-token", "");
        location.replace("/");
    };
    return (
        <Box bg="white">
            <Flex py={5} px={{ base: 1, md: 5 }}>
                <Logo />
                <Spacer />
                <Box as="nav">
                    {props.me && (
                        <>
                            <NextLink href="/home">
                                <Link mx={1} py={5} px={{ base: 1, md: 5 }}>
                                    가상 홈
                                </Link>
                            </NextLink>
                            <NextLink href="/devices">
                                <Link mx={1} py={5} px={{ base: 1, md: 5 }}>
                                    내 장치
                                </Link>
                            </NextLink>
                        </>
                    )}
                </Box>
                <Spacer />
                <Box>
                    {props.me ? (
                        <Link mx={1} p={5} onClick={handleLogout}>
                            로그아웃
                        </Link>
                    ) : (
                        <>
                            <NextLink href="/users/sign-in">
                                <Link mx={1} p={5}>
                                    로그인
                                </Link>
                            </NextLink>
                            <NextLink href="/users/new">
                                <Link mx={1} p={5}>
                                    회원가입
                                </Link>
                            </NextLink>
                        </>
                    )}
                </Box>
            </Flex>
            <Divider />
        </Box>
    );
};

export default Header;
