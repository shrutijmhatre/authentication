import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignupForm } from "../types/form.interface";
import { signupSchema } from "../types/validation.schema";
import Input from "../components/Input";
import authGatewayService from "../service/authGatewayService";
import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
 
const SignUp = () => {
  const navigate = useNavigate()
  const [, setCookie] = useCookies(['token']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({ resolver: yupResolver(signupSchema) });

  const onSubmit = (data: ISignupForm) => {
    authGatewayService.postSignupUser({name:data.username, ...data}).then((res)=>{
      setCookie('token', res.token,{path: '/'})
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
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">   
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create a new account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
              
              <Input type="text" label='username' labelName="Your name" placeholder="Enter your name" error={errors.username ? true: false} errorMessage={errors.username?.message} register={()=>register('username')} registerType="username" />
              <Input type="email" label='email' labelName="Your email" placeholder="name@company.com" error={errors.email ? true: false} errorMessage={errors.email?.message} register={()=>register('email')} registerType="email" />
              <Input type="password" label='password' labelName="Password" placeholder="••••••••" error={errors.password ? true: false} errorMessage={errors.password?.message} register={()=>register('password')} registerType="password" />                        
              
                  <button type="submit"  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed">Create an account</button>         
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>            
          </div>
      </div>
  </div>
</section>
)
}

export default SignUp