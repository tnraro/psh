import DeviceIcon from "@/comps/DeviceIcon";
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
    Link,
    Spacer,
    Stack,
    Text,
    useToast,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {
    MeQuery,
    useJoinHomeMutation,
    useMeQuery,
    useNewHomeMutation
} from "@psh/schema/dist/operations.gen";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";

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

const HomeDashboardItem = (props: { children: any }) => (
    <Box bg="white" borderRadius={10} p={5} border="1px" borderColor="gray.300">
        {props.children}
    </Box>
);

const HomeDashboard = (props: { me: MeQuery["me"]; client: any }) => {
    const me = props.me;
    console.log(me);

    return (
        <Stack spacing={3}>
            <HomeDashboardItem>
                <Text fontSize="md" fontWeight={700}>
                    대시보드
                </Text>
                <Text>{me?.home?.name}</Text>
            </HomeDashboardItem>
            <HomeDashboardItem>
                <Heading size="md">가족구성원</Heading>
                <Wrap direction="column">
                    {me?.home?.family?.map((user) => {
                        return (
                            <WrapItem key={user?.id} w="100%">
                                <Center>
                                    <Avatar size="sm" m={2} />
                                    {user?.username}
                                </Center>
                            </WrapItem>
                        );
                    })}
                </Wrap>
            </HomeDashboardItem>
            <HomeDashboardItem>
                <NextLink href="/devices">
                    <Link>
                        <Heading size="md">등록된 장치</Heading>
                    </Link>
                </NextLink>
                <Wrap>
                    {me?.home?.devices?.map((device) => {
                        return (
                            <WrapItem>
                                <NextLink href={`/device/${device?.id}`}>
                                    <Link>
                                        <Box
                                            key={device?.id}
                                            border="1px"
                                            borderRadius=".8em"
                                            borderColor="gray.200"
                                            py={2}
                                            px={4}>
                                            <Text>{device?.alias}</Text>
                                            <Text
                                                fontSize="0.9em"
                                                fontWeight={100}>
                                                {device?.type?.name}
                                            </Text>
                                            <DeviceIcon
                                                isPrivate={
                                                    device?.private || false
                                                }
                                                ownerId={
                                                    device?.owner?.id || null
                                                }
                                                myId={me.id || null}
                                            />
                                        </Box>
                                    </Link>
                                </NextLink>
                            </WrapItem>
                        );
                    })}
                </Wrap>
            </HomeDashboardItem>
        </Stack>
    );
};

const App = (props: IProp) => {
    const { client, data } = useMeQuery();

    return (
        <Box>
            <Header client={client} me={data?.me} />
            <Body>
                <Spacer h={3} />
                {data?.me?.home ? (
                    <HomeDashboard client={client} me={data?.me} />
                ) : (
                    <NoHome />
                )}
            </Body>
        </Box>
    );
};

export default App;
