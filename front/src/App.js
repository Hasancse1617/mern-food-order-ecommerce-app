import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import Router from './router/Router';
import Store from './store';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


function App() {
  
  return (
    <Provider store={Store}>
      <Elements stripe={stripePromise}>  
        <BrowserRouter>
        <Router></Router>
        </BrowserRouter>
      </Elements>
    </Provider>
  );
}

export default App;
