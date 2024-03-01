import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../types/validation.schema";
import Input from "../components/Input";
import authGatewayService from "../service/authGatewayService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate()
  const [, setCookie] = useCookies(['token']);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<{ email: string; password: string; }>({ resolver: yupResolver(loginSchema) });
    
      const onSubmit = (data: { email: string; password: string; }) => {
        authGatewayService.postLoginUser({...data}).then((res)=>{
          setCookie('token', res.token,{path: '/'});
          navigate('/')
        }).catch((err:AxiosError<{error:string, message:string, statusCode:string}>)=>{
          if(err.response?.data){
            toast.error(err.response?.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
          }
        })
      };
    

  return (
<section className="bg-gray-100 dark:bg-gray-900">
  <ToastContainer />
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
               
                <Input type="email" label='email' labelName="Your email" placeholder="name@company.com" error={errors.email ? true: false} errorMessage={errors.email?.message} register={()=>register("email")} registerType="email"  />
                <Input type="password" label='password' labelName="Password" placeholder="••••••••" error={errors.password ? true: false} errorMessage={errors.password?.message} register={()=>register("password")} registerType="password"  />                
                 
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
              
          </div>
      </div>
  </div>
</section>
)
}

export default Login