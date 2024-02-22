import React from 'react';
//import ReactDOM from 'react-dom'; 
import { createRoot } from 'react-dom/client';
//import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';

const root = createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    </Provider>,

 // document.getElementById('root') 
);
