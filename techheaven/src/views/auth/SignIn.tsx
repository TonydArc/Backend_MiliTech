import Checkbox from "components/checkbox";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, login, logout } from "services/authService";
import { isLoggedIn, setToken } from "services/untils";


export default function SignIn() {
  const [email, setInputEmail] = useState('');
  const [password, setInputPassword] = useState('');
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     navigate('/admin');
  //   }
  // }, [navigate]);

  const handleChangeEmail = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputEmail(event.target.value);
  };

  const handleChangePassword = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputPassword(event.target.value);
  };


  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const userData = {
      email,
      password
    };

    try {
      const users = await login(userData);
      if (users) {
        const token = users['access_token'];
        setToken(token);
        if (isLoggedIn) {
          const profile = await getProfile();
          if (profile.role === "admin") {
            alert('Login successful:');
            navigate('/admin');
          }else{
            alert('Login fail!:');
            logout();
          }
        }
      }
    } catch (error) {
      alert('Login failed:' + error);
    }
  };

  return (
    <div className=" mb-2 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <form onSubmit={handleClick}>
          <h4 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="mb-6 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Email
              </label>
              <input onChange={handleChangeEmail} value={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text" placeholder="email@gmail.com" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Password
              </label>
              <input onChange={handleChangePassword} value={password} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="**************" />
            </div>
          </div>
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between ">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
          {/* <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Not registered yet?
            </span>
            <a
              href="/auth/register"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create an account
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
}
