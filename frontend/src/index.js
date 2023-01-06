import { ColorModeScript , ChakraProvider , theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { Provider } from 'react-redux';
import store from './store';
import { Provider as AlertProvider , positions , transitions  } from 'react-alert';
import alertTemplate from "react-alert-template-basic";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const options = {
  position : positions.BOTTOM_CENTER,
  timeout : 1300,
  transition : transitions.SCALE
}

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
        <ColorModeSwitcher/>
        <Provider store={store} >
          <AlertProvider template={alertTemplate} {...options} >
            <App />
          </AlertProvider>
        </Provider>
    </ChakraProvider>
  </StrictMode>
);


