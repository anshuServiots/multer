import { useEffect } from "react";
import { useNavigate , Outlet  } from "react-router-dom";

function ProtectedRoute(){
    const navigate =  useNavigate()

    useEffect(()=>{
        const token = window.localStorage.getItem("token")

        if(!token){
            //navigate('/login')
        }
    },[])

    return  <Outlet />;

}

export {ProtectedRoute}