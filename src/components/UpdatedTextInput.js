import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const UpdatedTextInput = ({ text_name, onChangeHandlerText, answer }) => {
    return (
        <FormControl>
            <FormLabel>{text_name}</FormLabel>
            <Input type='text' defaultValue={answer} name={text_name} onChange={onChangeHandlerText} />
        </FormControl>
    )
}

export default UpdatedTextInput;