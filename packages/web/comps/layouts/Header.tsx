import { Button, Link } from "@chakra-ui/core";
import Logo from "@/comps/Logo";
import React from "react";
import { ApolloClient } from "@apollo/client";
import { MeQuery } from "@psh/schema/dist/generated/operations";
import router from "next/router";

interface IProps {
    client: ApolloClient<any>;
    me: MeQuery["me"];
}

const Header = (props: IProps) => {
    const handleLogout = () => {
        props.client.clearStore();
        localStorage.setItem("access-token", "");
        router.reload();
    }
    return <div>
        <div>
            <Logo />
        </div>
        <nav>
            <Link m={1} href="/home">우리 집</Link>
            <Link m={1} href="/devices">내 장치</Link>
            <Link m={1} href="/cat">고먐미</Link>
        </nav>
        <div>
            {props.me ? <>
                <Link onClick={handleLogout}>로그아웃</Link>
            </> : <>
                <Link m={1} href="/users/sign-in">로그인</Link>
                <Link m={1} href="/users/new">회원가입</Link>
            </>}
        </div>
    </div>
}

export default Header;