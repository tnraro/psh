import Body from "@/comps/layouts/Body";
import Header from "@/comps/layouts/Header";
import {
    Alert,
    AlertIcon,
    Avatar,
    Box,
    Button,
    Center,
    Heading,
    Input,
    Spacer,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    toast,
    useToast,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {
    MyHomeQuery,
    useJoinHomeMutation,
    useMeQuery,
    useMyHomeQuery,
    useNewHomeMutation
} from "@psh/schema/dist/generated/operations";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";

interface IProp {}

const NoHome = (props: any) => {
    const toast = useToast();
    const router = useRouter();
    const [newHome, result] = useNewHomeMutation();
    const [joinHome] = useJoinHomeMutation();
    const [newHomeNameInput, setNewHomeNameInput] = useState("");
    const [joinHomeNameInput, setJoinHomeNameInput] = useState("");

    const onCreateHome = async () => {
        try {
            const result = await newHome({
                variables: {
                    name: newHomeNameInput
                }
            });
            router.reload();
        } catch (e) {
            toast({
                title: "가상 홈을 만드는 도중 오류가 발생했습니다",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            console.error(e);
        }
    };
    const onJoinHome = async () => {
        try {
            const result = await joinHome({
                variables: {
                    homeId: joinHomeNameInput
                }
            });
            router.reload();
        } catch (e) {
            toast({
                title: "가상 홈에 참가하는 도중 오류가 발생했습니다",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            console.error(e);
        }
    };

    return (
        <Stack>
            <Alert status="info">
                <AlertIcon />
                집이 없습니다. 집을 만들거나 참가할 수 있습니다.
            </Alert>
            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 5, md: 2 }}>
                <Stack
                    border="1px"
                    borderColor="blue.100"
                    borderRadius={5}
                    p={2}
                    color="blue.400">
                    <Heading size="sm">가상 홈 만들기</Heading>
                    <Input
                        onChange={(e) => setNewHomeNameInput(e.target.value)}
                        value={newHomeNameInput}
                        placeholder="홈 이름"
                    />
                    <Button onClick={onCreateHome}>만들기</Button>
                </Stack>
                <Stack
                    border="1px"
                    borderColor="cyan.100"
                    borderRadius={5}
                    p={2}
                    color="cyan.400">
                    <Heading size="sm">가상 홈 참가하기</Heading>
                    <Input
                        onChange={(e) => setJoinHomeNameInput(e.target.value)}
                        value={joinHomeNameInput}
                        placeholder="홈 ID"
                    />
                    <Button onClick={onJoinHome}>참가하기</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

const HomeDashboard = (props: { me: MyHomeQuery["me"]; client: any }) => {
    const me = props.me;
    console.log(me);

    return (
        <Stack spacing={5}>
            <Heading>{me?.home?.name}</Heading>
            <Box>
                <Heading size="md">가족구성원</Heading>
                <Wrap>
                    {me?.home?.family?.map((user) => {
                        return (
                            <WrapItem>
                                <Center>
                                    <Avatar size="sm" m={2} />
                                    {user?.username}
                                </Center>
                            </WrapItem>
                        );
                    })}
                </Wrap>
            </Box>
            <Box>
                <Heading size="md">등록된 장치</Heading>
                <Wrap>
                    {me?.home?.devices?.map((device) => {
                        return (
                            <WrapItem
                                border="1px"
                                borderRadius=".8em"
                                borderColor="gray.200"
                                py={2}
                                px={4}>
                                <Stat>
                                    <StatLabel>{device?.alias}</StatLabel>
                                    <StatHelpText>{device?.type}</StatHelpText>
                                    {!device?.private ||
                                        (device?.owner?.id === me.id && (
                                            <FiHeart />
                                        ))}
                                </Stat>
                            </WrapItem>
                        );
                    })}
                </Wrap>
            </Box>
        </Stack>
    );
};

const App = (props: IProp) => {
    const { data: meData } = useMeQuery();
    const { client, loading, data, error } = useMyHomeQuery();

    const errorCode = error?.graphQLErrors[0]?.extensions?.code;
    const noHome = errorCode == StatusCodes.FORBIDDEN;

    return (
        <Box>
            <Header client={client} me={meData?.me} />
            <Body>
                <Spacer h={3} />
                {noHome ? (
                    <NoHome />
                ) : (
                    <HomeDashboard client={client} me={data?.me} />
                )}
            </Body>
        </Box>
    );
};

export default App;
