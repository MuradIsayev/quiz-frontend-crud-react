import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const NumericInput = ({ numeric_name, onChangeHandlerNumeric }) => {
    return (
        <FormControl>
            <FormLabel>{numeric_name}</FormLabel>
            <Input type='number' name={numeric_name} onChange={onChangeHandlerNumeric} />
        </FormControl>
    )
}

export default NumericInput;