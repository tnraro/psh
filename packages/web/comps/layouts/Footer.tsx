import { Box, Link, Stack } from "@chakra-ui/core";

const Footer = () => {
    return <Stack>
        <Box as="dl">
            <Box as="dt">
                상호명
            </Box>
            <Box as="dd">
                별양공방
            </Box>
            <Box as="dt">
                이메일
            </Box>
            <Box as="dd">
                (고객문의)
                <Link href="mailto:noreply@kyungsung.ac.kr">noreply@kyungsung.ac.kr</Link>
            </Box>
            <Box as="dt">
                대표자
            </Box>
            <Box as="dd">
                (조장)
                <Link href="https://tnraro.com" target="_blank">양호진</Link>
            </Box>
        </Box>
        <Box as="dl">
            <Box as="dt">
                사업자등록번호
            </Box>
            <Box as="dd">
                000-00-00000
            </Box>
            <Box as="dt">
                통신판매업신고번호
            </Box>
            <Box as="dd">
                제0000-부산남구-0000호
            </Box>
            <Box as="dt">
                주소
            </Box>
            <Box as="dd">
                자택
            </Box>
        </Box>
    </Stack>
}

export default Footer;