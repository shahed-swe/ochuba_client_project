import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Auth";
import Layout from "../Component/Layout/Layout";

const AuthRoutes = () => {

    const RequireAuth = ({children}) => {
        return <Layout>{children}</Layout>
    }


    return (
        <Routes>
            <Route path={"*" } element={<Navigate to="/market" replace />} />
            <Route path="/market" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path={'/login'} element={<Login />} />
        </Routes>

    )
}

export default AuthRoutes