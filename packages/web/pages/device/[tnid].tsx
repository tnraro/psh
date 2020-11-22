import Header from "@/comps/layouts/Header";
import { Box } from "@chakra-ui/react";
import { useMeQuery } from "@psh/schema/dist/operations.gen";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

interface IProp {}

const App = (props: IProp) => {
    const { client, data: meData } = useMeQuery();
    const router = useRouter();

    const { tnid } = router.query;

    return (
        <Box>
            <Header client={client} me={meData?.me} />
            {tnid}
        </Box>
    );
};

export default App;
