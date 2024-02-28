import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { Toaster } from "react-hot-toast"; // Import Toaster
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const App = () => {
  const routing = useRoutes(Themeroutes);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "2px solid white",
            padding: "20px",
            fontSize: "15px",
          },
        }}
      />
      <div className="dark">{routing}</div>
    </>
  );
};

export default App;
