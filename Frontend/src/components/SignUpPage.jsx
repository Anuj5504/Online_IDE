import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { register } from '../redux/slice/userSlice';

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/workspaces")
    }
  }, [user])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      const res = await dispatch(register(form)).unwrap();
      console.log("Registered user:", res);
      navigate("/workspaces");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err);
    }
  };
  return (
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
              <label htmlFor="text" className="text-sm font-medium text-gray-600 flex gap-1">
                User name <div className='text-rose-600 '>*</div>
              </label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className='flex flex-row gap-2'>

              <div>
                <label htmlFor="firstname" className="text-sm font-medium text-gray-600 flex gap-1">
                  First Name <div className='text-rose-600'>*</div>
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Bruce"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastname" className="text-sm font-medium text-gray-600 flex gap-1">
                  Last Name <div className='text-rose-600'>*</div>
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Wayne"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

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
                <input type="checkbox" className="form-checkbox cursor-pointer" />
                <span>Remember me</span>
              </label>
            </div>

            <div className="flex space-x-4 ">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
              >
                SIGNUP
              </button>
              <button
                type="button"
                className="w-1/2 border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-50 transition cursor-pointer"
              >
                <Link to={"/signin"}>
                  LOGIN
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
  )
}

export default SignUpPage