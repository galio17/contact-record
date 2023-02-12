import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" />
    </Routes>
  );
};

export default MainRoutes;
