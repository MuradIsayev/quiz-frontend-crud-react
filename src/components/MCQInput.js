import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";

const MCQInput = ({ onChangeHandlerMCQ }) => {
    return (
        <FormControl>
            <FormLabel>Option 1</FormLabel>
            <Input type='text' name='option1' onChange={onChangeHandlerMCQ} />
            <FormLabel marginTop={'10px'}>Option 2</FormLabel>
            <Input type='text' name='option2' onChange={onChangeHandlerMCQ} />
            <FormLabel marginTop={'10px'}>Option 3</FormLabel>
            <Input type='text' name='option3' onChange={onChangeHandlerMCQ} />
            <FormLabel marginTop={'10px'}   >Option 4</FormLabel>
            <Input type='text' name='option4' onChange={onChangeHandlerMCQ} />
            <FormLabel marginTop={'20px'}>Correct Answer</FormLabel>
            <Select>
                <option selected>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option >Option 4</option>
            </Select>
        </FormControl>
    )
}

export default MCQInput;