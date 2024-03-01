import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies] = useCookies(['token'])

  const parseJwt =(token:string) =>{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const username = parseJwt(cookies.token);

  return (
    <div>
          <h1 className="my-10 font-bold text-2xl">Welcome to the application, {username.name}!</h1>
    </div>

  )
}

export default Home