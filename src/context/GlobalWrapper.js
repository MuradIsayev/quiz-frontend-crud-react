import { createContext } from "react";
import axios from 'axios';
import { useState } from "react";
import { useDisclosure, useToast } from '@chakra-ui/react'

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [errors, setErrors] = useState({})
    const [questions, setQuestions] = useState([])
    const [getQuestion, getSetQuestion] = useState({})


    const toast = useToast()
    const FetchUsers = async () => {
        await axios.get('/api/quiz').then((res) => {
            setQuestions(res.data);
        })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    const Delete = (id) => {
        axios.delete(`/api/quiz/${id}`).then(res => {
            setQuestions(questions.filter(u => u.id !== id));
            toast({
                title: 'Question deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        })
    }
    const GetOneQuestion = (id) => {
        axios.get(`/api/quiz/${id}`)
            .then(response => {
                getSetQuestion(response?.data);
            });
    }


    const AddTextQuestion = ({ question, point, text, feedback, setQuestion, setPoint, setText, setFeedback, setSelected }) => {


        const addQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 4,
            correctTextAnswers:
                [{
                    correctAnswer: text,
                }],
        }
        axios.post('/api/quiz', addQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            setQuestion(null)
            setPoint(null)
            setText(null)
            setFeedback(null)
            setSelected(null)


        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be created.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })

    }

    const AddNumericQuestion = ({ question, point, numeric, feedback, setQuestion, setPoint, setNumeric, setFeedback, setSelected }) => {

        const addQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 1,
            correctNumberAnswers:
                [{
                    correctAnswer: parseInt(numeric),
                }],
        }
        axios.post('/api/quiz', addQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            setQuestion(null)
            setPoint(null)
            setNumeric(null)
            setFeedback(null)
            setSelected(null)

        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be created.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })
    }


    const AddMcqQuestion = ({ question, point, mcq, ansMCQ, feedback, setQuestion, setPoint, setMCQ, setAnsMCQ, setFeedback, setSelected }) => {
        const addQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 3,
            answers: [
                {
                    options: mcq.option1,
                    isCorrect: ansMCQ.option1
                },
                {
                    options: mcq.option2,
                    isCorrect: ansMCQ.option2
                },
                {
                    options: mcq.option3,
                    isCorrect: ansMCQ.option3
                },
                {
                    options: mcq.option4,
                    isCorrect: ansMCQ.option4
                }
            ],
            correctMCQAnswers:
                [{
                    correctAnswer: ansMCQ.option1 ? mcq.option1 : null
                },
                {
                    correctAnswer: ansMCQ.option2 ? mcq.option2 : null
                },
                {
                    correctAnswer: ansMCQ.option3 ? mcq.option3 : null
                },
                {
                    correctAnswer: ansMCQ.option4 ? mcq.option4 : null
                },
                ],
        }
        addQuestion.correctMCQAnswers = addQuestion.correctMCQAnswers.filter((item) => item.correctAnswer !== null)
        axios.post('/api/quiz', addQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            setQuestion(null)
            setPoint(null)
            setMCQ({
                option1: "",
                option2: "",
                option3: "",
                option4: ""
            })
            setAnsMCQ({
                option1: false,
                option2: false,
                option3: false,
                option4: false
            })
            setFeedback(null)
            setSelected(null)

        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be created.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })
    }


    const AddBooleanQuestion = ({ question, point, selectedBoolean, feedback, setQuestion, setPoint, setSelectedBoolean, setFeedback, setSelected }) => {
        const addQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 2,
            answers: [
                {
                    options: "true",
                    isCorrect: selectedBoolean ? true : false
                },
                {
                    options: "false",
                    isCorrect: selectedBoolean ? false : true
                }
            ],
            correctBooleanAnswers:
                [
                    {
                        correctAnswer: JSON.parse(selectedBoolean)
                    }

                ],
        }
        axios.post('/api/quiz', addQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            setQuestion(null)
            setPoint(null)
            setSelectedBoolean(null)
            setFeedback(null)
            setSelected(null)


        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be created.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })
    }





    const UpdateTextQuestion = ({ questionId, question, point, text, feedback }) => {
        const updateQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 4,
            correctTextAnswers:
                [{
                    correctAnswer: text,
                }],
        }
        axios.patch(`/api/quiz/${questionId}`, updateQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            FetchUsers()
            toast({
                title: 'Question updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })

        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be updated.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })

        })
    }

    const UpdateNumericQuestion = ({ questionId, question, point, numeric, feedback }) => {
        const updateQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 1,
            correctNumberAnswers:
                [{
                    correctAnswer: parseInt(numeric),
                }],
        }
        axios.patch(`/api/quiz/${questionId}`, updateQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })

        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be updated.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })
    }


    const UpdateMcqQuestion = ({ questionId, question, point, mcq, ansMCQ, feedback }) => {
        const updateQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 3,
            answers: [
                {
                    options: mcq.option1,
                    isCorrect: ansMCQ.option1
                },
                {
                    options: mcq.option2,
                    isCorrect: ansMCQ.option2
                },
                {
                    options: mcq.option3,
                    isCorrect: ansMCQ.option3
                },
                {
                    options: mcq.option4,
                    isCorrect: ansMCQ.option4
                }
            ],
            correctMCQAnswers:
                [{
                    correctAnswer: ansMCQ.option1 ? mcq.option1 : null
                },
                {
                    correctAnswer: ansMCQ.option2 ? mcq.option2 : null
                },
                {
                    correctAnswer: ansMCQ.option3 ? mcq.option3 : null
                },
                {
                    correctAnswer: ansMCQ.option4 ? mcq.option4 : null
                },
                ],
        }
        updateQuestion.correctMCQAnswers = updateQuestion.correctMCQAnswers.filter((item) => item.correctAnswer !== null)
        axios.patch(`/api/quiz/${questionId}`, updateQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })

        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be updated.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })
    }


    const UpdateBooleanQuestion = ({ questionId, question, point, selectedBoolean, feedback }) => {
        const updateQuestion = {
            question: question,
            nbPoints: parseInt(point),
            feedback: feedback,
            typeId: 2,
            answers: [
                {
                    options: "true",
                    isCorrect: selectedBoolean ? true : false
                },
                {
                    options: "false",
                    isCorrect: selectedBoolean ? false : true
                }
            ],
            correctBooleanAnswers:
                [
                    {
                        correctAnswer: JSON.parse(selectedBoolean)
                    }

                ],
        }
        axios.patch(`/api/quiz/${questionId}`, updateQuestion, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            onClose()
            FetchUsers()
            toast({
                title: 'Question updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })

        }).catch(err => {
            setErrors(err.response.data.message)
            toast({
                title: "Question couldn't be updated.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        })
    }



    return <GlobalContext.Provider value={{ UpdateBooleanQuestion, getQuestion, GetOneQuestion, AddBooleanQuestion, AddMcqQuestion, FetchUsers, questions, Delete, AddTextQuestion, AddNumericQuestion, onOpen, isOpen, onClose, errors, setErrors, UpdateTextQuestion, UpdateNumericQuestion, UpdateMcqQuestion }}>{children}</ GlobalContext.Provider>
}