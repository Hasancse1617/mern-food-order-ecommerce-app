import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import Router from './router/Router';
import Store from './store';


function App() {
  
  return (
    <Provider store={Store}>
      <BrowserRouter>
      <Router></Router>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
