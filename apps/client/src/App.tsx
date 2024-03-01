
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { CookiesProvider} from 'react-cookie'
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={ <ProtectedRoute /> }>
            <Route path="/" element={<Home/>}/>
          </Route>  
          <Route path="/login" element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>   
  )
}

export default App
