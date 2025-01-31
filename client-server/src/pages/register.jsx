import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { RegisterApi } from "../services/user.auth.jsx";
import { AuthAction } from "../store/actions.jsx";
import { useDispatch } from "react-redux";

const Register = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [f_n, setF_n] = useState('')
  const [l_n, setL_n] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [con_pass, setConPassword] = useState('')

  const [errors, setErrors] = useState(null)
  const [f_nError, setF_nError] = useState(null)
  const [l_nError, setL_nError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [con_passError, setCon_passError] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Array.isArray(errors)) {
      for (const err of errors) {
        if (!f_nError && err.path === 'f_n')
          setF_nError(err.msg)
        else if (!l_nError && err.path === 'l_n')
          setL_nError(err.msg)
        else if (!emailError && err.path === 'email')
          setEmailError(err.msg)
        else if (!passwordError && err.path === 'password')
          setPasswordError(err.msg)
        else if (!con_passError && err.path === 'con_pass')
          setCon_passError(err.msg)
      }
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Or{" "}
          <a
            href="#"
            className="font-medium ml-2 text-xl text-white hover:text-gray-300"
          >
            login to your account
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex space-x-4">
              {/* First Name */}
              <div className="flex-1">
                <label
                  htmlFor="f_n"
                  className="block text-sm font-bold text-gray-700"
                >
                  First Name
                </label>
                <div className="flex items-center bg-white rounded-md w-full px-3 py-2 border border-gray-300">
                  <FaUser className="text-gray-400 mr-2" />
                  <input id="f_n" name="f_n" type="text" value={f_n}
                    onChange={(e) => setF_n(e.currentTarget.value)}
                    className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-900"  placeholder="Enter your first name"/>
                </div>
                {f_nError && (
                  <span className="text-red-800 text-sm">{f_nError}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex-1">
                <label
                  htmlFor="l_n"
                  className="block text-sm font-bold text-gray-700">
                  Last Name
                </label>
                <div className="flex items-center bg-white rounded-md w-full px-3 py-2 border border-gray-300">
                  <FaUser className="text-gray-400 mr-2" />
                  <input id="l_n" name="l_n" type="text" value={l_n}
                    onChange={(e) => setL_n(e.currentTarget.value)}
                    className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-900"  placeholder="Enter your last name"/>
                </div>
                {l_nError && (
                  <span className="text-red-800 text-sm">{l_nError}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email address
              </label>
              <div className="flex items-center bg-white rounded-md w-full px-3 py-2 border border-gray-300">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input id="email" name="email" type="email" value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-900"  placeholder="Enter your email address"/>
              </div>
              {emailError && (
                <span className="text-red-800 text-sm">{emailError}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password"className="block text-sm font-bold text-gray-700">
                Password
              </label>
              <div className="flex items-center bg-white rounded-md w-full px-3 py-2 border border-gray-300">
                <FaLock className="text-gray-400 mr-2" />
                <input id="password" name="password" type="password" value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-900"  placeholder="Enter your password"/>
              </div>
              {passwordError && (
                <span className="text-red-800 text-sm">{passwordError}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="con_pass"
                className="block text-sm font-bold text-gray-700"
              >
                Confirm Password
              </label>
              <div className="flex items-center bg-white rounded-md w-full px-3 py-2 border border-gray-300">
                <FaLock className="text-gray-400 mr-2" />
                <input id="con_pass" name="con_pass" type="password" value={con_pass}
                  onChange={(e) => setConPassword(e.currentTarget.value)}
                  className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-900" placeholder="Confirm your password"/>
              </div>
              {con_passError && (
                <span className="text-red-800 text-sm">{con_passError}</span>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <motion.button  whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.95 }}  type="submit"
                onClick={ async (e) => {
                  e.preventDefault()
                  setIsSubmitting(true)
                  setF_nError(null), setL_nError(null), setEmailError(null), setPasswordError(null), setCon_passError(null)

                  try {
                    const response = await RegisterApi({f_n, l_n, email, password, con_pass})

                    setIsSubmitting(false)
                    if (response.success) {
                      localStorage.setItem("token", response.data.token)
                      dispatch(AuthAction(response.data))
                      history.push({
                        pathname: '/'
                      })
                    } else if (response.validationErrors) {
                      setErrors(response.validationErrors)
                    } else
                      setErrors(response.message)

                  } catch (err) {
                    setIsSubmitting(false)
                    throw (err)
                  }
                }}
                className={`${isSubmitting ? 'pointer-events-none' : ''}
                group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-600 hover:bg-white hover:text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:border-gray-600`}>
                {
                  isSubmitting ? 'loading...' : 'Register'
                }
              </motion.button>
            </div>
            <Link to='/login' className="w-full flex items-center pt-0 justify-center font-extrabold text-gray-400">
              Have an Account? Login..
            </Link>
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

            <div className="mt-6 grid grid-cols-1 gap-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out transform hover:scale-105"
              >
                <img
                  className="h-5 w-5"
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

export default Register;
