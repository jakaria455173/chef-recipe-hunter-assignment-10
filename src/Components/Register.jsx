import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChefRecipieBanner from './ChefRecipieBanner';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
const Register = () => {
  const [passwordShow, setpasswordShow] = useState(false)
  const [error, seterror] = useState('')
  const { createUser, handleGoogle, handleGithub, handleNamePhotoUrl } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location);
  const from = location.state?.from?.pathname || '/chefpage'
  const handleRegister = (e) => {
    e.preventDefault()
    seterror('')
    const form = e.target;
    const userName = form.userName.value
    const PhotoURL = form.PhotoURL.value
    const email = form.email.value
    const password = form.password.value
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      seterror('Please Enter A Atleast 2 UpperCase Latter!')
      return
    } else if (!/(?=.*[@#$%!^*].*[@#$%^*!])/.test(password)) {
      seterror('Add 2 Special Character[@#$%!^*]')
      return
    }
    else if (password.length < 6) {
      seterror('Password Required Mimimum At Least 6 Character !')
      return
    }
    // console.log(userName,PhotoURL,email,password);
    createUser(email, password)
      .then(result => {
        // console.log(result.user);
        toast.success('Register Account Successfully !', { type: 'default', autoClose: 2000 })
        handleNamePhotoUrl(result.user, userName, PhotoURL)
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 3000);
      }).catch(error => {
        seterror(error.message);
      })
    e.target.reset()
  }



  const googleRegister = () => {
    handleGoogle().then(result => {
      navigate(from, { replace: true })
    }).catch(error => {
      console.log(`Error:`, error.message);
    })
  }

  const gitHubRegister = () => {
    handleGithub().then(result => {
      navigate(from, { replace: true })
    }).catch(error => {
      console.log(`Error:`, error.message);
    })
  }

  const handleTogglePassword = () => {
    setpasswordShow(!passwordShow)
  }

  return (
    <>
      <ChefRecipieBanner title="Register Page" heading="REGISTER Page" />
      <div className='relative top-[17rem] flex flex-col items-center p-2'>
        <div className="w-full mx-auto max-w-md p-4 rounded-md shadow sm:p-8 bg-slate-100 my-10 text-gray-800">
          <h2 className="mb-3 text-3xl font-semibold text-center">Register to your account</h2>
          <p className="text-md text-center text-gray-600">Dont have account?
            <span className="focus:underline hover:underline cursor-pointer text-blue-500 ml-2 font-semibold"><Link to="/login">Log In here</Link></span>
          </p>
          <div className="my-6 space-y-4 ">
            <button onClick={googleRegister} aria-label="Register with Google" type="button" className=" active:bg-blue-600 hover:bg-blue-500 duration-300 font-semibold focus:none outline-none hover:text-white flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Register with Google</p>
            </button>
            <button onClick={gitHubRegister} aria-label="Register with GitHub" role="button" className="  active:bg-gray-600 hover:bg-black duration-300 font-semibold focus:none outline-none hover:text-white flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <p>Register with GitHub</p>
            </button>
            {/* <button aria-label="Register with Twitter" role="button" className=" active:bg-blue-600 hover:bg-blue-400 duration-300 font-semibold focus:none outline-none hover:text-white  flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
            </svg>
            <p>Register with Twitter</p>
          </button> */}
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full text-gray-600" />
            <p className="px-3 text-gray-600">OR</p>
            <hr className="w-full text-gray-600" />
          </div>
          <form className="space-y-8 ng-untouched ng-pristine ng-valid" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-md font-semibold text-gray-700">Your Name</label>
                <input type="text" name="userName" required placeholder="John Doe" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-600" />
              </div>


              <div className="space-y-2">
                <label className="block text-md font-semibold text-gray-700">Email address</label>
                <input type="email" name="email" required id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-600" />
              </div>
              <div className="space-y-2 relative">
                <div className="flex justify-between">
                  <label className="text-md font-semibold text-gray-700">Password</label>
                </div>
                <input type={passwordShow ? 'text' : 'password'} required name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-600" />
                <button
                  type="button"
                  className="text-gray-600 absolute right-4 transform translate-y-3 text-xl active:text-blue-500"
                  onClick={handleTogglePassword}
                >
                  {passwordShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="space-y-2">
                <label className="block text-md font-semibold text-gray-700">Photo URL</label>
                <input type="text" name="PhotoURL" required placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-600" />
                <p className='pt-2 text-red-600 text-[14px] font-medium italic'>{error}</p>
              </div>
            </div>
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-blue-600 hover:bg-blue-500 text-gray-50">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
