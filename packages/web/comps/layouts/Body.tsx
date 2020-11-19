import { Box } from "@chakra-ui/react";

interface IProps {
    children: any;
}

const Body = (props: IProps) => {
    return <Box w={{ base: "100%", md: 500 }} mx="auto" px={{ base: 1, md: 0}}>
        {props.children}
    </Box>
}

export default Body;