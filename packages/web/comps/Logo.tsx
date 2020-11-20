import { Image } from "@chakra-ui/react";
import Link from "next/link";

interface ILogo {
    to?: string;
}

const Logo = (props: ILogo) => {
    return <Link href={props.to || "/"}>PSH Logo</Link>;
};

export default Logo;
