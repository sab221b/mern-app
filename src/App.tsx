import "./App.scss";
import CheckSession from "./helpers/checkSession";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ToastContainer autoClose={2500}/>
      <CheckSession />
    </Router>
  );
};

export default App;
