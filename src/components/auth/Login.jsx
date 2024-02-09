
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/authContext';
import login_bg from '../../Images/login_bg.jpg';
import logo from '../../Images/logo.png';
import { Link } from 'react-router-dom'

const Login = () => {
    const { adminLogin } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [email, setEmail] = useState()
    const [passworderror, setPasswordError] = useState();
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({ ...previous, [name]: value }))
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const loginHandler = (e) => {
        e.preventDefault();
        {/* Validations*/ }


        if (!formData.email) {
            setEmail("Please  enter email id");
            return;
        } else if (!emailPattern.test(formData.email)) {
            setEmail("Invalid email id");
            return;
            // errors.email = 'Invalid email address';

        }
        else {
            setEmail("");

        }
        if (!formData.password) {
            setPasswordError("Please enter password ");
            return;
        } else {
            setPasswordError("")
        }






        if (!formData.email.trim() || !formData.password.trim()) {
        } else {
            adminLogin(formData);
        }

    };
    const [showPassword, setShowPassword] = useState(false); // Add this line to define the state
    return (
        <main className="relative flex flex-1 flex-col overflow-hidden sm:px-6 lg:px-8">
            <img src={login_bg} alt="background image" className="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none" />
            <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"></div>
            <div className="relative flex justify-center h-screen items-center">
                <div className="w-96 rounded-lg overflow-hidden shadow-2xl p-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src={logo} alt="Company Logo" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your Account</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email ID <span className='text-[#dc2626]'>*</span></label>
                                <div className="mt-2">
                                    <input id="email" name="email" onChange={handleFormData} value={formData.email} type="email"
                                        placeholder=" Enter your Email ID" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                                </div>
                                <p className='text-[#dc2626] text-xs'>{email}</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password <span className='text-[#dc2626]'>*</span></label>
                                    <div className="text-sm">
                                        <Link to="/resetpassword" className="font-semibold text-orange-600 hover:text-orange-500">Forgot Password ?</Link>
                                    </div>

                                </div>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={handleFormData}
                                        value={formData.password}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your Password"
                                        autoComplete="current-password"
                                        required
                                        className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                                <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
                                            </svg>

                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z" clip-rule="evenodd" />
                                                <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                                            </svg>

                                        )}
                                    </button>

                                </div>
                                <span className='text-[#dc2626] text-xs p-0 h-6 m-0'> {passworderror}</span>
                            </div>


                            <div>
                                <button type="submit" onClick={loginHandler}
                                    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login