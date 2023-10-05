// import ApplcationRoutes from './Config/ApplicationRoutes'
import HomeRoutes from './Routes/HomeRoutes'
import Layout from './Component/Layout/Layout';
import { useSelector } from "react-redux";
import AuthRoutes from './Routes/AuthRoutes';

function App() {

  const token = useSelector((state: any) => state.authReducer.Admintoken);

  return (
    <>
      {
        token ?
          <Layout>< HomeRoutes /></Layout >
          :
          <AuthRoutes />
      }
    </>
  )
}

export default App
