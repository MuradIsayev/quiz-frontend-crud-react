import { Box, Button, Td, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiFillDelete } from 'react-icons/ai'
import { GlobalContext } from "../context/GlobalWrapper";
import ViewDrawer from "./ViewDrawer";
import UpdateDrawer from "./UpdateDrawer";

const Row = ({ id, question, type, nbPoints, feedback, answers, cAnswers }) => {
    const { Delete } = useContext(GlobalContext);
    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{question}</Td>
            <Td>{type}</Td>
            <Td>{nbPoints}</Td>

            <Td>
                <Box display={'flex'} gap="2">
                    <ViewDrawer questionId={id} />
                    <UpdateDrawer questionId={id} rowType={type} answers={answers} rowQuestion={question} points={nbPoints} rowFeedback={feedback} cAnswers={cAnswers} />
                    <Button colorScheme={'red'} onClick={() => Delete(id)}>
                        <AiFillDelete />
                    </Button>
                </Box>
            </Td>
        </Tr >
    )
}

export default Row;