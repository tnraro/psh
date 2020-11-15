import { theme } from "@chakra-ui/react";

export default {
    ...theme,
    fonts: {
        ...theme.fonts,
        body: "nunito, Noto Sans KR, system-ui, sans-serif"
    },
    fontWeights: {
        ...theme.fontWeights,
        light: 100,
        normal: 400,
        bold: 600
    }
};