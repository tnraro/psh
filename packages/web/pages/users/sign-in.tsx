import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Link } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import Logo from "@/comps/Logo";

interface IProp {

}

const App = (props: IProp) => {
    const { handleSubmit, errors, register, formState } = useForm();
    const onSubmit = (values: any) => {
        console.log(values);
    }
    console.error(errors);
    return <Box bg="gray.50" height="100vh">
        <Box w={300} mx="auto" px="1em">
            <Box py={10}>
                <Logo />
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl isInvalid={errors.email} isRequired>
                    <Input
                        name="email"
                        placeholder="이메일"
                        bg="white"
                        ref={register({
                            required: {
                                value: true,
                                message: "필수 입력 항목입니다."
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "올바른 이메일을 입력해주세요."
                            }
                        })}/>
                    <Input
                        name="password"
                        placeholder="비밀번호"
                        bg="white"
                        ref={register({
                            required: {
                                value: true,
                                message: "필수 입력 항목입니다."
                            },
                            minLength: {
                                value: 8,
                                message: "8자 이상 입력해주세요."
                            }
                        })}/>
                        <FormErrorMessage>
                            {errors.email&&errors.email.message}
                        </FormErrorMessage>
                        <FormErrorMessage>
                            {errors.password&&errors.password.message}
                        </FormErrorMessage>
                </FormControl>
                <Button
                    mt={4}
                    w="100%"
                    colorScheme="blue"
                    isLoading={formState.isSubmitting}
                    type="submit"
                    fontWeight="normal">
                    로그인
                </Button>
            </form>
            <Box textAlign="center" fontSize="0.9em" color="gray.600" my={3}>
                <Link display="inline-display" mx={5}>비밀번호 재설정</Link>
                <Link display="inline-display" mx={5} href="/users/new">회원가입</Link>
            </Box>
        </Box>
    </Box>;
}

export default App;