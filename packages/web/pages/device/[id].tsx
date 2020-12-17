import DeviceIcon from "@/comps/DeviceIcon";
import Body from "@/comps/layouts/Body";
import Header from "@/comps/layouts/Header";
import {
    Box,
    Divider,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Stack,
    Switch,
    Text,
    useToast,
    Wrap,
    WrapItem,
    Image
} from "@chakra-ui/react";
import {
    Device,
    MeQuery,
    useMeQuery
} from "@psh/schema/dist/operations.gen";
import mqtt from "mqtt";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

interface IRemoteControlTypeProp {
    value: boolean | number;
    onChange: (value: boolean | number) => void;
    isLoading: boolean;
}
const RemoteControlType = (props: IRemoteControlTypeProp) => {
    switch (typeof props.value) {
        case "boolean": {
            return (
                <Switch
                    isChecked={props.value}
                    onChange={(e) => props.onChange(e.target.checked)}
                    isDisabled={props.isLoading}
                />
            );
        }
        case "number": {
            return (
                <Flex>
                    <NumberInput
                        value={props.value}
                        onChange={(_, value) => props.onChange(value)}
                        isDisabled={props.isLoading}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Slider value={props.value} onChange={props.onChange}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb fontSize="sm" boxSize="2em">
                            {props.value}
                        </SliderThumb>
                    </Slider>
                </Flex>
            );
        }
        default:
            return <></>;
    }
};
interface IRemoteControlProp {
    id: string;
    sessionId: string;
    status: string;
}
const RemoteControlComponent = (props: IRemoteControlProp) => {
    const toast = useToast();
    const [status, setStatus] = useState({});
    const [client, setClient] = useState<mqtt.MqttClient | null>(null);
    const [realtimeData, setRealtimeData] = useState({});
    useEffect(() => {
        setStatus(JSON.parse(props.status));
    }, []);
    useEffect(() => {
        const client = mqtt.connect(`${location.origin}/ws`);
        setClient(client);

        client.on("connect", () => {
            client.subscribe(`${props.id}/+`, (err) => {
                if (err) {
                    toast({
                        title: "실시간 데이터 통신에 문제가 발생했습니다",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                    console.error(err);
                    return;
                }
                console.log("connected");
            });
        });
        client.on("message", (topic, message) => {
            const m = /^[a-zA-Z0-9_-]{16}\/(.+?)$/.exec(topic);
            if (m) {
                const type = m[1];
                if (type === "push" || type === "fetch") return;
                const value = message.toString("utf-8");

                setRealtimeData((realtimeData) => ({
                    ...realtimeData,
                    [type]: value
                }));
            }
        });
        client.on("error", (err) => {
            if (err) {
                console.error(err);
                toast({
                    title: "실시간 데이터 통신에 문제가 발생했습니다",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }
        });
        return () => {
            client.end(true);
        };
    }, []);

    const entires: [string, boolean | number][] = Object.entries(status);

    return (
        <>
            {entires.map(([name, value]) => {
                return (
                    <Box key={name}>
                        <Box>{name}</Box>
                        <Box>
                            <RemoteControlType
                                value={value}
                                onChange={(value: boolean | number) => {
                                    const s = {
                                        ...status,
                                        [name]: value
                                    };
                                    setStatus(s);
                                    client?.publish(
                                        `${props.id}/${props.sessionId}/push`,
                                        JSON.stringify(s)
                                    );
                                }}
                                isLoading={false}
                            />
                        </Box>
                    </Box>
                );
            })}
            <Text fontWeight="semibold">실시간 데이터</Text>
            {Object.entries(realtimeData).map(
                ([name, value]: [string, any]) => {
                    return (
                        <>
                            <Wrap>
                                <WrapItem>
                                    <Text>{name}{": "}</Text>
                                    {name === "image" ? <Image src={value} /> : <Text>{value}</Text>}
                                </WrapItem>
                            </Wrap>
                        </>
                    );
                }
            )}
        </>
    );
};
interface IDeviceProp {
    me: MeQuery["me"];
    device: Device;
}
const DeviceComponent = (props: IDeviceProp) => {
    const { device, me } = props;
    return (
        <>
            <Stack>
                <Flex alignItems="baseline">
                    <Text p={1} fontWeight="700">
                        {device.alias}
                    </Text>
                    <DeviceIcon
                        isPrivate={device.private!}
                        ownerId={device.owner?.id!}
                        myId={me!.id!}
                    />
                </Flex>
                <Text p={1} fontWeight="100">
                    {device.type!.name!}
                </Text>
                <Divider />
                <RemoteControlComponent
                    id={device.id!}
                    sessionId={me!.id!}
                    status={device.status!}
                />
            </Stack>
        </>
    );
};

interface IProp {}

const App = (props: IProp) => {
    const { client, data, error, loading } = useMeQuery();
    const router = useRouter();

    if (error) {
        return <>{error}</>;
    }

    if (loading || !data) return <></>;

    const id = router.query.id as string;
    const device = data.me!.devices!.find((device) => device!.id === id);

    return (
        <Box>
            <Header client={client} me={data?.me} />
            <Body>
                {device ? (
                    <DeviceComponent device={device} me={data.me!} />
                ) : (
                    "404 Not Found"
                )}
            </Body>
        </Box>
    );
};

export default App;
