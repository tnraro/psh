import DeviceIcon from "@/comps/DeviceIcon";
import Body from "@/comps/layouts/Body";
import Header from "@/comps/layouts/Header";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Heading,
    IconButton,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Stack,
    Tooltip,
    useDisclosure,
    useToast,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {
    Device,
    DeviceType,
    MeQuery,
    useDeleteDeviceMutation,
    useGetDeviceTypesQuery,
    useMeQuery,
    useNewDeviceMutation
} from "@psh/schema/dist/operations.gen";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
interface IDeviceItemProp {
    myId: string;
    device: Device;
}
const DeviceItem = (props: IDeviceItemProp) => {
    const { myId, device } = props;
    const deviceId = device.id || "";
    const [deleteDevice, result] = useDeleteDeviceMutation();
    const toast = useToast();
    const router = useRouter();
    const handleDeleteDevice = async () => {
        try {
            const result = await deleteDevice({
                variables: {
                    id: deviceId
                }
            });
            if (!result.data) throw new Error();
            const device = result.data.deleteDevice;
            if (!device) throw new Error();
            router.reload();
        } catch (e) {
            toast({
                title: `${device.alias}을(를) 제거하지 못했습니다`,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };
    return (
        <WrapItem
            border="1px"
            borderRadius=".8em"
            borderColor="gray.200"
            width="100%"
            bg="white"
            px="5">
            <Stack direction="row" width="100%">
                <NextLink href={`/device/${device?.id}`}>
                    <Link py="3" px="1">
                        {device?.alias}
                    </Link>
                </NextLink>
                <Center>
                    <DeviceIcon
                        isPrivate={device?.private || false}
                        ownerId={device?.owner?.id || null}
                        myId={myId || null}
                    />
                </Center>
                <Spacer />
                <Center>
                    <Tooltip
                        shouldWrapChildren
                        label={`${device?.alias} 제거`}
                        openDelay={300}
                        closeDelay={300}>
                        <IconButton
                            size="sm"
                            aria-label={`${device?.alias} 제거`}
                            colorScheme="red"
                            icon={<FiTrash2 />}
                            onClick={handleDeleteDevice}
                        />
                    </Tooltip>
                </Center>
            </Stack>
        </WrapItem>
    );
};
interface IAddDeviceModal {
    isOpen: boolean;
    onClose: () => void;
    deviceTypes: DeviceType[];
}
const AddDeviceModal = (props: IAddDeviceModal) => {
    const { isOpen, onClose } = props;
    const [newDevice, result] = useNewDeviceMutation();
    const [deviceType, setDeviceType] = useState("");
    const [alias, setAlias] = useState("");
    const [id, setId] = useState("");
    const [_private, setPrivate] = useState(false);
    const router = useRouter();
    const toast = useToast();
    const handleClose = () => {
        setDeviceType("");
        setAlias("");
        setId("");
        setPrivate(false);
        onClose();
    };
    const handleSubmit = async () => {
        const values = {
            type: deviceType,
            alias,
            id,
            private: _private
        };
        try {
            const result = await newDevice({
                variables: {
                    device: values
                }
            });
            if (!result.data) throw new Error();
            router.reload();
        } catch (e) {
            toast({
                title: `디바이스를 추가하지 못했습니다`,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>장치 추가</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack>
                        <Select
                            placeholder="장치 종류를 선택하세요"
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}>
                            {props.deviceTypes.map((type) => (
                                <option value={type?.id || ""}>
                                    {type?.name}
                                </option>
                            ))}
                        </Select>
                        <Input
                            placeholder="장치 식별자"
                            name="id"
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="장치 이름"
                            name="alias"
                            value={alias}
                            onChange={(e) => {
                                setAlias(e.target.value);
                            }}
                        />
                        <Checkbox
                            name="private"
                            isChecked={_private}
                            onChange={(e) => {
                                setPrivate(e.target.checked);
                            }}>
                            개인용
                        </Checkbox>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        추가
                    </Button>
                    <Button variant="ghost" onClick={handleClose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
interface IDeviceListProp {
    me: MeQuery["me"];
    onOpenModal: () => void;
}
const DeviceList = (props: IDeviceListProp) => {
    const me = props?.me;
    const devices = me?.devices;
    return (
        <>
            <Wrap direction="column">
                <WrapItem
                    border="1px"
                    borderRadius=".8em"
                    borderColor="gray.200"
                    width="100%"
                    bg="white"
                    mt="5">
                    <Stack px="5" py="3" direction="row" width="100%">
                        <Center>
                            <Heading size="md">내 장치</Heading>
                        </Center>
                        <Spacer />
                        <Center>
                            <Tooltip
                                shouldWrapChildren
                                label="장치 추가"
                                openDelay={300}
                                closeDelay={300}>
                                <IconButton
                                    colorScheme="blue"
                                    size="sm"
                                    aria-label="장치 추가"
                                    icon={<FiPlus />}
                                    onClick={props.onOpenModal}
                                />
                            </Tooltip>
                        </Center>
                    </Stack>
                </WrapItem>
                {devices?.map((device) => (
                    <DeviceItem
                        key={device?.id}
                        myId={me?.id || ""}
                        device={device as Device}
                    />
                ))}
            </Wrap>
        </>
    );
};

interface IProp {}
const App = (props: IProp) => {
    const { client, data } = useMeQuery();
    const deviceTypes = useGetDeviceTypesQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        console.log(deviceTypes);
    });

    const me = data?.me;

    return (
        <>
            <Box bg="gray.100" height="100vh">
                <Header client={client} me={me} />
                <Body>
                    <DeviceList me={me} onOpenModal={onOpen} />
                </Body>
            </Box>
            {deviceTypes.loading || (
                <AddDeviceModal
                    isOpen={isOpen}
                    onClose={onClose}
                    deviceTypes={deviceTypes.data?.deviceTypes as DeviceType[]}
                />
            )}
        </>
    );
};

export default App;
