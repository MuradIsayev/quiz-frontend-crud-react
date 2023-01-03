import { Button, useDisclosure, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Select, Stack, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalWrapper";
import UpdatedNumericInput from "./UpdatedNumericInput";
import UpdatedTextInput from "./UpdatedTextInput";


export default function UpdateDrawer({ questionId, rowType, rowQuestion, points, rowFeedback, answers, cAnswers }) {
    const { FetchUsers } = useContext(GlobalContext);
    const toast = useToast()


    useEffect(() => {
        FetchUsers();
    }, [])
    const { UpdateTextQuestion, UpdateMcqQuestion, UpdateNumericQuestion, UpdateBooleanQuestion } = useContext(GlobalContext);
    const [question, setQuestion] = useState(rowQuestion);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [point, setPoint] = useState(points);
    const [selectedBoolean, setSelectedBoolean] = useState(cAnswers[0]?.correctAnswer === '1' ? "true" : "false");
    const [text, setText] = useState(cAnswers[0]?.correctAnswer);
    const [numeric, setNumeric] = useState(cAnswers[0]?.correctAnswer);
    const [selected, setSelected] = useState(rowType);
    const [feedback, setFeedback] = useState(rowFeedback);

    const [mcq, setMCQ] = useState({
        option1: answers[0]?.options,
        option2: answers[1]?.options,
        option3: answers[2]?.options,
        option4: answers[3]?.options
    });
    const [ansMCQ, setAnsMCQ] = useState({
        option1: answers[0]?.isCorrect,
        option2: answers[1]?.isCorrect,
        option3: answers[2]?.isCorrect,
        option4: answers[3]?.isCorrect
    });
    useEffect(() => {
        setAnsMCQ({
            option1: answers[0]?.isCorrect,
            option2: answers[1]?.isCorrect,
            option3: answers[2]?.isCorrect,
            option4: answers[3]?.isCorrect
        })
    }, [answers])
    useEffect(() => { setMCQ({ option1: answers[0]?.options, option2: answers[1]?.options, option3: answers[2]?.options, option4: answers[3]?.options }) }, [answers])
    useEffect(() => { setPoint(points) }, [points])
    useEffect(() => { setQuestion(rowQuestion) }, [rowQuestion])
    useEffect(() => { setFeedback(rowFeedback) }, [rowFeedback])
    useEffect(() => { setSelectedBoolean(cAnswers[0]?.correctAnswer === '1' ? "true" : "false") }, [cAnswers[0]?.correctAnswer])
    useEffect(() => { setNumeric(cAnswers[0]?.correctAnswer) }, [cAnswers[0]?.correctAnswer])
    useEffect(() => { setText(cAnswers[0]?.correctAnswer) }, [cAnswers[0]?.correctAnswer])




    const [open, setOpen] = useState(null);


    async function handleClick() {
        setOpen(onOpen);

    }
    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    const onChangeHandlerNumeric = (e) => {
        setNumeric(e.target.value);
    }

    const onChangeHandlerText = (e) => {
        setText(e.target.value);
    }

    const onUpdate = async (questionId) => {
        if (point <= 0) {
            toast({
                title: "Points cannot be 0 or negative",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
        if (selected === "Text") {
            if (text !== null) {
                var matches = text.match(/\d+/g);
                if (matches != null) {
                    toast({
                        title: "Answer cannot contain numbers.",
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-left',
                    })
                }
            }
            await UpdateTextQuestion({ questionId, question, point, text, feedback });
            onClose()

        }
        else if (selected === "Numeric") {
            UpdateNumericQuestion({ questionId, question, point, numeric, feedback });
            onClose()
        }
        else if (selected === "MCQ") {
            if (Object.keys(ansMCQ).every((key) => !ansMCQ[key])) {
                toast({
                    title: "Please select at least one correct answer.",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-left',

                })
            }
            else {
                UpdateMcqQuestion({ questionId, question, point, mcq, ansMCQ, feedback });
                onClose()
            }
        }
        else if (selected === "True/False") {
            UpdateBooleanQuestion({ questionId, question, point, selectedBoolean, feedback });
            onClose()
        }
    }

    return (
        <>
            <Button colorScheme={'blue'} onClick={handleClick}>
                <AiFillEdit />
            </Button>
            <Drawer
                isOpen={isOpen}
                open={open}
                placement='right'
                onClose={onClose}
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Update question</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing='10px'>
                            <FormLabel>{'Question'}</FormLabel>
                            <Input type='text' name='question' defaultValue={question} onChange={((e) => {
                                setQuestion(e.target.value)
                            })} />
                            <FormLabel>Points</FormLabel>
                            <Input type='number' name='points' defaultValue={point} onChange={((e) => {
                                setPoint(e.target.value)
                            })} />
                            <FormLabel name="type">Type</FormLabel>
                            {selected === 'MCQ' && <Select name="type" disabled onChange={changeSelectOptionHandler}>
                                <option value='Numeric'>Numeric</option>
                                <option value='True/False'>True/False</option>
                                <option selected value='MCQ'>MCQ</option>
                                <option value='Text'>Text</option>
                            </Select>}
                            {selected === 'Numeric' && <Select name="type" disabled onChange={changeSelectOptionHandler}>
                                <option selected value='Numeric'>Numeric</option>
                                <option value='True/False'>True/False</option>
                                <option value='MCQ'>MCQ</option>
                                <option value='Text'>Text</option>
                            </Select>}
                            {selected === 'True/False' && <Select name="type" disabled onChange={changeSelectOptionHandler}>
                                <option value='Numeric'>Numeric</option>
                                <option selected value='True/False'>True/False</option>
                                <option value='MCQ'>MCQ</option>
                                <option value='Text'>Text</option>
                            </Select>}
                            {selected === 'Text' && <Select name="type" disabled onChange={changeSelectOptionHandler}>
                                <option value='Numeric'>Numeric</option>
                                <option value='True/False'>True/False</option>
                                <option value='MCQ'>MCQ</option>
                                <option selected value='Text'>Text</option>
                            </Select>}

                            {(selected === 'Numeric') && <UpdatedNumericInput answer={numeric} numeric_name="Correct answer" onChangeHandlerNumeric={onChangeHandlerNumeric} />}
                            {(selected === 'True/False') && <FormControl>
                                <FormLabel>Correct answer</FormLabel>
                                {selectedBoolean === 'true' ? <Select onChange={(e) => {
                                    setSelectedBoolean(e.target.value)
                                }} >
                                    <option selected value='true'>True</option>
                                    <option value='false'>False</option>
                                </Select> : <Select onChange={(e) => {
                                    setSelectedBoolean(e.target.value)
                                }} >
                                    <option value='true'>True</option>
                                    <option selected value='false'>False</option>
                                </Select>}
                            </FormControl>}
                            {(selected === 'MCQ') && <FormControl>
                                <FormLabel>Option 1</FormLabel>
                                <Input type='text' name='option1' defaultValue={mcq.option1} onChange={e => setMCQ({ ...mcq, option1: e.target.value })} />
                                <FormLabel marginTop={'10px'}>Option 2</FormLabel>
                                <Input type='text' defaultValue={mcq.option2} name='option2' onChange={e => setMCQ({ ...mcq, option2: e.target.value })} />
                                <FormLabel marginTop={'10px'}>Option 3</FormLabel>
                                <Input type='text' defaultValue={mcq.option3} name='option3' onChange={e => setMCQ({ ...mcq, option3: e.target.value })} />
                                <FormLabel marginTop={'10px'}   >Option 4</FormLabel>
                                <Input type='text' defaultValue={mcq.option4} name='option4' onChange={e => setMCQ({ ...mcq, option4: e.target.value })} />
                                <FormLabel marginTop={'20px'}>Correct Answer</FormLabel>

                                <Stack pl={6} mt={1} spacing={1}>
                                    <Checkbox defaultChecked={ansMCQ.option1} onChange={e => setAnsMCQ({ ...ansMCQ, option1: e.target.checked })} >option 1</Checkbox>
                                    <Checkbox defaultChecked={ansMCQ.option2} onChange={e => setAnsMCQ({ ...ansMCQ, option2: e.target.checked })}>option 2</Checkbox>
                                    <Checkbox defaultChecked={ansMCQ.option3} onChange={e => setAnsMCQ({ ...ansMCQ, option3: e.target.checked })}>option 3</Checkbox>
                                    <Checkbox defaultChecked={ansMCQ.option4} onChange={e => setAnsMCQ({ ...ansMCQ, option4: e.target.checked })}>option 4</Checkbox>
                                </Stack>
                            </FormControl>}
                            {(selected === 'Text') && <UpdatedTextInput answer={text} text_name="Correct answer" onChangeHandlerText={onChangeHandlerText} />}
                            <FormLabel>{'Feedback'}</FormLabel>
                            <Input type='text' name='feedback' defaultValue={feedback} onChange={((e) => setFeedback(e.target.value))} />
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={() => onUpdate(questionId)} >Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}