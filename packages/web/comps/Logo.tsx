import { Image } from "@chakra-ui/react";

interface ILogo {
    to?: string;
}

const Logo = (props: ILogo) => {
    return <a href={props.to || "/"}>
        PSH Logo
        <Image src=""/>
    </a>;
}

export default Logo;