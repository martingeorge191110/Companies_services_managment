import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoginApi } from "../services/user.auth.jsx";
import { useDispatch } from "react-redux";
import { LoginAction } from "../store/actions.jsx";
import { useHistory } from "react-router-dom/cjs/react-router-dom.js";





const Login = () => {

  const dispatch = useDispatch()
  const navigate = useHistory();


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState(null)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  useEffect(() => {
    if (Array.isArray(errors)) {
      for (const err of errors) {
        if (emailError.trim() === '' && err.path === 'email') {
          setEmailError(err.msg)
          break;
        }
        if (passwordError.trim() === '' && err.path === 'password') {
          setPasswordError(err.msg)
          break;
        }
      }
    } else if (typeof errors === 'string' && errors.split(' ').includes('Password')) {
      setPasswordError(errors)
    }
  }, [errors])


  return (
    <div className="min-h-screen w-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-serif">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Or{" "}
          <a
            href="#"
            className="font-medium ml-2 text-xl text-white hover:text-gray-300"
          >
            create an account
          </a>
        </p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                  className="appearance-none bg-white rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
              {
                emailError.trim() !== '' && <span className="text-red-800 text-sm">{emailError}</span>
              }
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  className="appearance-none bg-white rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              {
                passwordError.trim() !== '' && <span className="text-red-800 text-sm">{passwordError}</span>
              }
            </div>

            <div className="flex items-center justify-center">
              <a
                href="#"
                className="font-medium text-gray-800 border-solid border-1px hover:border-black"
              >
                Forgot your password?
              </a>
            </div>

            <div>
              <button

              /* Login function */
              onClick={ async (e) => {
                e.preventDefault();
                setEmailError('');
                setPasswordError('');

                try {
                  const response = await LoginApi({"userEmail": email, "password": password})

                  if (response.success) {
                    localStorage.setItem("token", response.data.token)
                    dispatch(LoginAction(response.data))
                    history.pushState(null, null, '/')
                  } else if (response.validationErrors) {
                    setErrors(response.validationErrors)
                  } else
                    setErrors(response.message)

                } catch (err) {
                  throw (err)
                }
              }}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-600 hover:bg-white hover:text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:border-gray-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out transform hover:scale-105"
              >
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                  alt="Facebook"
                />
              </a>
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out transform hover:scale-105"
              >
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                  alt="Twitter"
                />
              </a>
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out transform hover:scale-105"
              >
                <img
                  className="h-6 w-6"
                  src="https://www.svgrepo.com/show/506498/google.svg"
                  alt="Google"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
