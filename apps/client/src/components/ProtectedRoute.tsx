import { useCookies } from "react-cookie"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute=()=>{
    const [cookies] = useCookies(['token'])

    const isTokenExpired = (token: string )=> Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

    return cookies.token && !isTokenExpired(cookies.token) ? <Outlet/> : <Navigate to='/login' />
    
}

export default ProtectedRoute