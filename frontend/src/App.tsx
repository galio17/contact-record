import UserProvider from "./provider/user";
import MainRoutes from "./routes";

const App = () => (
  <>
    <UserProvider>
      <MainRoutes />
    </UserProvider>
  </>
);

export default App;
