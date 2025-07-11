import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { login } from '../redux/slice/userSlice';

const SignInPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  console.log("User in component:", user);

  useEffect(() => {
    if (user) {
      navigate("/workspaces")
    }
  }, [user])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      const res = await dispatch(login(form)).unwrap();
      console.log("Registered user:", res);
      navigate("/workspaces");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err);
    }
  }
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
        <div className="flex w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white">

          <div className="w-full md:w-1/2 p-10 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                ⬤
              </div>
              <Link to={"/"}>
                <span className="text-lg font-semibold">CloudIDE</span>
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              The next big idea begins <br /> with a single line of code.
            </h2>
            <p className="text-sm text-gray-500">Welcome! Please sign up to your account to continue</p>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-600 flex gap-1">
                  Email Address<div className='text-rose-600 '>*</div>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-600 flex gap-1">
                  Password<div className='text-rose-600 '>*</div>
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:text-blue-600">
                  Forgot Password
                </a>
              </div>

              <div className="flex space-x-4 ">
                <button
                  type="submit"
                  onClick={handleClick}
                  className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-50 transition cursor-pointer"
                >
                  <Link to="/signup">
                    SIGNUP
                  </Link>
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                By signing up, you agree to our company’s{' '}
                <a href="#" className="underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>

          <div
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: `url('/your-bubble-image.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage