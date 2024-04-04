import "./global.css";
import "./utils/global.scss";
import { Router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/auth";

function App() {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <Router />
      </AuthContextProvider>
    </>
  );
}

export default App;
