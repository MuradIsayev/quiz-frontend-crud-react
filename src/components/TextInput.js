import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const TextInput = ({ text_name, onChangeHandlerText }) => {
    return (
        <FormControl>
            <FormLabel>{text_name}</FormLabel>
            <Input required type='text' name={text_name} onChange={onChangeHandlerText} />
        </FormControl>
    )
}

export default TextInput;