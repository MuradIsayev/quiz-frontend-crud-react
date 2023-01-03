import { Box, Button, Card, CardBody, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalWrapper";



export default function ViewDrawer({ questionId }) {
    const { getQuestion } = useContext(GlobalContext);
    const { GetOneQuestion } = useContext(GlobalContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [open, setOpen] = useState(null);
    async function handleClick() {
        setOpen(onOpen);
        GetOneQuestion(questionId);
    }
    

    return (
        <>
            <Button colorScheme={'green'} onClick={handleClick}>
                <AiFillEye />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} open={open}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Question
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {getQuestion?.question}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Points
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {getQuestion?.nbPoints}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Type
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {getQuestion?.type?.type}
                                        </Text>
                                    </Box>
                                    {(getQuestion?.type?.type === 'MCQ') && (
                                        <Box>

                                            <Heading size='xs' textTransform='uppercase'>
                                                Answers
                                            </Heading>
                                            <Text>
                                                {getQuestion?.answers?.map((answer) => (
                                                    <Text>{answer.options}</Text>
                                                ))}
                                            </Text>
                                        </Box>
                                    )}
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Correct answer
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {getQuestion?.correctAnswers?.map((answer) => (
                                                (getQuestion?.type?.type === 'True/False' && answer.correctAnswer === '0') ? <Text>False</Text> : (getQuestion?.type?.type === 'True/False' && answer.correctAnswer === '1') ? <Text>True</Text> :
                                                    <Text>{answer.correctAnswer}</Text>
                                            ))}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Feedback
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {getQuestion?.feedback}
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
