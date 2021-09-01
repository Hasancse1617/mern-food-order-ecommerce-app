import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./router/Router";
import './App.css';
import Store from "./store";

function App() {
  return (
    <Provider store={Store}>
        <div className="wrapper">
           <BrowserRouter>
            <Router/>
          </BrowserRouter>
        </div>
    </Provider>
  );
}

export default App;
