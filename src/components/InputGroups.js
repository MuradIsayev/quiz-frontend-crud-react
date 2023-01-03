import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const InputsGroup = ({ name, onChangeHandler }) => {
    return (
        <FormControl>
            <FormLabel>{name}</FormLabel>
            <Input type='text' name={name} onChange={onChangeHandler} />
        </FormControl>
    )
}

export default InputsGroup;