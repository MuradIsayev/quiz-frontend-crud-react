import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Wrapper from './context/GlobalWrapper';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/quiz">
    <Wrapper>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Wrapper>
  </BrowserRouter>

);
