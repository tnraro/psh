import { Tooltip, Icon } from "@chakra-ui/react";
import { FiCoffee, FiHome } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

interface DeviceIcon {
    isPrivate: boolean;
    ownerId: string | null;
    myId: string | null;
}
type State = "개인용" | "가족 공용" | "권한 없음";
const mapDeviceIcon = (state: State) => {
    switch (state) {
        case "개인용":
            return FiCoffee;
        case "가족 공용":
            return FiHome;
        case "권한 없음":
        default:
            return MdLockOutline;
    }
};
const Component = (props: DeviceIcon) => {
    const isPrivate = props.isPrivate;
    const isMine =
        props.ownerId !== null &&
        props.myId !== null &&
        props.ownerId === props.myId;
    let state: State;
    if (isPrivate) {
        if (isMine) {
            state = "개인용";
        } else {
            state = "권한 없음";
        }
    } else {
        state = "가족 공용";
    }
    return (
        <Tooltip
            shouldWrapChildren
            label={state}
            openDelay={300}
            closeDelay={300}>
            <Icon as={mapDeviceIcon(state)} />
        </Tooltip>
    );
};

export default Component;
