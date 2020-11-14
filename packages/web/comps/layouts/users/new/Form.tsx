import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Stack,
    Checkbox,
    Divider,
    useToast
} from "@chakra-ui/core";
import TermsCheckbox from "./TermsCheckbox";
import { useNewUserMutation } from "@psh/schema/dist/generated/operations";
import { StatusCodes } from "http-status-codes";

type TermsItems = {
    id: string;
    url?: string;
    message: string;
    isRequired: boolean;
    isChecked: boolean;
};

const Form = () => {
    const toast = useToast();
    const { handleSubmit, errors, register, formState, watch } = useForm();
    const [newUser, result] = useNewUserMutation();
    const [termsItems, setTermsItems] = useState<TermsItems[]>([
        {
            id: "agelimit",
            message: "만 14세 이상입니다.",
            isRequired: true,
            isChecked: false,
        },
        {
            id: "usepolicy",
            url: "/usepolicy",
            message: "이용약관",
            isRequired: true,
            isChecked: false,
        },
        {
            id: "privacy",
            url: "/privacy",
            message: "개인정보처리방침",
            isRequired: true,
            isChecked: false,
        },
        {
            id: "promotion",
            message: "이벤트, 프로모션 알림 메일 및 뿌테 초대 수신",
            isRequired: false,
            isChecked: false,
        }
    ]);

    const onChangeTermsItem = (e: ChangeEvent<HTMLInputElement>) => {
        setTermsItems(termsItems.map(item => {
            if (item.id === e.target.name) {
                return {
                    ...item,
                    isChecked: e.target.checked
                };
            }
            return item;
        }));
    }

    const onChangeAllTermsItemsChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setTermsItems(termsItems.map(item => {
            return {
                ...item,
                isChecked: e.target.checked
            };
        }));
    }

    const allTermsItemsChecked = termsItems.every(item => item.isChecked);

    const password = useRef({});
    password.current = watch("password", "");

    const validatePasswordMatch = (value: string) => {
        return value === password.current || "비밀번호가 일치하지 않습니다.";
    }

    interface IFormValues {
        email: string;
        username: string;
        password: string;
        agelimit: boolean;
        usepolicy: boolean;
        privacy: boolean;
        promotion: boolean;
    }

    const onSubmit = async (values: IFormValues) => {
        console.log(values);
        try {
            const result = await newUser({
                variables: {
                    params: {
                        email: values.email,
                        username: values.username,
                        password: values.password,
                        agelimit: values.agelimit,
                        usepolicy: values.usepolicy,
                        privacy: values.privacy,
                        promotion: values.promotion
                    }
                }
            });
            if (result.data?.newUser)  {
                const session = result.data.newUser;
                localStorage.setItem("access-token", session.access_token);
                location.reload();
            }
        } catch (e: any) {
            for (const errors of e.graphQLErrors) {
                if (errors.extensions.code == StatusCodes.CONFLICT) {
                    toast({
                        title: "이미 가입한 이메일입니다",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                } else {
                    toast({
                        title: "회원가입 중 문제가 발생했습니다",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                }
            }
            console.error(e.message);
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl mt="1em" isInvalid={errors.email} isRequired>
            <FormLabel htmlFor="email">이메일</FormLabel>
            <FormHelperText id="email-helper-text">
                본인 확인을 위한 이메일을 입력해주세요.
            </FormHelperText>
            <Input
                id="email"
                name="email"
                aria-describedby="email-helper-text"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "올바른 이메일을 입력해주세요."
                    }
                })}
                placeholder="이메일"/>
            <FormErrorMessage>
                {errors.email && errors.email.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl mt="1em" isInvalid={errors.password} isRequired>
            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <FormHelperText id="password-helper-text">
                8자 이상 입력해주세요.
            </FormHelperText>
            <Input
                id="password"
                type="password"
                name="password"
                aria-describedby="password-helper-text"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    minLength: {
                        value: 8,
                        message: "8자 이상 입력해주세요."
                    }
                })}
                placeholder="비밀번호"/>
            <FormErrorMessage>
                {errors.password && errors.password.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl mt="1em" isInvalid={errors.password2} isRequired>
            <FormLabel htmlFor="password2">비밀번호 확인</FormLabel>
            <Input
                id="password2"
                type="password"
                name="password2"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    validate: validatePasswordMatch
                })}
                placeholder="비밀번호 확인"/>
            <FormErrorMessage>
                {errors.password2 && errors.password2.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl mt="1em" isInvalid={errors.username} isRequired>
            <FormLabel htmlFor="username">이름</FormLabel>
            <Input
                id="username"
                name="username"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    minLength: {
                        value: 2,
                        message: "이름은 2자 이싱으로 설정해주세요."
                    },
                    maxLength: {
                        value: 53,
                        message: "이름은 53자 이하로 설정해주세요."
                    }
                })}
                placeholder="이름 (2-53자)"/>
                <FormErrorMessage>
                    {errors.username && errors.username.message}
                </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={termsItems.some(item => item.isRequired && !item.isChecked)} isRequired>
            <Stack border="1px" borderRadius="md" borderColor="gray.200" p="1em" mt="1em">
                <FormLabel htmlFor="tos">약관 동의</FormLabel>
                <Checkbox
                    name="tos"
                    isChecked={allTermsItemsChecked}
                    onChange={onChangeAllTermsItemsChecked}>
                    전체동의
                </Checkbox>
                <Divider />
                {termsItems.map(item => {
                    return <TermsCheckbox
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        message={item.message}
                        isRequired={item.isRequired}
                        isChecked={item.isChecked}
                        onChange={onChangeTermsItem}
                        register={register}
                    />;
                })}
            </Stack>
            <FormErrorMessage>
                {"필수 선택 항목입니다."}
            </FormErrorMessage>
        </FormControl>
        <Button
            mt={4}
            colorScheme="blue"
            isLoading={formState.isSubmitting || result.loading}
            type="submit"
            fontWeight="normal">
            회원가입
        </Button>
    </form>;
}

export default Form;