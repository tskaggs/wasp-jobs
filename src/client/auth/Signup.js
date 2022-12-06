import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import signup from '@wasp/auth/signup.js'
import login from '@wasp/auth/login.js'
import { errorMessage } from '@wasp/utils.js'

const SignupForm = () => {
  const history = useHistory()

  const [nameFieldVal, setNameFieldVal] = useState('')
  const [emailFieldVal, setEmailFieldVal] = useState('')
  const [usernameFieldVal, setUsernameFieldVal] = useState('')
  const [passwordFieldVal, setPasswordFieldVal] = useState('')

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      await signup({
        name: nameFieldVal,
        email: emailFieldVal,
        username: usernameFieldVal,
        password: passwordFieldVal
      })
      await login (usernameFieldVal, passwordFieldVal)

      setNameFieldVal('')
      setEmailFieldVal('')
      setUsernameFieldVal('')
      setPasswordFieldVal('')

      // Redirect to configured page, defaults to /.
      history.push('/')
    } catch (err) {
      console.log(err)
      window.alert(errorMessage(err))
    }
  }
  
  return (
    <>
      <form onSubmit={handleSignup} className="signup-form auth-form mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="full-name" className="sr-only">
              Full Name
            </label>
            <input
              id="full-name"
              name="fullname"
              type="text"
              autoComplete="fullname"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Full Name"
              value={nameFieldVal}
              onChange={e => setNameFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={emailFieldVal}
              onChange={e => setEmailFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
              value={usernameFieldVal}
              onChange={e => setUsernameFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={passwordFieldVal}
              onChange={e => setPasswordFieldVal(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  )
}

export default SignupForm
