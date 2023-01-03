import { Box, Button, Container, Heading, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalWrapper";
import { AiOutlinePlus } from 'react-icons/ai'
import Row from "./components/Row";
import DrawerExample from "./components/DrawerExample";



function App() {
  const { FetchUsers, questions, onOpen } = useContext(GlobalContext);
  useEffect(() => {
    FetchUsers();
  }, [])
  return (
    <div className="App">
      <Container maxW={'full'} p="4" fontSize={'18px'}>
        <Box maxW='32rem'>
          <Heading mb={4} marginTop={'10px'} paddingBottom={'10px'} color='gray.700'>Quiz App</Heading>
        </Box>
        <Box mt="5" rounded={'lg'} boxShadow="base">
          <Box p="4" display={'flex'} justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" color='gray.800'>List of Questions</Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW={"300px"}
              minW="150px"
              leftIcon={<AiOutlinePlus fontSize={'20px'} />}
              onClick={onOpen}
            >
              Add Question
            </Button>
          </Box>

          <TableContainer>
            <Table variant='simple' >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Question</Th>
                  <Th>Type</Th>
                  <Th >Points</Th>
                  <Th >Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {questions?.map(({ id, question, type, nbPoints, feedback, answers, correctAnswers }) => {
                  return (
                    <Row
                      id={id}
                      question={question}
                      type={type.type}
                      nbPoints={nbPoints}
                      feedback={feedback}
                      answers={answers}
                      cAnswers={correctAnswers}
                    />
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <DrawerExample />
      </Container>
    </div>
  );
}

export default App;
