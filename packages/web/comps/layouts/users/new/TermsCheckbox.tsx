import { Box, Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

interface IProp {
    id: string;
    url?: string;
    message: string;
    isRequired: boolean;
    isChecked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    register: any;
}

const TermsCheckbox = (props: IProp) => {
    const id = props.id,
        url = props.url,
        message = props.message,
        isRequired = props.isRequired,
        isChecked = props.isChecked,
        onChange = props.onChange,
        register = props.register;
    return (
        <Checkbox
            name={id}
            isChecked={isChecked}
            onChange={onChange}
            ref={register({
                required: isRequired
            })}>
            {url ? (
                <a
                    href={url}
                    target="_blank"
                    style={{ textDecoration: "underline" }}>
                    {message}
                </a>
            ) : (
                message
            )}
            <Box as="span" color={isRequired ? "blue.400" : "gray.400"}>
                ({isRequired ? "필수" : "선택"})
            </Box>
        </Checkbox>
    );
};

export default TermsCheckbox;
