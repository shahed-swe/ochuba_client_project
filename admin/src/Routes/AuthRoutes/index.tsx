import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/Auth";


const AuthRoutes = () => {

    

    return (
        <Routes>
          
            <Route path={"*" } element={<Navigate to="/admin/login" replace />} />
            {/* Dashboard */}
            <Route path="/admin/login" element={<Login />} />
           

        </Routes>

    )
}

export default AuthRoutes