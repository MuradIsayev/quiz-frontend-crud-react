import { useToast, Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalWrapper";
import TextInput from "./TextInput"
import NumericInput from "./NumericInput"
export default function DrawerExample() {
    const toast = useToast()
    const { isOpen, onClose, AddTextQuestion, AddNumericQuestion, AddMcqQuestion, AddBooleanQuestion } = useContext(GlobalContext);
    const [question, setQuestion] = useState(null);
    const [point, setPoint] = useState(null);
    const [selectedBoolean, setSelectedBoolean] = useState(null);
    const [text, setText] = useState(null);
    const [numeric, setNumeric] = useState(null);
    const [mcq, setMCQ] = useState({
        option1: "",
        option2: "",
        option3: "",
        option4: ""
    });
    const [ansMCQ, setAnsMCQ] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false
    });

    const [feedback, setFeedback] = useState(null);
    const [selected, setSelected] = useState(null);
    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    const onChangeHandlerNumeric = (e) => {
        setNumeric(e.target.value);
    }

    const onChangeHandlerText = (e) => {
        setText(e.target.value);
    }

    const onCloseHandler = () => {
        onClose();
        setSelected(null);
        setQuestion(null);
        setPoint(null);
        setText(null);
        setNumeric(null);
        setFeedback(null);
        setMCQ({
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        });
        setAnsMCQ({
            option1: false,
            option2: false,
            option3: false,
            option4: false
        });
        setSelectedBoolean(null);
    }

    const onAdd = () => {
        if (point <= 0) {
            toast({
                title: "Points cannot be 0 or negative",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
        else if (selected === null || selected === undefined || selected === "" || selected === "Select type") {
            toast({
                title: "Please select a question type.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
        else {
            if (selected === "Text") {
                if (text !== null && text !== undefined && text !== "") {
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
                    else {
                        AddTextQuestion({ question, point, text, feedback, setQuestion, setPoint, setText, setFeedback, setSelected });
                    }
                }
                else if (text === null || text === undefined || text === "") {
                    toast({
                        title: "Please enter an answer.",
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-left',
                    })
                }
            }
            else if (selected === "Numeric") {
                AddNumericQuestion({ question, point, numeric, feedback, setQuestion, setPoint, setNumeric, setFeedback, setSelected });
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
                    AddMcqQuestion({ question, point, mcq, ansMCQ, feedback, setQuestion, setPoint, setMCQ, setAnsMCQ, setFeedback, setSelected });
                }
            }
            else if (selected === "True/False") {
                AddBooleanQuestion({ question, point, selectedBoolean, feedback, setQuestion, setPoint, setSelectedBoolean, setFeedback, setSelected });
            }
        }
    }



    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create question</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing='10px'>
                            <FormLabel>{'Question'}</FormLabel>
                            <Input required type='text' name='question' onChange={((e) => {
                                setQuestion(e.target.value)
                            })} />
                            <FormLabel>Points</FormLabel>
                            <Input type='number' name='points' onChange={((e) => {
                                setPoint(e.target.value)
                            })} />
                            <FormLabel name="type">Type</FormLabel>
                            <Select name="type" placeholder='Select type' onChange={changeSelectOptionHandler}>
                                <option value='Numeric'>Numeric</option>
                                <option value='True/False'>True/False</option>
                                <option value='MCQ'>MCQ</option>
                                <option value='Text'>Text</option>
                            </Select>
                            {selected === 'Numeric' && <NumericInput numeric_name="Correct answer" onChangeHandlerNumeric={onChangeHandlerNumeric} />}
                            {selected === 'True/False' && <FormControl>
                                <FormLabel>Correct answer</FormLabel>
                                <Select onChange={(e) => {
                                    setSelectedBoolean(e.target.value)
                                }} placeholder="Select answer">
                                    <option value='true'>True</option>
                                    <option value='false'>False</option>
                                </Select>
                            </FormControl>}
                            {selected === 'MCQ' && <FormControl>
                                <FormLabel>Option 1</FormLabel>
                                <Input type='text' value={mcq.option1} name='option1' onChange={e => setMCQ({ ...mcq, option1: e.target.value })} />
                                <FormLabel marginTop={'10px'}>Option 2</FormLabel>
                                <Input type='text' value={mcq.option2} name='option2' onChange={e => setMCQ({ ...mcq, option2: e.target.value })} />
                                <FormLabel marginTop={'10px'}>Option 3</FormLabel>
                                <Input type='text' value={mcq.option3} name='option3' onChange={e => setMCQ({ ...mcq, option3: e.target.value })} />
                                <FormLabel marginTop={'10px'}   >Option 4</FormLabel>
                                <Input type='text' value={mcq.option4} name='option4' onChange={e => setMCQ({ ...mcq, option4: e.target.value })} />
                                <FormLabel marginTop={'20px'}>Correct Answer</FormLabel>
                                <Stack pl={6} mt={1} spacing={1}>
                                    <Checkbox value={ansMCQ.option1} onChange={e => setAnsMCQ({ ...ansMCQ, option1: e.target.checked })} >option 1</Checkbox>
                                    <Checkbox value={ansMCQ.option2} onChange={e => setAnsMCQ({ ...ansMCQ, option2: e.target.checked })}>option 2</Checkbox>
                                    <Checkbox value={ansMCQ.option3} onChange={e => setAnsMCQ({ ...ansMCQ, option3: e.target.checked })}>option 3</Checkbox>
                                    <Checkbox value={ansMCQ.option4} onChange={e => setAnsMCQ({ ...ansMCQ, option4: e.target.checked })}>option 4</Checkbox>
                                </Stack>
                            </FormControl>}
                            {selected === 'Text' && <TextInput text_name="Correct answer" onChangeHandlerText={onChangeHandlerText} />}
                            <FormLabel>{'Feedback'}</FormLabel>
                            <Input type='text' name='feedback' onChange={((e) => setFeedback(e.target.value))} />
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={() => onCloseHandler()}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={() => onAdd()}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}   