import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const UpdatedNumericInput = ({ numeric_name, onChangeHandlerNumeric, answer }) => {
    return (
        <FormControl>
            <FormLabel>{numeric_name}</FormLabel>
            <Input type='number' defaultValue={answer} name={numeric_name} onChange={onChangeHandlerNumeric} />
        </FormControl>
    )
}

export default UpdatedNumericInput;