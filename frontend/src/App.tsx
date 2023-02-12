import "react-toastify/dist/ReactToastify.css";

import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import UserProvider from "./providers/user";
import MainRoutes from "./routes";

const App = () => (
  <>
    <UserProvider>
      <ToastContainer newestOnTop position="top-center" autoClose={3000} />
      <MainRoutes />
    </UserProvider>
  </>
);

export default App;
